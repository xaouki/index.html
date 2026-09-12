# Startod — Mosquito Electric Swatter Landing Page

Landing page عربية RTL لمنتج مضرب الباعوض الكهربائي.

## الموجود
- تصميم Mobile-first جذاب.
- صور المنتج المرفقة مضمّنة داخل `index.html` حتى لا تحتاج رفع صور منفصلة.
- السعر 250 DH والتوصيل مجاني.
- زر WhatsApp على الرقم +212715085109.
- نموذج: الاسم الكامل، الهاتف، الهاتف الثاني، المدينة، العنوان.
- تأثير بصري متحرك لحشرة تقترب من الشبكة وشرارة.
- صفحة تفاصيل + FAQ + CTA ثابت على الهاتف.
- `google-apps-script.js` لاستقبال الطلبات في Google Sheet وإرسال إشعار إلى `chaou99i@gmail.com`.

## ربط Google Sheet
1. افتح Google Sheet الذي تريد تخزين الطلبات فيه بالحساب المناسب.
2. من Google Sheet اختر **Extensions → Apps Script**.
3. انسخ محتوى `google-apps-script.js` إلى Apps Script.
4. اضغط **Deploy → New deployment → Web app**.
5. اجعل التنفيذ **Me**، والوصول **Anyone**.
6. انسخ رابط Web App.
7. في `index.html` غيّر:
   `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL`
   إلى رابط Web App.
8. احفظ الملف وجرّب طلبًا تجريبيًا.

> ملاحظة: الصفحة لا تدّعي أرقام مبيعات أو زوار وهمية. أي رقم حقيقي مثل "11 طلبًا خلال آخر ساعة" يجب إدخاله من بيانات فعلية إذا أردت عرضه لاحقًا.
