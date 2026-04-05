let cart = {};

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

function renderMenu(categoryId, btn) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const display = document.getElementById("menu-display");
  display.innerHTML = "";

  const items = menuData[categoryId].items;
  items.forEach((item) => {
    const currentQty = cart[item.name] ? cart[item.name].qty : 0;
    const card = `
            <div class="card">
                <img src="${item.img}" alt="${item.name}">
                <div class="card-body">
                    <div class="card-title">${item.name}</div>
                    <div class="price">${item.price} ج.م</div>
                    <div class="qty-box">
                        <button class="btn-qty" onclick="changeQty('${item.name}', ${item.price}, -1)">-</button>
                        <input type="number" value="${currentQty}" class="qty-input" id="qty-${item.name}" readonly>
                        <button class="btn-qty" onclick="changeQty('${item.name}', ${item.price}, 1)">+</button>
                    </div>
                </div>
            </div>
        `;
    display.innerHTML += card;
  });
}

// تحديث الكمية (معدلة لتعمل مع السلة والقائمة معاً)
function changeQty(name, price, delta) {
  if (!cart[name]) {
    cart[name] = { qty: 0, price: price };
  }

  cart[name].qty += delta;

  if (cart[name].qty <= 0) {
    delete cart[name];
  }

  updateUI();
}

// حذف صنف بالكامل
function removeItem(name) {
  delete cart[name];
  updateUI();
}

// تحديث واجهة المستخدم بالكامل
function updateUI() {
  let total = 0;
  const cartList = document.getElementById("cart-items-list");
  const cartContainer = document.getElementById("cart-summary-container");

  cartList.innerHTML = "";

  const keys = Object.keys(cart);
  if (keys.length > 0) {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }

  keys.forEach((name) => {
    const item = cart[name];
    total += item.qty * item.price;

    // إضافة الصنف لشاشة الملخص
    cartList.innerHTML += `
        <div class="cart-item">
            <span class="item-name">${name}</span>
            <div class="item-controls">
                <button onclick="changeQty('${name}', ${item.price}, -1)">-</button>
                <span class="item-qty">${item.qty}</span>
                <button onclick="changeQty('${name}', ${item.price}, 1)">+</button>
            </div>
            <span class="item-subtotal">${item.qty * item.price} ج.م</span>
            <button class="btn-del" onclick="removeItem('${name}')">🗑️</button>
        </div>
    `;

    // تحديث الرقم في القائمة (Menu) إذا كان الصنف معروضاً حالياً
    const menuInput = document.getElementById(`qty-${name}`);
    if (menuInput) menuInput.value = item.qty;
  });

  // تصفير الخانات في المنيو للأصناف المحذوفة
  document.querySelectorAll(".qty-input").forEach((input) => {
    const itemName = input.id.replace("qty-", "");
    if (!cart[itemName]) input.value = 0;
  });

  document.getElementById("grand-total").innerText = total;
}

function sendOrder() {
  const phone = "201220886881";
  const name = document.getElementById("cust-name").value;
  const mobile = document.getElementById("cust-phone").value;
  const address = document.getElementById("cust-address").value;
  const notes = document.getElementById("cust-notes").value;
  const total = document.getElementById("grand-total").innerText;

  if (total == "0") return alert("اختار الأكل الأول!");
  if (!name || !mobile || !address) return alert("البيانات ناقصة!");

  let itemsMsg = "";
  for (let key in cart) {
    itemsMsg += `• ${key} (${cart[key].qty} * ${cart[key].price})\n`;
  }

  let notesMsg = notes.trim() !== "" ? `📝 *ملاحظات:* ${notes}\n` : "";

  const msg = encodeURIComponent(
    `🌟 *طلب جديد من نجمة التحرير*\n` +
      `--------------------------\n` +
      itemsMsg +
      `--------------------------\n` +
      notesMsg +
      `💰 *الاجمالي:* ${total} ج.م\n\n` +
      `👤 *العميل:* ${name}\n` +
      `📞 *تلفون:* ${mobile}\n` +
      `📍 *العنوان:* ${address}`,
  );

  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

window.onload = init;
