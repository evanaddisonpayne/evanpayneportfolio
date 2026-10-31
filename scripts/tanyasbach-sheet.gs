/**
 * Tanya's Bach — form backend
 * Paste into Extensions → Apps Script in the "Tanya's Bach — Trip Planning" sheet,
 * then Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * Copy the /exec URL and send it to Claude (or paste into SHEET_ENDPOINT in the page).
 */

const TABS = {
  rsvp:        ['Timestamp', 'Name', 'Email', 'Phone', 'Home airport', 'Passport valid thru', 'Dietary', 'Room preference', 'Roommate wish', 'Notes'],
  destination: ['Timestamp', 'Name', 'Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Why'],
  dates:       ['Timestamp', 'Name', 'Available weekends', 'Max nights'],
  budget:      ['Timestamp', 'Name', 'Comfort max (USD, excl. flights)', 'Splurge on'],
  vibes:       ['Timestamp', 'Name', 'Picks', 'Must-do idea'],
  final:       ['Timestamp', 'Name', 'Villa (Turks and Caicos)', 'Cruise (Virgin)', 'Note'],
};

function sheetFor_(form) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = form.charAt(0).toUpperCase() + form.slice(1);
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(TABS[form]);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, TABS[form].length).setFontWeight('bold');
  }
  return sh;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!TABS[d.form]) return json_({ ok: false, error: 'unknown form' });
    const now = new Date();
    const rows = {
      rsvp:        [now, d.name, d.email, d.phone, d.airport, d.passport, d.dietary, d.room, d.roommate, d.notes],
      destination: [now, d.name].concat((d.ranking || []).slice(0, 4)).concat([d.why]),
      dates:       [now, d.name, (d.weekends || []).join(', '), d.maxNights],
      budget:      [now, d.name, d.budget, (d.splurge || []).join(', ')],
      vibes:       [now, d.name, (d.picks || []).join(', '), d.idea],
      final:       [now, d.name, d.villa, d.cruise, d.note],
    };
    const row = rows[d.form];
    if (d.form === 'destination') while (row.length < 7) row.splice(row.length - 1, 0, '');
    sheetFor_(d.form).appendRow(row.map(v => (v === undefined ? '' : v)));
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** GET → aggregate results for the live tallies (no budgets or contact info exposed). */
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = n => { const s = ss.getSheetByName(n); return s ? s.getDataRange().getValues().slice(1) : []; };
  const latest = (data, nameCol) => {           // one entry per person, latest wins
    const m = {}; data.forEach(r => { m[String(r[nameCol]).trim().toLowerCase()] = r; }); return Object.values(m);
  };

  const out = { rsvps: latest(rows('Rsvp'), 1).length, destination: {}, dates: {}, vibes: {}, budgetBands: {}, final: { villa: {}, cruise: {} } };

  latest(rows('Final'), 1).forEach(r => {      // emoji reactions, one per option per person
    if (r[2]) out.final.villa[r[2]] = (out.final.villa[r[2]] || 0) + 1;
    if (r[3]) out.final.cruise[r[3]] = (out.final.cruise[r[3]] || 0) + 1;
  });

  latest(rows('Destination'), 1).forEach(r => {
    [2, 3, 4, 5].forEach((c, i) => { if (r[c]) out.destination[r[c]] = (out.destination[r[c]] || 0) + (4 - i); });
  });
  latest(rows('Dates'), 1).forEach(r => {
    String(r[2]).split(',').map(s => s.trim()).filter(Boolean).forEach(w => { out.dates[w] = (out.dates[w] || 0) + 1; });
  });
  latest(rows('Vibes'), 1).forEach(r => {
    String(r[2]).split(',').map(s => s.trim()).filter(Boolean).forEach(v => { out.vibes[v] = (out.vibes[v] || 0) + 1; });
  });
  latest(rows('Budget'), 1).forEach(r => {
    const b = Number(r[2]); const band = b < 1000 ? 'Under $1k' : b < 1500 ? '$1k–1.5k' : b < 2000 ? '$1.5k–2k' : '$2k+';
    out.budgetBands[band] = (out.budgetBands[band] || 0) + 1;
  });
  return json_(out);
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
