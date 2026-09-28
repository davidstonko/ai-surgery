/**
 * The Local Minimum (localminimum.us): backend.
 * - Sign-ups from the GitHub Pages site go to the Subscribers Sheet. Each new member gets
 *   a welcome email and then the most recent issue.
 * - Newsletter issues: a draft HTML file dropped in the Drive Outbox folder is emailed to
 *   David for review. The email links to an approval page; pressing Send there mails the
 *   issue to every subscriber, each with a personal unsubscribe link, and archives it.
 * - Newsletter suggestions from the submit page go to the Submissions Sheet as "pending".
 *   David gets an email with a Review link and approves or rejects each one.
 * - Serves one-click unsubscribe links.
 *
 * Deploy: Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * After editing: Deploy > Manage deployments > pencil > Version: New version > Deploy (same URL).
 * After this version is pasted in, run setup() once from the editor. It asks for Drive access
 * and installs the 10-minute timer that checks the Outbox and continues sends.
 */

const GROUP_NAME = 'The Local Minimum';
const NEWSLETTER_NAME = 'The Local Minimum';
const SITE_URL = 'https://localminimum.us/';
const SUBMIT_URL = SITE_URL + 'submit.html';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbznRIi9kqYA7Nl2aLu8MeGuTUoDyCeDDZfUys0gMCIKblIJLchTzZK36jxav47g6SLaVQ/exec';

const SUBS_SHEET_ID = '1kvLyBEirpn_iE6m5rARXXOagX5y5vR1Fzg_xEaNAh1w';
const SUBS_HEADERS = ['timestamp', 'name', 'email', 'role', 'status', 'source'];
const SENDS_HEADERS = ['timestamp', 'issue_file_id', 'issue', 'email', 'result'];

const SUBMIT_SHEET_ID = '1MSqC6lxLs_S8biXQW7XvAl0HY99abHI7UK3UuDZE2Ys';
const SUBMIT_HEADERS = ['id', 'timestamp', 'name', 'email', 'url', 'blurb', 'credit', 'status', 'decided_at'];

// Drive folders. Drafts go in the Outbox; sent issues are moved to Issues.
const OUTBOX_FOLDER_ID = '1eQBdyqVH1JGRmSFpnOwCN_0iyvr0GO3Q';
const ISSUES_FOLDER_ID = '1V1lcGTT2Oki9HVRy1pvC6dIEaoGmYY_A';
const ROOT_FOLDER_ID = '1sOS7SsmuA0qQwIC82DNpeZBF38n9p8WI';

// Where review requests (suggestions and issue drafts) are sent.
const REVIEW_EMAIL = 'dstonko1@jh.edu';

// Set to an address to get a note for each new sign-up, or leave '' for none.
const NOTIFY_EMAIL = '';

// Emails to subscribers come from this Google account, replies go to REPLY_TO.
const SEND_WELCOME = true;
const REPLY_TO = 'dstonko1@jh.edu';

// Sending through Cloudflare Email Service when the CF_API_TOKEN script property is set
// (Project Settings > Script properties). Without it, mail goes through this Google account.
const CF_ACCOUNT_ID = '3938d554dac9256ad2719dda4920552b';
const FROM_ADDRESS = 'newsletter@localminimum.us';

// A personal Gmail account can send to about 100 recipients a day. Issue sends stop this many
// short of the limit so welcome emails still go out, and the timer finishes the rest tomorrow.
const QUOTA_RESERVE = 5;

/* ---------- Helpers ---------- */

function sheet_(id, headers) {
  const sh = SpreadsheetApp.openById(id).getSheets()[0];
  const first = sh.getRange(1, 1, 1, headers.length).getValues()[0];
  if (first.join(',') !== headers.join(',')) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function sendsSheet_() {
  const ss = SpreadsheetApp.openById(SUBS_SHEET_ID);
  let sh = ss.getSheetByName('Sends');
  if (!sh) {
    sh = ss.insertSheet('Sends', ss.getSheets().length);
    sh.getRange(1, 1, 1, SENDS_HEADERS.length).setValues([SENDS_HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function clean_(s, max) {
  // Strip leading characters that spreadsheets treat as formulas.
  return String(s || '').trim().replace(/^[=+\-@]+/, '').slice(0, max);
}

function esc_(s) {
  return String(s || '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function secret_() {
  const props = PropertiesService.getScriptProperties();
  let s = props.getProperty('UNSUB_SECRET');
  if (!s) {
    s = Utilities.getUuid() + Utilities.getUuid();
    props.setProperty('UNSUB_SECRET', s);
  }
  return s;
}

function sign_(value) {
  const sig = Utilities.computeHmacSha256Signature(String(value), secret_());
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 22);
}

function unsubToken(email) { return sign_(String(email).toLowerCase()); }
function reviewToken_(id) { return sign_('review:' + id); }
function issueToken_(id) { return sign_('issue:' + id); }

function page_(title, body) {
  return HtmlService.createHtmlOutput(
    '<div style="font-family:system-ui,sans-serif;max-width:520px;margin:60px auto;padding:0 16px;line-height:1.5">' +
    '<h2 style="margin:0 0 8px">' + title + '</h2><p style="color:#555">' + body + '</p></div>'
  ).setTitle(title).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function button_(href, label) {
  return '<table role="presentation" cellspacing="0" cellpadding="0" style="margin:18px 0"><tr>' +
    '<td style="background:#002D72;border-radius:6px">' +
    '<a href="' + href + '" style="display:inline-block;padding:11px 18px;font-family:Arial,Helvetica,sans-serif;' +
    'font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">' + label + '</a></td></tr></table>';
}

/* ---------- Mail ---------- */

function cfToken_() { return PropertiesService.getScriptProperties().getProperty('CF_API_TOKEN'); }

// Emails left today. Cloudflare sets a daily quota that grows with good sending history (200 at
// the start); when it is reached the send fails and the rest wait for a later run. The Google
// account allows about 100 a day.
function remainingQuota_() { return cfToken_() ? 100000 : MailApp.getRemainingDailyQuota(); }

// One interface for all outgoing mail: {to, subject, body, htmlBody, name, replyTo, headers}.
function sendMail_(o) {
  const token = cfToken_();
  if (!token) {
    MailApp.sendEmail({ to: o.to, subject: o.subject, body: o.body || plainText_(o.htmlBody || ''),
      htmlBody: o.htmlBody, name: o.name, replyTo: o.replyTo });
    return;
  }
  const payload = { to: o.to, from: { address: FROM_ADDRESS, name: o.name || NEWSLETTER_NAME },
    subject: o.subject, text: o.body || plainText_(o.htmlBody || '') };
  if (o.htmlBody) payload.html = o.htmlBody;
  if (o.replyTo) payload.reply_to = o.replyTo;
  if (o.headers) payload.headers = o.headers;
  const res = UrlFetchApp.fetch('https://api.cloudflare.com/client/v4/accounts/' + CF_ACCOUNT_ID + '/email/sending/send', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token }, payload: JSON.stringify(payload) });
  const code = res.getResponseCode();
  let j = {};
  try { j = JSON.parse(res.getContentText()); } catch (err) {}
  if (code === 200 && j.success) {
    const r = j.result || {};
    if ((r.permanent_bounces || []).length) throw new Error('bounced: ' + r.permanent_bounces.join(', '));
    return;
  }
  const e = new Error('Cloudflare send failed (' + code + '): ' + JSON.stringify(j.errors || res.getContentText()).slice(0, 300));
  // Any API-level failure (rate limit, daily quota, outage) is retried on a later run rather than
  // recorded against the subscriber.
  e.rateLimited = true;
  throw e;
}

/* ---------- Entry points ---------- */

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true }); // honeypot: bots fill the hidden field
  // One-click unsubscribe (RFC 8058): mail apps POST to the List-Unsubscribe URL when the reader asks.
  if (p.action === 'unsubscribe') {
    try { confirmUnsub(p.e, p.t); } catch (err) {}
    return ContentService.createTextOutput('Unsubscribed');
  }
  if (p.type === 'submit') return handleSubmit_(p);
  return handleSignup_(p);
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'unsubscribe') return handleUnsub_(p);
  if (p.action === 'review') return reviewPage_(p);
  if (p.action === 'issue') return issuePage_(p);
  return page_(GROUP_NAME, 'Service is running.');
}

// Runs every 10 minutes (installed by setup): picks up new drafts and finishes any send in progress.
function tick() {
  try { checkOutbox_(); } catch (err) { console.error('outbox: ' + err); }
  try { processSendQueue_(); } catch (err) { console.error('send queue: ' + err); }
}

/* ---------- Sign-up ---------- */

function handleSignup_(p) {
  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200).toLowerCase();
  const role = clean_(p.role, 60);
  const source = clean_(p.source, 40) || 'web';
  if (!name || !EMAIL_RE.test(email)) return json_({ ok: false, error: 'invalid' });

  let existing = false;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
    const last = sh.getLastRow();
    if (last > 1) {
      const emails = sh.getRange(2, 3, last - 1, 1).getValues();
      for (let i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).toLowerCase() === email) {
          const row = i + 2;
          sh.getRange(row, 2).setValue(name);
          if (role) sh.getRange(row, 4).setValue(role);
          sh.getRange(row, 5).setValue('subscribed');
          existing = true;
          break;
        }
      }
    }
    if (!existing) sh.appendRow([new Date(), name, email, role, 'subscribed', source]);
  } finally {
    lock.releaseLock();
  }

  if (existing) return json_({ ok: true, existing: true });

  const latest = latestIssue_();
  if (SEND_WELCOME) {
    try { sendWelcome_(name, email, !!latest); } catch (err) { console.error('welcome failed: ' + err); }
  }
  if (latest) {
    try { deliverIssue_(latest.id, latest.subject, latest.html, email); }
    catch (err) { console.error('latest issue failed: ' + err); }
  }
  if (NOTIFY_EMAIL) {
    sendMail_({ to: NOTIFY_EMAIL, subject: 'New subscriber: ' + name,
      body: name + ' <' + email + '>' + (role ? '\n' + role : ''), name: GROUP_NAME });
  }
  return json_({ ok: true });
}

function unsubLink_(email) {
  return WEB_APP_URL + '?action=unsubscribe&e=' +
    encodeURIComponent(email) + '&t=' + unsubToken(email);
}

function sendWelcome_(name, email, hasLatest) {
  const first = String(name).split(/\s+/)[0];
  const unsub = unsubLink_(email);
  const latestLine = hasLatest ? 'The most recent issue is on its way in a separate email.' : '';
  const text =
    'Hi ' + first + ',\n\n' +
    'Thanks for subscribing to ' + NEWSLETTER_NAME + ', my roughly weekly email on AI and how it relates to surgery ' +
    'and medicine: a feature, the week\'s news, and something to watch or listen to. ' + latestLine + '\n\n' +
    'Seen something that belongs in it? Suggest it here, and I will credit you if it runs:\n' +
    SUBMIT_URL + '\n\n' +
    'David\nDavid P. Stonko, MD, MS\n\n' +
    'Unsubscribe: ' + unsub;
  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;max-width:560px">' +
    '<p>Hi ' + esc_(first) + ',</p>' +
    '<p>Thanks for subscribing to <b>' + NEWSLETTER_NAME + '</b>, my roughly weekly email on AI and how it relates to surgery ' +
    'and medicine: a feature, the week\'s news, and something to watch or listen to. ' + latestLine + '</p>' +
    '<p>Seen something that belongs in it? Suggest it, and I will credit you if it runs.</p>' +
    button_(SUBMIT_URL, 'Suggest an item') +
    '<p>David<br>David P. Stonko, MD, MS</p>' +
    '<p style="font-size:12px;color:#777;margin-top:28px">You subscribed at localminimum.us. ' +
    '<a href="' + unsub + '" style="color:#777">Unsubscribe</a></p></div>';
  sendMail_({ to: email, subject: 'Welcome to ' + NEWSLETTER_NAME,
    body: text, htmlBody: html, name: GROUP_NAME, replyTo: REPLY_TO });
}

/* ---------- Newsletter issues ----------
 * State for each draft lives in Script Properties under ISSUE_<fileId>:
 * {status: pending | sending | sent | superseded, hash, subject}.
 * LATEST_ISSUE_ID is the most recently approved issue, sent to each new member.
 */

function props_() { return PropertiesService.getScriptProperties(); }

function issueState_(id) {
  const v = props_().getProperty('ISSUE_' + id);
  return v ? JSON.parse(v) : null;
}

function setIssueState_(id, st) { props_().setProperty('ISSUE_' + id, JSON.stringify(st)); }

function allIssueStates_() {
  const all = props_().getProperties();
  return Object.keys(all).filter(k => k.indexOf('ISSUE_') === 0)
    .map(k => ({ id: k.slice(6), st: JSON.parse(all[k]) }));
}

function hash_(s) {
  return Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8));
}

function readIssue_(id) {
  const f = DriveApp.getFileById(id);
  return { file: f, html: f.getBlob().getDataAsString('UTF-8'), subject: f.getName().replace(/\.html?$/i, '') };
}

// The issue new members receive: the newest file in the Issues folder (so a corrected copy of a
// sent issue can be dropped there), falling back to the last approved issue.
function latestIssue_() {
  try {
    let newest = null;
    const files = DriveApp.getFolderById(ISSUES_FOLDER_ID).getFiles();
    while (files.hasNext()) {
      const f = files.next();
      if (!/\.html?$/i.test(f.getName()) && f.getMimeType() !== MimeType.HTML) continue;
      if (!newest || f.getDateCreated() > newest.getDateCreated()) newest = f;
    }
    const id = newest ? newest.getId() : props_().getProperty('LATEST_ISSUE_ID');
    if (!id) return null;
    const r = readIssue_(id);
    return { id: id, subject: r.subject, html: r.html };
  } catch (err) {
    console.error('latest issue unreadable: ' + err);
    return null;
  }
}

function activeSubscribers_() {
  const sh = sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return [];
  const seen = {};
  return sh.getRange(2, 1, last - 1, SUBS_HEADERS.length).getValues()
    .filter(r => String(r[4]) === 'subscribed' && EMAIL_RE.test(String(r[2])))
    .map(r => ({ name: String(r[1]), email: String(r[2]).toLowerCase() }))
    .filter(s => (seen[s.email] ? false : (seen[s.email] = true)));
}

function sentTo_(id) {
  const sh = sendsSheet_();
  const last = sh.getLastRow();
  const out = {};
  if (last < 2) return out;
  sh.getRange(2, 1, last - 1, SENDS_HEADERS.length).getValues().forEach(r => {
    if (String(r[1]) === id && String(r[4]) === 'sent') out[String(r[3]).toLowerCase()] = true;
  });
  return out;
}

function personalize_(html, email) {
  const unsub = email ? unsubLink_(email) : '#';
  if (html.indexOf('{{UNSUBSCRIBE_URL}}') >= 0) return html.split('{{UNSUBSCRIBE_URL}}').join(unsub);
  return html + '<p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#777;text-align:center">' +
    '<a href="' + unsub + '" style="color:#777">Unsubscribe</a></p>';
}

function plainText_(html) {
  return html.replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|tr|li|h\d)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Sends one issue to one address unless the Sends log shows it already went there.
function deliverIssue_(id, subject, html, email, alreadySent) {
  email = String(email).toLowerCase();
  const done = alreadySent || sentTo_(id);
  if (done[email]) return false;
  const body = personalize_(html, email);
  const unsub = unsubLink_(email);
  sendMail_({ to: email, subject: subject, htmlBody: body, body: plainText_(body),
    name: NEWSLETTER_NAME, replyTo: REPLY_TO,
    headers: { 'List-Unsubscribe': '<' + unsub + '>', 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } });
  sendsSheet_().appendRow([new Date(), id, subject, email, 'sent']);
  done[email] = true;
  return true;
}

// New or edited file in the Outbox: email David a preview with a link to the approval page.
function checkOutbox_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try { checkOutboxLocked_(); } finally { lock.releaseLock(); }
}

function checkOutboxLocked_() {
  const files = DriveApp.getFolderById(OUTBOX_FOLDER_ID).getFiles();
  while (files.hasNext()) {
    const f = files.next();
    const id = f.getId();
    const st = issueState_(id);
    if (st && st.status !== 'pending') continue; // sending, sent or superseded
    const html = f.getBlob().getDataAsString('UTF-8');
    const h = hash_(html);
    if (st && st.status === 'pending' && st.hash === h) continue;

    // A newer draft replaces any older one still waiting for approval.
    allIssueStates_().forEach(o => {
      if (o.id !== id && o.st.status === 'pending') {
        o.st.status = 'superseded';
        setIssueState_(o.id, o.st);
        try { DriveApp.getFileById(o.id).moveTo(DriveApp.getFolderById(ROOT_FOLDER_ID)); } catch (err) {}
      }
    });

    const subject = f.getName().replace(/\.html?$/i, '');
    setIssueState_(id, { status: 'pending', hash: h, subject: subject, at: new Date().toISOString() });
    sendReview_(id, subject, html);
  }
}

function issueLink_(id) {
  return WEB_APP_URL + '?action=issue&id=' + id + '&t=' + issueToken_(id);
}

function sendReview_(id, subject, html) {
  const n = activeSubscribers_().length;
  const link = issueLink_(id);
  const box =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#333;max-width:640px;margin:0 auto 16px;' +
    'padding:14px 16px;border:1px solid #d5dae2;background:#f6f7f9">' +
    '<b>Draft for your approval.</b> Nothing goes to the list until you open the approval page and press Send. ' +
    'It will go to ' + n + ' subscriber' + (n === 1 ? '' : 's') + '. To change it, tell Claude what to edit; ' +
    'a new draft email will replace this one.' + button_(link, 'Review and send') + '</div>';
  sendMail_({ to: REVIEW_EMAIL, subject: '[Approve] ' + subject,
    htmlBody: box + personalize_(html, ''),
    body: 'Draft of ' + subject + ' for your approval. Review and send: ' + link,
    name: NEWSLETTER_NAME });
}

// Opening the link only shows the page. Sending needs a button press, so
// email link scanners that pre-open links cannot send anything.
function issuePage_(p) {
  if (!p.id || p.t !== issueToken_(p.id)) return page_('Link not valid', 'This approval link is not valid.');
  const st = issueState_(p.id);
  if (!st) return page_('Not found', 'This draft is not known to the newsletter service.');
  const n = activeSubscribers_().length;
  let status = st.status;
  if (status === 'sending') status = 'sending (' + Object.keys(sentTo_(p.id)).length + ' of ' + n + ' so far)';
  const canSend = st.status === 'pending';
  const html =
    '<div style="font-family:system-ui,sans-serif;max-width:560px;margin:40px auto;padding:0 16px;line-height:1.5;color:#1a1a1a">' +
    '<h2 style="margin:0 0 4px">' + esc_(st.subject) + '</h2>' +
    '<p style="color:#666;margin:0 0 16px">Subscribers: <b>' + n + '</b></p>' +
    '<p id="st" style="color:#666">Status: <b>' + esc_(status) + '</b></p>' +
    (st.status === 'superseded' ? '<p>A newer draft replaced this one. Use the link in the newest approval email.</p>' : '') +
    (canSend ?
      '<button id="b" onclick="go()" style="font:inherit;font-weight:600;background:#002D72;color:#fff;border:0;border-radius:6px;padding:11px 18px">' +
      'Send to ' + n + ' subscriber' + (n === 1 ? '' : 's') + '</button>' +
      '<p style="color:#777;font-size:14px">A personal Gmail account can send about 100 emails a day. ' +
      'If the list is longer, the rest go out automatically the next day.</p>' : '') +
    '<script>function go(){var b=document.getElementById("b");b.disabled=true;' +
    'document.getElementById("st").textContent="Sending...";' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("st").innerHTML=m;b.style.display="none";})' +
    '.withFailureHandler(function(e){document.getElementById("st").textContent="Error: "+e.message;b.disabled=false;})' +
    '.approveIssue(' + JSON.stringify(String(p.id)) + ',' + JSON.stringify(String(p.t)) + ');}</script></div>';
  return HtmlService.createHtmlOutput(html).setTitle('Approve issue')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function approveIssue(id, t) {
  if (t !== issueToken_(id)) throw new Error('Link not valid');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let st;
  try {
    st = issueState_(id);
    if (!st) throw new Error('Not found');
    if (st.status === 'sent') return 'Status: <b>already sent</b>.';
    if (st.status === 'sending') return 'Status: <b>already sending</b>. The rest go out automatically.';
    if (st.status === 'superseded') throw new Error('A newer draft replaced this one. Use the link in the newest approval email.');
    if (hash_(readIssue_(id).html) !== st.hash) {
      throw new Error('This draft changed after the approval email went out. A new approval email will arrive within 10 minutes.');
    }
    st.status = 'sending';
    st.approvedAt = new Date().toISOString();
    setIssueState_(id, st);
    props_().setProperty('LATEST_ISSUE_ID', id);
  } finally {
    lock.releaseLock();
  }
  const r = processSendQueue_();
  return r.remaining
    ? 'Status: <b>sending</b>. ' + r.sent + ' sent so far; the other ' + r.remaining + ' go out automatically over the next runs.'
    : 'Status: <b>sent</b> to ' + r.sent + ' subscriber' + (r.sent === 1 ? '' : 's') + '.';
}

function processSendQueue_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { sent: 0, remaining: 0 };
  let sent = 0, remaining = 0;
  const started = Date.now();
  try {
    allIssueStates_().filter(o => o.st.status === 'sending').forEach(o => {
      const r = readIssue_(o.id);
      const done = sentTo_(o.id);
      const todo = activeSubscribers_().filter(s => !done[s.email]);
      let i = 0;
      for (; i < todo.length; i++) {
        if (remainingQuota_() <= QUOTA_RESERVE) break;
        if (Date.now() - started > 4.5 * 60 * 1000) break; // Apps Script stops runs at 6 minutes
        try { if (deliverIssue_(o.id, o.st.subject, r.html, todo[i].email, done)) sent++; }
        catch (err) {
          if (err && err.rateLimited) break; // Cloudflare limit or outage: try again on the next 10-minute run
          console.error('send to ' + todo[i].email + ' failed: ' + err);
          sendsSheet_().appendRow([new Date(), o.id, o.st.subject, todo[i].email, 'error: ' + err]);
          done[todo[i].email] = true;
        }
      }
      remaining += todo.length - i;
      if (i >= todo.length) {
        o.st.status = 'sent';
        o.st.sentAt = new Date().toISOString();
        setIssueState_(o.id, o.st);
        try { r.file.moveTo(DriveApp.getFolderById(ISSUES_FOLDER_ID)); } catch (err) { console.error('archive: ' + err); }
        try {
          sendMail_({ to: REVIEW_EMAIL, subject: 'Sent: ' + o.st.subject,
            body: o.st.subject + ' has gone to all ' + Object.keys(sentTo_(o.id)).length +
              ' subscribers. The Sends tab of the Subscribers sheet lists each one.', name: NEWSLETTER_NAME });
        } catch (err) {}
      }
    });
  } finally {
    lock.releaseLock();
  }
  return { sent: sent, remaining: remaining };
}

/* ---------- Newsletter suggestions ---------- */

function handleSubmit_(p) {
  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200).toLowerCase();
  const url = String(p.url || '').trim().slice(0, 1000);
  const blurb = clean_(p.blurb, 800);
  const credit = p.credit === 'no' ? 'no' : 'yes';
  if (!name || !blurb || !/^https?:\/\/\S+\.\S+/i.test(url)) return json_({ ok: false, error: 'invalid' });
  if (email && !EMAIL_RE.test(email)) return json_({ ok: false, error: 'invalid' });

  const id = Utilities.getUuid().slice(0, 8);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_(SUBMIT_SHEET_ID, SUBMIT_HEADERS)
      .appendRow([id, new Date(), name, email, url, blurb, credit, 'pending', '']);
  } finally {
    lock.releaseLock();
  }

  try {
    const review = WEB_APP_URL + '?action=review&id=' + id + '&t=' + reviewToken_(id);
    const html =
      '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;max-width:560px">' +
      '<p><b>' + esc_(name) + '</b>' + (email ? ' (' + esc_(email) + ')' : '') + ' suggested:</p>' +
      '<p><a href="' + esc_(url) + '" style="color:#002D72">' + esc_(url) + '</a></p>' +
      '<p style="border-left:3px solid #ccc;padding-left:12px;color:#333">' + esc_(blurb) + '</p>' +
      '<p style="color:#777;font-size:13px">Credit by name: ' + credit + '</p>' +
      button_(review, 'Review') + '</div>';
    sendMail_({ to: REVIEW_EMAIL, subject: 'Newsletter suggestion from ' + name,
      body: name + ' suggested ' + url + '\n\n' + blurb + '\n\nReview: ' + review,
      htmlBody: html, name: GROUP_NAME });
  } catch (err) { console.error('review email failed: ' + err); }

  return json_({ ok: true });
}

function findSubmission_(id) {
  const sh = sheet_(SUBMIT_SHEET_ID, SUBMIT_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return null;
  const rows = sh.getRange(2, 1, last - 1, SUBMIT_HEADERS.length).getValues();
  for (let i = 0; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) return { sh: sh, row: i + 2, v: rows[i] };
  }
  return null;
}

// Opening the link only shows the page. The decision needs a button press, so
// email link scanners that pre-open links cannot approve anything.
function reviewPage_(p) {
  if (!p.id || p.t !== reviewToken_(p.id)) return page_('Link not valid', 'This review link is not valid.');
  const s = findSubmission_(p.id);
  if (!s) return page_('Not found', 'That suggestion is no longer in the sheet.');
  const [id, ts, name, email, url, blurb, credit, status] = s.v;
  const html =
    '<div style="font-family:system-ui,sans-serif;max-width:560px;margin:40px auto;padding:0 16px;line-height:1.5;color:#1a1a1a">' +
    '<h2 style="margin:0 0 4px">Newsletter suggestion</h2>' +
    '<p style="color:#666;margin:0 0 16px">From <b>' + esc_(name) + '</b>' + (email ? ' (' + esc_(email) + ')' : '') +
    ' &middot; credit by name: ' + esc_(credit) + '</p>' +
    '<p><a href="' + esc_(url) + '" target="_blank" style="color:#002D72;word-break:break-all">' + esc_(url) + '</a></p>' +
    '<p style="border-left:3px solid #ccc;padding-left:12px">' + esc_(blurb) + '</p>' +
    '<p id="st" style="color:#666">Status: <b>' + esc_(status) + '</b></p>' +
    '<button onclick="go(\'approved\')" style="font:inherit;font-weight:600;background:#002D72;color:#fff;border:0;border-radius:6px;padding:11px 18px;margin-right:8px">Approve</button>' +
    '<button onclick="go(\'rejected\')" style="font:inherit;background:#eee;color:#333;border:0;border-radius:6px;padding:11px 18px">Reject</button>' +
    '<script>function go(d){document.getElementById("st").textContent="Saving...";' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("st").innerHTML=m;})' +
    '.withFailureHandler(function(e){document.getElementById("st").textContent="Error: "+e.message;})' +
    '.decide(' + JSON.stringify(String(p.id)) + ',' + JSON.stringify(String(p.t)) + ',d);}</script></div>';
  return HtmlService.createHtmlOutput(html).setTitle('Review suggestion')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function decide(id, t, decision) {
  if (t !== reviewToken_(id)) throw new Error('Link not valid');
  if (decision !== 'approved' && decision !== 'rejected') throw new Error('Bad decision');
  const s = findSubmission_(id);
  if (!s) throw new Error('Not found');
  const wasApproved = s.v[7] === 'approved';
  s.sh.getRange(s.row, 8, 1, 2).setValues([[decision, new Date()]]);

  const name = s.v[2], email = s.v[3];
  if (decision === 'approved' && !wasApproved && email) {
    try {
      sendMail_({ to: email, subject: 'Your suggestion will run in ' + NEWSLETTER_NAME,
        body: 'Hi ' + String(name).split(/\s+/)[0] + ',\n\nThanks for sending ' + s.v[4] +
          '. It will appear in an upcoming issue of ' + NEWSLETTER_NAME + '.\n\nDavid',
        name: GROUP_NAME, replyTo: REPLY_TO });
    } catch (err) { console.error('thank-you failed: ' + err); }
  }
  return 'Status: <b>' + decision + '</b>' +
    (decision === 'approved' ? '. It will be included in the next issue.' : '.');
}

/* ---------- Unsubscribe ----------
 * Link format: <WEB_APP_URL>?action=unsubscribe&e=<email>&t=<unsubToken(email)>
 */

// Opening the link only shows a confirmation page. Unsubscribing needs a button press, because
// hospital email security scanners open every link in an email and would otherwise unsubscribe people.
function handleUnsub_(p) {
  const email = String(p.e || '').toLowerCase();
  if (!email || p.t !== unsubToken(email)) {
    return page_('Link not valid', 'Reply to any email from the newsletter and I will remove you by hand.');
  }
  const html =
    '<div style="font-family:system-ui,sans-serif;max-width:520px;margin:60px auto;padding:0 16px;line-height:1.5">' +
    '<h2 style="margin:0 0 8px">Unsubscribe from ' + NEWSLETTER_NAME + '?</h2>' +
    '<p id="st" style="color:#555">' + esc_(email) + ' will stop receiving the newsletter.</p>' +
    '<button id="b" onclick="go()" style="font:inherit;font-weight:600;background:#002D72;color:#fff;border:0;border-radius:6px;padding:11px 18px">Unsubscribe</button>' +
    '<script>function go(){var b=document.getElementById("b");b.disabled=true;' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("st").innerHTML=m;b.style.display="none";})' +
    '.withFailureHandler(function(e){document.getElementById("st").textContent="Error: "+e.message;b.disabled=false;})' +
    '.confirmUnsub(' + JSON.stringify(email) + ',' + JSON.stringify(String(p.t)) + ');}</script></div>';
  return HtmlService.createHtmlOutput(html).setTitle('Unsubscribe')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function confirmUnsub(email, t) {
  email = String(email || '').toLowerCase();
  if (!email || t !== unsubToken(email)) throw new Error('Link not valid');
  const sh = sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
  const last = sh.getLastRow();
  if (last > 1) {
    const emails = sh.getRange(2, 3, last - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === email) sh.getRange(i + 2, 5).setValue('unsubscribed');
    }
  }
  return 'You are unsubscribed. You can rejoin any time at <a href="' + SITE_URL + 'subscribe/">' + SITE_URL + 'subscribe/</a>.';
}

/* Run once from the editor after pasting a new version: authorizes Drive and Mail,
 * sets up the sheets, and installs the 10-minute timer. */
function setup() {
  sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
  sheet_(SUBMIT_SHEET_ID, SUBMIT_HEADERS);
  sendsSheet_();
  secret_();
  DriveApp.getFolderById(OUTBOX_FOLDER_ID).getName();
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'tick') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('tick').timeBased().everyMinutes(10).create();
  Logger.log('Ready. Sending via ' + (cfToken_() ? 'Cloudflare as ' + FROM_ADDRESS : 'this Google account') + '. Quota left today: ' + remainingQuota_());
}
