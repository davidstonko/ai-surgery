# AI in Surgery Interest Group

Sign-up site and tooling for the AI in Surgery Interest Group, Johns Hopkins Department of Surgery.

## How it fits together

```
Invite email (jh.edu)  ->  Sign-up page (GitHub Pages, docs/)
                              |
                              v
                       Apps Script web app (apps-script/Code.gs)
                              |
                              v
                       Google Sheet: "AI in Surgery Interest Group - Subscribers"
                              |
                              v
                       Weekly newsletter (phase 2)
```

Subscriber sheet: https://docs.google.com/spreadsheets/d/1kvLyBEirpn_iE6m5rARXXOagX5y5vR1Fzg_xEaNAh1w/edit

Columns: `timestamp, name, email, role, status, source`. `status` is `subscribed` or `unsubscribed`. `source` is `invite` for people who came from the invite email link (`?src=invite`), otherwise `web`.

## One-time setup (about 10 minutes, on a laptop)

### 1. Deploy the sign-up backend
1. Open the subscriber sheet (link above).
2. Extensions > Apps Script. Delete the starter code, paste in `apps-script/Code.gs`, save.
3. In the function dropdown pick `setup`, click Run, and approve the permissions prompt (Google will warn the app is unverified because you wrote it; choose Advanced > Go to project).
4. Deploy > New deployment > type **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy.
5. Copy the Web app URL (ends in `/exec`).

### 2. Connect the page
Open `docs/index.html`, find `const ENDPOINT = "";` and paste the URL between the quotes.

### 3. Publish on GitHub Pages
1. Create a new public repo on GitHub, for example `ai-surgery`.
2. Push this folder to it.
3. Repo Settings > Pages > Build and deployment > Deploy from a branch > `main` / `/docs` > Save.
4. After a minute the site is live at `https://davidstonko.github.io/ai-surgery/`.

### 4. Test, then send the invite
1. Open the live page, sign up with your own email, confirm a row appears in the sheet.
2. Put the page URL into `invite-email.md` and send it from your jh.edu account.

## Updating the backend later
Edit the code in Apps Script, then Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy. This keeps the same URL, so the page does not need to change.

## Welcome email
Each new sign-up gets a welcome email from the Google account that owns the script, shown as "AI in Surgery Interest Group", with replies going to dstonko1@jh.edu. It includes a personal unsubscribe link. Turn it off with `SEND_WELCOME = false`. Personal Gmail accounts can send about 100 script emails a day, which is plenty for sign-ups.

## Unsubscribe links
Each future email should carry a personal link:
`<WEB_APP_URL>?action=unsubscribe&e=<email>&t=<token>`, where the token comes from `unsubToken(email)` in the script. Clicking it marks the row `unsubscribed`. The weekly send step will generate these automatically.

## Rules for the group
- Nothing containing patient information goes into the sign-up form, the sheet, or the newsletter pipeline.
