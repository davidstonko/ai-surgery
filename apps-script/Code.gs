/**
 * AI in Surgery Interest Group: sign-up backend.
 * Receives form posts from the GitHub Pages site and writes them to the subscriber Sheet.
 * Also serves one-click unsubscribe links for future weekly emails.
 *
 * Deploy: Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 */

const SHEET_ID = '1kvLyBEirpn_iE6m5rARXXOagX5y5vR1Fzg_xEaNAh1w';
const HEADERS = ['timestamp', 'name', 'email', 'role', 'status', 'source'];

// Set to your email to get a note for each new sign-up, or leave '' for none.
const NOTIFY_EMAIL = '';

function sheet_() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  const first = sh.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (first.join(',') !== HEADERS.join(',')) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
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

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true }); // honeypot: bots fill hidden field

  const name = clean_(p.name, 120);
  const email = clean_(p.email, 200).toLowerCase();
  const role = clean_(p.role, 60);
  const source = clean_(p.source, 40) || 'web';
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json_({ ok: false, error: 'invalid' });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
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

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New AI in Surgery sign-up: ' + name,
      name + ' <' + email + '>' + (role ? '\n' + role : ''));
  }
  return json_({ ok: true });
}

/* ---------- Unsubscribe ----------
 * Link format for future emails:  <WEB_APP_URL>?action=unsubscribe&e=<email>&t=<token>
 * Generate tokens with unsubToken(email). The secret is created once and stored in Script Properties.
 */

function secret_() {
  const props = PropertiesService.getScriptProperties();
  let s = props.getProperty('UNSUB_SECRET');
  if (!s) {
    s = Utilities.getUuid() + Utilities.getUuid();
    props.setProperty('UNSUB_SECRET', s);
  }
  return s;
}

function unsubToken(email) {
  const sig = Utilities.computeHmacSha256Signature(String(email).toLowerCase(), secret_());
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 22);
}

function page_(title, body) {
  return HtmlService.createHtmlOutput(
    '<div style="font-family:system-ui,sans-serif;max-width:480px;margin:60px auto;padding:0 16px;line-height:1.5">' +
    '<h2 style="margin:0 0 8px">' + title + '</h2><p style="color:#555">' + body + '</p></div>'
  ).setTitle(title);
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action !== 'unsubscribe') return page_('AI in Surgery Interest Group', 'Sign-up service is running.');

  const email = String(p.e || '').toLowerCase();
  if (!email || p.t !== unsubToken(email)) {
    return page_('Link not valid', 'Reply to any group email and we will remove you by hand.');
  }
  const sh = sheet_();
  const last = sh.getLastRow();
  if (last > 1) {
    const emails = sh.getRange(2, 3, last - 1, 1).getValues();
    for (let i = 0; i < emails.length; i++) {
      if (String(emails[i][0]).toLowerCase() === email) sh.getRange(i + 2, 5).setValue('unsubscribed');
    }
  }
  return page_('You are unsubscribed', 'You will not receive further group emails. You can rejoin any time from the sign-up page.');
}

/* Run once from the editor to confirm access and create the header row. */
function setup() {
  sheet_();
  secret_();
  Logger.log('Ready. Example token for test@example.com: ' + unsubToken('test@example.com'));
}
