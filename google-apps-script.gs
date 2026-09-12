const SHEET_NAME = 'Orders';
const NOTIFY_EMAIL = 'chaoukimaine@gmail.com';

function doGet() {
  return ContentService
    .createTextOutput('OK - Orders endpoint is running')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" not found.');
    }

    const now = new Date();
    const row = [
      now,
      data.fullName || '',
      data.phone || '',
      data.phone2 || '',
      data.city || '',
      data.address || '',
      data.product || 'مضرب الباعوض الكهربائي',
      data.quantity || 1,
      data.price || '',
      data.currency || 'MAD',
      data.source || '',
      data.createdAt || ''
    ];

    sheet.appendRow(row);

    const subject = '🛒 طلب جديد - ' + (data.fullName || 'زبون جديد');
    const body = [
      'وصل طلب جديد من صفحة Startod.',
      '',
      'الاسم: ' + (data.fullName || '-'),
      'الهاتف: ' + (data.phone || '-'),
      'الهاتف الثاني: ' + (data.phone2 || '-'),
      'المدينة: ' + (data.city || '-'),
      'العنوان: ' + (data.address || '-'),
      'المنتج: ' + (data.product || 'مضرب الباعوض الكهربائي'),
      'الكمية: ' + (data.quantity || 1),
      'الثمن: ' + (data.price || '-') + ' ' + (data.currency || 'MAD'),
      '',
      'تم تسجيل الطلب كذلك في Sheet: ' + SHEET_NAME
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      body: body
    });

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error(error);
    return ContentService
      .createTextOutput(JSON.stringify({ok:false,error:String(error)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
