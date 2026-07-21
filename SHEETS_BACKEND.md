# Excel / Google Sheets backend for the forms

The contact and newsletter forms can log every submission to a spreadsheet
(a Google Sheet, which you can download as an `.xlsx` Excel file any time:
**File → Download → Microsoft Excel**). It's free, needs no server, and keeps
working as a static site.

By default the site still uses **FormSubmit** (email delivery). To switch to the
sheet, do the 5 steps below and paste one URL into the config — nothing else changes.

---

## 1. Create the sheet
1. Go to <https://sheets.google.com> and create a blank spreadsheet.
2. Name it e.g. `CodeMaster SK — Leads`.

## 2. Add the script
1. In the sheet: **Extensions → Apps Script**.
2. Delete whatever is there and paste the code from **`Code.gs`** below.
3. Click **Save** (disk icon).

## 3. Deploy it as a Web App
1. **Deploy → New deployment**.
2. Click the gear next to *Select type* → **Web app**.
3. Set:
   - **Description**: `forms`
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**  ← required so the site can post to it
4. **Deploy**, then **Authorize access** and allow the permissions (it's your own script).
5. Copy the **Web app URL** — it ends in `/exec`.

## 4. Point the site at it
Open `index.html`, find `window.SITE_CONFIG`, and paste your URL:

```js
window.SITE_CONFIG = {
  domain: 'codemastersk.dev',
  canonicalBase: 'https://codemastersk.dev/',
  sheetsEndpoint: 'https://script.google.com/macros/s/AKfyc…/exec'  // ← paste here
};
```

That's it. Submissions now append rows to your sheet. Leaving `sheetsEndpoint`
blank reverts to FormSubmit email delivery.

## 5. (Optional) Get an email on every lead
Uncomment the `MailApp.sendEmail(...)` line in `Code.gs` and set your address.

---

## Notes
- The browser sends the data with `mode: 'no-cors'`, so the site shows an
  optimistic "message received" confirmation (the row is written even though the
  browser can't read the script's reply — this is normal for Apps Script).
- Each submission records: a timestamp, which form it came from, the page path,
  and all field values. New field names automatically get their own column.
- The site's Content-Security-Policy already allows `script.google.com`.
- If you re-edit the script later, use **Deploy → Manage deployments → Edit →
  Version: New version** so the same `/exec` URL keeps working.

---

## Code.gs

```js
/**
 * CodeMaster SK — form intake -> Google Sheet.
 * One row per submission; columns are created on demand from the payload keys.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid two submissions racing on the header row
  try {
    var data = {};
    try { data = JSON.parse(e.postData.contents); } catch (err) { data = e.parameter || {}; }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Submissions') || ss.insertSheet('Submissions');

    // Base columns we always want first
    var base = ['submittedAt', 'form', 'page', 'name', 'email', 'project_type', 'message'];

    // Build/refresh header row
    var header = sheet.getLastRow() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
      : [];
    if (header.length === 0) { header = base.slice(); sheet.appendRow(header); }

    // Map incoming keys (accept both cf field names and the _meta keys we send)
    var row = {
      submittedAt: data._submittedAt || new Date().toISOString(),
      form: data._form || '',
      page: data._page || '',
      name: data.name || '',
      email: data.email || '',
      project_type: data.project_type || '',
      message: data.message || ''
    };
    // Include any extra keys not already covered
    Object.keys(data).forEach(function (k) {
      if (k.charAt(0) === '_') return;
      if (row.hasOwnProperty(k)) return;
      row[k] = data[k];
    });

    // Add any new columns to the header
    Object.keys(row).forEach(function (k) {
      if (header.indexOf(k) === -1) {
        header.push(k);
        sheet.getRange(1, header.length).setValue(k);
      }
    });

    // Write the row in header order
    var out = header.map(function (h) { return row[h] !== undefined ? row[h] : ''; });
    sheet.appendRow(out);

    // Optional email notification — uncomment and set your address:
    // MailApp.sendEmail('you@example.com', 'New lead: ' + row.form,
    //   Object.keys(row).map(function (k){ return k + ': ' + row[k]; }).join('\n'));

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('CodeMaster SK form endpoint is live.');
}
```
