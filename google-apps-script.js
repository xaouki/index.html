/**
 * Google Apps Script — Startod / Mosquito Swatter
 * 1) افتح Google Sheet الذي تريد استقبال الطلبات فيه.
 * 2) Extensions > Apps Script.
 * 3) الصق هذا الكود ثم Deploy > New deployment > Web app.
 * 4) Execute as: Me / Who has access: Anyone.
 * 5) انسخ رابط Web App وضعه في index.html مكان YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL.
 */
const SHEET_NAME = "Orders";
const NOTIFY_EMAIL = "chaoukimaine@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ","الاسم الكامل","الهاتف","الهاتف الثاني","المدينة","العنوان","المنتج","السعر","العملة","المصدر"]);
    }

    sheet.appendRow([
      new Date(), data.fullName || "", data.phone || "", data.phone2 || "",
      data.city || "", data.address || "", data.product || "",
      data.price || 250, data.currency || "MAD", data.source || ""
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
          "<p><b>السعر:</b> 250 MAD — التوصيل مجاني</p>"
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function esc(v) {
  return String(v || "").replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}
