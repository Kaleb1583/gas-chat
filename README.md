# Public Chat Using Google Apps Script

This is a public chat system I made using Google Apps Script.

### Instructions

1. **Add HTML file**: Name it `index.html`, and paste the provided HTML code.
2. **Add GS file**: Name it `code.gs`, and paste the provided Google Apps Script code.

The `index.js` file is fetched in the HTML file. If you want to customize it, fork this repo, then replace the url in the html file thats = to `kaleb1583/gas-chat/index.js` with yours: `YOURUSERNAME/gas-chat/index.js`.

### Important Note
I used **Google Sheets** as the database, which may not be the most secure option. If you plan to create your own private chat, you’ll need to:
- Set up your own Google Sheets.
- Update the sheet IDs in the `code.gs` file to match your sheets.

---

## What I was Doing on 7.20.24 (and afterward)

1. **Reviewing code**
2. **Finding and fixing errors**
3. **Ensuring functionality** (related to #2)
4. **Updating `code.gs`**:  
   - Added constants for the sheet IDs, so instead of calling `getSpreadsheetById({ssid})` everywhere, you can use `getSpreadsheetById(SS_ID_CONSTANT)`.

---

### 10.1.24 Update

I’m not sure if I’ve fixed all the errors that can be found, and I also don’t know if all the spreadsheets (databases) are properly set to the variables at the start of the `.gs` script.

Since I recently rediscovered this repo after forgetting about it, I haven’t checked for any new errors. However, I don’t want to keep it private, so here it is!
