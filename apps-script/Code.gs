/**
 * AI and Surgery Interest Group: backend.
 * - Sign-ups from the GitHub Pages site go to the Subscribers Sheet, with a welcome email.
 * - Newsletter suggestions from the submit page go to the Submissions Sheet as "pending".
 *   David gets an email with a Review link and approves or rejects each one.
 * - Serves one-click unsubscribe links.
 *
 * Deploy: Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * After editing: Deploy > Manage deployments > pencil > Version: New version > Deploy (same URL).
 */

const GROUP_NAME = 'AI and Surgery Interest Group';
const SITE_URL = 'https://davidstonko.github.io/ai-surgery/';
const SUBMIT_URL = SITE_URL + 'submit.html';
const LOGO_URL = SITE_URL + 'assets/jhm-logo.png';
const AFFIL = 'Department of Surgery, The Johns Hopkins Hospital, Baltimore, MD';

const SUBS_SHEET_ID = '1kvLyBEirpn_iE6m5rARXXOagX5y5vR1Fzg_xEaNAh1w';
const SUBS_HEADERS = ['timestamp', 'name', 'email', 'role', 'status', 'source'];

const SUBMIT_SHEET_ID = '1MSqC6lxLs_S8biXQW7XvAl0HY99abHI7UK3UuDZE2Ys';
const SUBMIT_HEADERS = ['id', 'timestamp', 'name', 'email', 'url', 'blurb', 'credit', 'status', 'decided_at'];

// Where review requests for suggestions are sent.
const REVIEW_EMAIL = 'dstonko1@jh.edu';

// Set to an address to get a note for each new sign-up, or leave '' for none.
const NOTIFY_EMAIL = '';

// Emails to subscribers come from this Google account, shown as GROUP_NAME, replies go to REPLY_TO.
const SEND_WELCOME = true;
const REPLY_TO = 'dstonko1@jh.edu';

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

function pageShell_(title, inner) {
  return '<div style="margin:0;background:#F2F6FC;min-height:100vh;font-family:Arial,Helvetica,sans-serif;color:#141414">' +
    '<div style="height:6px;background:#F1C400"></div>' +
    '<div style="background:#fff;padding:14px 16px"><div style="max-width:620px;margin:0 auto;display:flex;align-items:center;gap:12px">' +
    '<img src="' + LOGO_URL + '" alt="Johns Hopkins Medicine" style="height:32px">' +
    '<span style="border-left:1px solid #d5dce8;padding-left:12px;font-size:13px;font-weight:bold;color:#002D72;line-height:1.25">' +
    'AI and Surgery<br>Interest Group</span></div></div>' +
    '<div style="background:#002D72;color:#fff;padding:26px 16px"><div style="max-width:620px;margin:0 auto">' +
    '<h1 style="margin:0 0 6px;font-size:26px">' + title + '</h1>' +
    '<div style="font-size:13px;color:#c9d6ee">' + AFFIL + '</div></div></div>' +
    '<div style="max-width:620px;margin:24px auto;padding:0 16px">' +
    '<div style="background:#fff;border:1px solid #d5dce8;border-top:4px solid #002D72;border-radius:4px;padding:22px 24px;line-height:1.55">' +
    inner + '</div></div></div>';
}

function page_(title, body) {
  return HtmlService.createHtmlOutput(pageShell_(title, '<p style="margin:0">' + body + '</p>'))
    .setTitle(title).addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* ---------- Entry points ---------- */

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true }); // honeypot: bots fill the hidden field
  if (p.type === 'submit') return handleSubmit_(p);
  return handleSignup_(p);
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'unsubscribe') return handleUnsub_(p);
  if (p.action === 'review') return reviewPage_(p);
  return page_(GROUP_NAME, 'Service is running.');
}

/* ---------- Sign-up ---------- */

function handleSignup_(p) {
  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200).toLowerCase();
  const role = clean_(p.role, 60);
  const source = clean_(p.source, 40) || 'web';
  if (!name || !EMAIL_RE.test(email)) return json_({ ok: false, error: 'invalid' });

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
          return json_({ ok: true, existing: true });
        }
      }
    }
    sh.appendRow([new Date(), name, email, role, 'subscribed', source]);
  } finally {
    lock.releaseLock();
  }

  if (SEND_WELCOME) {
    try { sendWelcome_(name, email); } catch (err) { console.error('welcome failed: ' + err); }
  }
  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New ' + GROUP_NAME + ' sign-up: ' + name,
      name + ' <' + email + '>' + (role ? '\n' + role : ''));
  }
  return json_({ ok: true });
}

function unsubLink_(email) {
  return ScriptApp.getService().getUrl() + '?action=unsubscribe&e=' +
    encodeURIComponent(email) + '&t=' + unsubToken(email);
}

function button_(href, label) {
  return '<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:18px 0"><tr>' +
    '<td bgcolor="#002D72" style="background:#002D72;border-radius:4px">' +
    '<a href="' + href + '" style="display:inline-block;padding:12px 20px;font-family:Arial,Helvetica,sans-serif;' +
    'font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">' + label + '</a></td></tr></table>';
}

// Branded, Outlook-safe email wrapper matching the website and the JH Surgery brand system:
// gold band, white logo field, Heritage Blue title band, white body, slate footer, gold line.
function emailShell_(title, bodyHtml, footerHtml) {
  const f = 'font-family:Arial,Helvetica,sans-serif;';
  return '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F2F6FC" style="background:#F2F6FC">' +
    '<tr><td align="center" style="padding:16px 8px">' +
    '<table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;background:#ffffff">' +
    '<tr><td height="6" bgcolor="#F1C400" style="background:#F1C400;height:6px;font-size:0;line-height:0">&nbsp;</td></tr>' +
    '<tr><td style="padding:16px 28px;' + f + '">' +
      '<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>' +
      '<td style="padding-right:14px"><img src="' + LOGO_URL + '" width="152" alt="Johns Hopkins Medicine" style="display:block;width:152px;height:auto;border:0"></td>' +
      '<td style="border-left:1px solid #d5dce8;padding-left:14px;' + f + 'font-size:13px;font-weight:bold;color:#002D72;line-height:1.25">AI and Surgery<br>Interest Group</td>' +
      '</tr></table></td></tr>' +
    '<tr><td bgcolor="#002D72" style="background:#002D72;padding:22px 28px;' + f + '">' +
      '<div style="font-size:24px;font-weight:bold;color:#ffffff;line-height:1.25">' + title + '</div>' +
      '<div style="font-size:13px;color:#c9d6ee;padding-top:6px">' + AFFIL + '</div></td></tr>' +
    '<tr><td style="padding:24px 28px 8px;' + f + 'font-size:15px;line-height:1.55;color:#141414">' + bodyHtml + '</td></tr>' +
    '<tr><td bgcolor="#4F669C" style="background:#4F669C;padding:16px 28px;' + f + 'font-size:12px;line-height:1.5;color:#e9eef7">' +
      footerHtml + '</td></tr>' +
    '<tr><td height="3" bgcolor="#F1C400" style="background:#F1C400;height:3px;font-size:0;line-height:0">&nbsp;</td></tr>' +
    '</table></td></tr></table>';
}

function footerLinks_(extra) {
  const a = 'color:#ffffff;';
  return '<b>AI and Surgery Interest Group</b> &middot; Department of Surgery, The Johns Hopkins Hospital<br>' +
    '<a href="' + SITE_URL + 'library/" style="' + a + '">Library</a> &middot; ' +
    '<a href="' + SUBMIT_URL + '" style="' + a + '">Suggest an item</a>' + (extra || '');
}

function sendWelcome_(name, email) {
  const first = String(name).split(/\s+/)[0];
  const unsub = unsubLink_(email);
  const text =
    'Hi ' + first + ',\n\n' +
    'Thanks for joining the ' + GROUP_NAME + ' at the Johns Hopkins Department of Surgery.\n\n' +
    'What to expect: a short weekly email with the papers, talks and podcasts worth a surgeon\'s time, ' +
    'each with a note on why it matters, plus notice of meetings and speakers.\n\n' +
    'Seen something the group should know about? Suggest it for the newsletter here, and we will credit you if it runs:\n' +
    SUBMIT_URL + '\n\n' +
    'David\nDavid P. Stonko, MD, MS\nJohns Hopkins Department of Surgery\n\n' +
    'Unsubscribe: ' + unsub;
  const html = emailShell_('Welcome to the group',
    '<p style="margin:0 0 14px">Hi ' + esc_(first) + ',</p>' +
    '<p style="margin:0 0 14px">Thanks for joining the <b>' + GROUP_NAME + '</b> at the Johns Hopkins Department of Surgery.</p>' +
    '<p style="margin:0 0 14px">What to expect: a short weekly email with the papers, talks and podcasts worth a surgeon\'s time, ' +
    'each with a note on why it matters, plus notice of meetings and speakers.</p>' +
    '<p style="margin:0">Seen something the group should know about? Suggest it for the newsletter, and we will credit you if it runs.</p>' +
    button_(SUBMIT_URL, 'Suggest an item') +
    '<p style="margin:0 0 16px">David<br>David P. Stonko, MD, MS<br>Johns Hopkins Department of Surgery</p>',
    footerLinks_(' &middot; <a href="' + unsub + '" style="color:#ffffff;">Unsubscribe</a>'));
  MailApp.sendEmail({ to: email, subject: 'Welcome to the ' + GROUP_NAME,
    body: text, htmlBody: html, name: GROUP_NAME, replyTo: REPLY_TO });
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
    const review = ScriptApp.getService().getUrl() + '?action=review&id=' + id + '&t=' + reviewToken_(id);
    const html = emailShell_('New newsletter suggestion',
      '<p style="margin:0 0 12px"><b>' + esc_(name) + '</b>' + (email ? ' (' + esc_(email) + ')' : '') + ' suggested:</p>' +
      '<p style="margin:0 0 12px"><a href="' + esc_(url) + '" style="color:#002D72;word-break:break-all">' + esc_(url) + '</a></p>' +
      '<p style="margin:0 0 12px;border-left:4px solid #F1C400;padding-left:12px;color:#333">' + esc_(blurb) + '</p>' +
      '<p style="margin:0;color:#4a5568;font-size:13px">Credit by name: ' + credit + '</p>' +
      button_(review, 'Review'),
      footerLinks_());
    MailApp.sendEmail({ to: REVIEW_EMAIL, subject: 'Newsletter suggestion from ' + name,
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
  const btn = 'font:inherit;font-weight:bold;border:0;border-radius:4px;padding:12px 20px;margin-right:8px;cursor:pointer;';
  const html = pageShell_('Newsletter suggestion',
    '<p style="color:#4a5568;margin:0 0 14px">From <b>' + esc_(name) + '</b>' + (email ? ' (' + esc_(email) + ')' : '') +
    ' &middot; credit by name: ' + esc_(credit) + '</p>' +
    '<p style="margin:0 0 14px"><a href="' + esc_(url) + '" target="_blank" style="color:#002D72;word-break:break-all">' + esc_(url) + '</a></p>' +
    '<p style="margin:0 0 14px;border-left:4px solid #F1C400;padding-left:12px">' + esc_(blurb) + '</p>' +
    '<p id="st" style="color:#4a5568;margin:0 0 16px">Status: <b>' + esc_(status) + '</b></p>' +
    '<button onclick="go(\'approved\')" style="' + btn + 'background:#002D72;color:#fff">Approve</button>' +
    '<button onclick="go(\'rejected\')" style="' + btn + 'background:#DCE6F1;color:#002D72">Reject</button>' +
    '<script>function go(d){document.getElementById("st").textContent="Saving...";' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("st").innerHTML=m;})' +
    '.withFailureHandler(function(e){document.getElementById("st").textContent="Error: "+e.message;})' +
    '.decide(' + JSON.stringify(String(p.id)) + ',' + JSON.stringify(String(p.t)) + ',d);}</script>');
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
      const first = String(name).split(/\s+/)[0];
      const html = emailShell_('Your suggestion will run',
        '<p style="margin:0 0 14px">Hi ' + esc_(first) + ',</p>' +
        '<p style="margin:0 0 14px">Thanks for sending <a href="' + esc_(s.v[4]) + '" style="color:#002D72;word-break:break-all">' +
        esc_(s.v[4]) + '</a>. It will appear in an upcoming issue of the ' + GROUP_NAME + ' newsletter.</p>' +
        '<p style="margin:0">Keep them coming.</p>' + button_(SUBMIT_URL, 'Suggest another') +
        '<p style="margin:0 0 16px">David</p>',
        footerLinks_());
      MailApp.sendEmail({ to: email, subject: 'Your suggestion will run in the newsletter',
        body: 'Hi ' + first + ',\n\nThanks for sending ' + s.v[4] +
          '. It will appear in an upcoming issue of the ' + GROUP_NAME + ' newsletter.\n\nDavid',
        htmlBody: html, name: GROUP_NAME, replyTo: REPLY_TO });
    } catch (err) { console.error('thank-you failed: ' + err); }
  }
  return 'Status: <b>' + decision + '</b>' +
    (decision === 'approved' ? '. It will be included in the next issue.' : '.');
}

/* ---------- Unsubscribe ----------
 * Link format: <WEB_APP_URL>?action=unsubscribe&e=<email>&t=<unsubToken(email)>
 */

function handleUnsub_(p) {
  const email = String(p.e || '').toLowerCase();
  if (!email || p.t !== unsubToken(email)) {
    return page_('Link not valid', 'Reply to any group email and we will remove you by hand.');
  }
  const sh = sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
  const last = sh.getLastRow();
  if (last > 1) {
    const emails = sh.getRange(2, 3, last - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === email) sh.getRange(i + 2, 5).setValue('unsubscribed');
    }
  }
  return page_('You are unsubscribed', 'You will not receive further group emails. You can rejoin any time at ' +
    '<a href="' + SITE_URL + '">' + SITE_URL + '</a>.');
}

/* Run once from the editor to confirm access and set up both sheets. */
function setup() {
  sheet_(SUBS_SHEET_ID, SUBS_HEADERS);
  sheet_(SUBMIT_SHEET_ID, SUBMIT_HEADERS);
  secret_();
  Logger.log('Ready.');
}
