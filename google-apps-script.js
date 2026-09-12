/**
 * Startod — Google Apps Script
 * Web App: receives orders from index.html and saves them in Orders.
 */
const SHEET_NAME = "Orders";
const NOTIFY_EMAIL = "chaoukimaine@gmail.com";

function doGet() {
  return ContentService
    .createTextOutput("STARTOD OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = e && e.postData ? e.postData.contents : "{}";
    const data = JSON.parse(raw || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ","الاسم الكامل","الهاتف","الهاتف الثاني","المدينة","العنوان","المنتج","الكمية","السعر","العملة","المصدر"]);
    }

    sheet.appendRow([
      new Date(),
      data.fullName || "",
      data.phone || "",
      data.phone2 || "",
      data.city || "",
      data.address || "",
      data.product || "مضرب الباعوض الكهربائي",
      data.quantity || 1,
      data.price || 180,
      data.currency || "MAD",
      data.source || "Startod.com"
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "طلب جديد — Startod.com",
        htmlBody:
          "<h2>طلب جديد</h2>" +
          "<p><b>الاسم:</b> " + esc(data.fullName) + "</p>" +
          "<p><b>الهاتف:</b> " + esc(data.phone) + "</p>" +
          "<p><b>الهاتف الثاني:</b> " + esc(data.phone2) + "</p>" +
          "<p><b>المدينة:</b> " + esc(data.city) + "</p>" +
          "<p><b>العنوان:</b> " + esc(data.address) + "</p>" +
          "<p><b>العرض:</b> " + esc(data.quantity) + " — " + esc(data.price) + " MAD</p>"
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function esc(v) {
  return String(v || "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/\"/g,"&quot;");
}
