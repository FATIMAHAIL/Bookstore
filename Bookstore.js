// 1. إنشاء وإضافة الكتب (إدارة المخزن)
// ملاحظة: استخدمنا مصفوفة كائنات لسهولة التعامل (أفضل من المصفوفات ثنائية الأبعاد)
let library = [
    { id: 1, title: 'Start with why', author: 'Simon Sinek', price: 80.0, quantity: 13 },
    { id: 2, title: 'But how do it know', author: 'J. Clark Scott', price: 59.9, quantity: 22 },
    { id: 3, title: 'Clean Code', author: 'Robert Cecil Martin', price: 50.0, quantity: 5 },
    { id: 4, title: 'Zero to One', author: 'Peter Thiel', price: 45.0, quantity: 12 },
    { id: 5, title: 'You don\'t know JS', author: 'Kyle Simpson', price: 39.9, quantity: 9 }
];

// --- [القدرة على الاستعلام عن كتاب] ---
// مثال للاستعلام باستخدام Loop و If (حسب المساعدة 2)
function searchBook(query) {
    for (let i = 0; i < library.length; i++) {
        // التحقق من الرقم أو العنوان أو المؤلف
        if (library[i].id === query || library[i].title === query || library[i].author === query) {
            return library[i];
        }
    }
    return null; // إذا لم يجد شيئاً
}

// --- [بيع كتاب وتصدير فاتورة] ---
function sellBook(bookTitle, requestedQty, userBalance) {
    // 1. المدخلات والتحقق من وجود الكتاب
    let book = searchBook(bookTitle);

    if (!book) {
        console.log("❌ الكتاب غير متوفر في النظام.");
        return;
    }

    // 2. التحقق من توفر الكمية المطلوبة
    if (book.quantity < requestedQty) {
        console.log("❌ الكمية المطلوبة غير متوفرة في المخزن.");
        return;
    }

    // 3. التحقق من كفاية الرصيد
    let totalPrice = book.price * requestedQty;
    if (userBalance < totalPrice) {
        console.log("❌ رصيدك لا يكفي لشراء الكمية المطلوبة.");
        return;
    }

    // 4. تنفيذ البيع وإنقاص المخزون
    book.quantity -= requestedQty;
    let remainingBalance = userBalance - totalPrice;

    // 5. تصدير الفاتورة
    console.log("--- 🧾 فاتورة البيع ---");
    console.log(`اسم الكتاب: ${book.title}`);
    console.log(`الكمية: ${requestedQty}`);
    console.log(`السعر الإجمالي: ${totalPrice.toFixed(2)} ريال`);
    console.log(`الرصيد المتبقي: ${remainingBalance.toFixed(2)} ريال`);
    console.log("-----------------------");
    console.log(`✅ تم تحديث المخزون. المتبقي: ${book.quantity}`);
}

// --- [تجربة البرنامج - المدخلات معطاة] ---
console.log("📋 معلومات الكتب المتوفرة:");
console.table(library);

// تنفيذ عملية بيع
sellBook('Clean Code', 2, 200);
