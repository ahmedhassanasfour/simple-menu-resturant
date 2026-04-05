let cart = {};

// 1. إنشاء التابات (الأقسام) عند تشغيل الصفحة
function init() {
  const tabsContainer = document.getElementById("category-tabs");
  let first = true;

  for (let key in menuData) {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${first ? "active" : ""}`;
    btn.innerText = menuData[key].title;
    btn.onclick = (e) => renderMenu(key, e.target);
    tabsContainer.appendChild(btn);
    if (first) renderMenu(key, btn);
    first = false;
  }
}

// 2. عرض أصناف القسم المختار
function renderMenu(categoryId, btn) {
  // تحديث شكل الزر النشط
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const display = document.getElementById("menu-display");
  display.innerHTML = ""; // مسح القديم

  const items = menuData[categoryId].items;
  items.forEach((item) => {
    const currentQty = cart[item.name] || 0;
    const card = `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <div class="card-body">
                    <div class="card-title">${item.name}</div>
                    <div class="price">${item.price} ج.م</div>
                    <div class="qty-box">
                        <button class="btn-qty" onclick="changeQty('${item.name}', ${item.price}, -1, this)">-</button>
                        <input type="number" value="${currentQty}" class="qty-input" readonly>
                        <button class="btn-qty" onclick="changeQty('${item.name}', ${item.price}, 1, this)">+</button>
                    </div>
                </div>
            </div>
        `;
    display.innerHTML += card;
  });
}

// 3. تحديث الكمية والإجمالي
function changeQty(name, price, delta, btn) {
  const input = btn.parentElement.querySelector(".qty-input");
  let qty = parseInt(input.value) + delta;
  if (qty < 0) qty = 0;
  input.value = qty;

  if (qty > 0) cart[name] = { qty, price };
  else delete cart[name];

  let total = 0;
  for (let key in cart) {
    total += cart[key].qty * cart[key].price;
  }
  document.getElementById("grand-total").innerText = total;
}

// 4. إرسال الطلب للواتساب
function sendOrder() {
  const phone = "201220886881";
  const name = document.getElementById("cust-name").value;
  const mobile = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;
  const total = document.getElementById("grand-total").innerText;

  if (total == "0") return alert("اختار الأكل الأول!");
  if (!name || !mobile || !address) return alert("البيانات ناقصة!");

  let itemsMsg = "";
  for (let key in cart) {
    itemsMsg += `• ${key} (${cart[key].qty} * ${cart[key].price})\n`;
  }

  const msg = encodeURIComponent(
    `🌟 *طلب جديد من نجمة التحرير*\n` +
      `--------------------------\n` +
      itemsMsg +
      `--------------------------\n` +
      `💰 *الاجمالي بدون خدمه التوصيل:* ${total} ج.م\n\n` +
      `👤 *العميل:* ${name}\n` +
      `📞 *تلفون:* ${mobile}\n` +
      `📍 *العنوان:* ${address}`,
  );

  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

// تشغيل عند التحميل
window.onload = init;
