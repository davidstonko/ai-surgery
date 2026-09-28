# LocalMinimum.us

Source for [localminimum.us](https://localminimum.us), David P. Stonko's personal website, and the service behind **The Local Minimum**, his weekly email on AI in surgery and medicine.

## Layout

```
docs/               Jekyll site served by GitHub Pages (custom domain localminimum.us)
  _posts/           Library posts
  issues/           Archive of sent newsletter issues
  subscribe/        Sign-up form
  submit.html       Suggest-an-item form
  skills/           Claude skills and downloads
  talks/, about/, contact/, resources/
apps-script/Code.gs Google Apps Script web app: sign-ups, suggestions, approvals, sending
```

## How the newsletter works

1. A weekly scheduled task drafts the next issue as HTML in a Google Drive "Outbox" folder.
2. The Apps Script service (runs every 10 minutes) emails David an approval link. Nothing is sent until he presses Send on the approval page.
3. Approved issues go to every subscriber through Cloudflare Email Service from newsletter@localminimum.us, each with a personal unsubscribe link and one-click List-Unsubscribe headers. Sends resume automatically if a run stops partway.
4. New subscribers get a welcome email and the most recent issue.
5. Reader suggestions from the form land in a Google Sheet; David approves or rejects each one before it can run.

## Updating the Apps Script service

Edit `apps-script/Code.gs`, paste it into the Apps Script editor, save, then Deploy > Manage deployments > edit > Version: New version > Deploy. The web app URL stays the same. Timed triggers run the saved code; the web app runs the deployed version.

## Rules

- No patient information anywhere in the forms, sheets, site or newsletter.
- The views here are David's own and do not represent Johns Hopkins University or Johns Hopkins Medicine.
