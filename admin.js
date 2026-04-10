import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuMQbkHIAz_VRPLokQvoxPoZFRighGpEI",
  authDomain: "menu-resturant.firebaseapp.com",
  projectId: "menu-resturant",
  storageBucket: "menu-resturant.firebasestorage.app",
  messagingSenderId: "33869778386",
  appId: "1:33869778386:web:24274d7b90eb20965e0c0b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const IMGBB_KEY = "d754d0edbe57ff9d63afa5dbd587773c";

const auth = getAuth(app);

// 3. مراقبة حالة المستخدم (هل هو مسجل دخول أم لا؟)
onAuthStateChanged(auth, (user) => {
  const loginSection = document.getElementById("login-section");
  const adminContent = document.getElementById("admin-content");

  if (user) {
    // لو مسجل دخول: اظهر اللوحة واخفي الفورم
    loginSection.style.display = "none";
    adminContent.style.display = "block";
    // شغل الدوال بتاعتك
    listenToCategories();
    listenToMenuItems();
    listenToOrders();
  } else {
    // لو مش مسجل: اظهر الفورم واخفي اللوحة
    loginSection.style.display = "block";
    adminContent.style.display = "none";
  }
});

// 4. دالة تسجيل الدخول
window.login = async function () {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-password").value;
  const errorMsg = document.getElementById("login-error");

  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (error) {
    errorMsg.innerText = "خطأ في البيانات! تأكد من الإيميل والباسورد.";
  }
};

// 5. دالة تسجيل الخروج
window.logout = function () {
  signOut(auth);
};

// --- نظام التنقل بين التبويبات ---
window.openTab = function (evt, tabId) {
  document
    .querySelectorAll(".tab-content")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-link")
    .forEach((link) => link.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  evt.currentTarget.classList.add("active");
};

// --- 1. إدارة الأقسام (Tabs) ---
function listenToCategories() {
  onSnapshot(collection(db, "menu"), (snapshot) => {
    const manager = document.getElementById("categories-manager");
    const select = document.getElementById("item-category-select");
    manager.innerHTML =
      "<table><tr><th>ID القسم</th><th>الاسم المعروض</th><th>تحكم</th></tr>";
    select.innerHTML = "";

    snapshot.forEach((catDoc) => {
      const cat = catDoc.data();
      const id = catDoc.id;
      manager.querySelector("table").innerHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${cat.title}</td>
                    <td>
                        <button class="btn-edit" onclick="editCategory('${id}', '${cat.title}')">تعديل الاسم ✏️</button>
                        <button class="btn-del" onclick="deleteCategory('${id}')">حذف 🗑️</button>
                    </td>
                </tr>`;
      select.innerHTML += `<option value="${id}">${cat.title}</option>`;
    });
  });
}

window.addCategory = async function () {
  const id = document.getElementById("new-cat-id").value;
  const title = document.getElementById("new-cat-title").value;
  if (!id || !title) return alert("ادخل البيانات");
  await setDoc(doc(db, "menu", id), { title: title, items: [] });
  alert("تم إضافة القسم");
  document.getElementById("new-cat-id").value = "";
  document.getElementById("new-cat-title").value = "";
};

window.editCategory = async function (id, oldTitle) {
  const newTitle = prompt("أدخل الاسم الجديد للقسم:", oldTitle);
  if (newTitle && newTitle !== oldTitle) {
    await updateDoc(doc(db, "menu", id), { title: newTitle });
    alert("تم تحديث اسم القسم");
  }
};

window.deleteCategory = async function (id) {
  if (confirm("سيتم حذف القسم وكل الأصناف اللي جواه! متأكد؟")) {
    await deleteDoc(doc(db, "menu", id));
  }
};

// --- 2. إدارة الأصناف ---
function listenToMenuItems() {
  onSnapshot(collection(db, "menu"), (snapshot) => {
    const manager = document.getElementById("menu-items-manager");
    manager.innerHTML = "";
    snapshot.forEach((catDoc) => {
      const data = catDoc.data();
      const catId = catDoc.id;
      let html = `<h4 style="color:#e67e22; margin-top:30px; border-bottom:1px solid #ddd;">📂 قسم: ${data.title}</h4><table>
                        <tr><th>الصورة</th><th>الاسم</th><th>السعر</th><th>تحكم</th></tr>`;
      data.items.forEach((item, index) => {
        html += `<tr>
                    <td>
                        <img src="${item.img}" width="45" height="45" style="border-radius:5px;"><br>
                        <button class="btn-img" onclick="updateItemImage('${catId}', ${index})">تغيير الصورة 📸</button>
                    </td>
                    <td>${item.name}</td>
                    <td>${item.price} ج.م</td>
                    <td>
                        <button class="btn-edit" onclick="editItem('${catId}', ${index})">تعديل ✏️</button>
                        <button class="btn-del" onclick="deleteItem('${catId}', ${index})">حذف 🗑️</button>
                    </td>
                </tr>`;
      });
      manager.innerHTML += html + "</table>";
    });
  });
}

window.addNewItem = async function () {
  const cat = document.getElementById("item-category-select").value;
  const name = document.getElementById("item-name").value;
  const price = Number(document.getElementById("item-price").value);
  const file = document.getElementById("item-image").files[0];
  if (!name || !file) return alert("اكمل البيانات واختار صورة");

  document.getElementById("upload-status").innerText = "جاري رفع الصورة...";
  try {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();

    await updateDoc(doc(db, "menu", cat), {
      items: arrayUnion({ name: name, price: price, img: json.data.url }),
    });
    document.getElementById("upload-status").innerText = "✅ تم الإضافة!";
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
  } catch (e) {
    alert("فشل الرفع");
  }
};

window.editItem = async function (catId, index) {
  const ref = doc(db, "menu", catId);
  const snap = await getDoc(ref);
  let items = snap.data().items;
  const item = items[index];

  const newName = prompt("الاسم الجديد:", item.name);
  const newPrice = prompt("السعر الجديد:", item.price);

  if (newName && newPrice) {
    items[index].name = newName;
    items[index].price = Number(newPrice);
    await updateDoc(ref, { items: items });
    alert("تم التعديل");
  }
};

window.updateItemImage = async function (catId, index) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById("upload-status").innerText = "جاري تحديث الصورة...";
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        { method: "POST", body: formData },
      );
      const json = await res.json();

      const ref = doc(db, "menu", catId);
      const snap = await getDoc(ref);
      let items = snap.data().items;
      items[index].img = json.data.url;

      await updateDoc(ref, { items: items });
      document.getElementById("upload-status").innerText =
        "✅ تم تحديث الصورة!";
    } catch (err) {
      alert("فشل التحديث");
    }
  };
  fileInput.click();
};

window.deleteItem = async function (catId, index) {
  if (!confirm("حذف الصنف؟")) return;
  const ref = doc(db, "menu", catId);
  const snap = await getDoc(ref);
  let items = snap.data().items;
  items.splice(index, 1);
  await updateDoc(ref, { items: items });
};

// --- 3. الطلبات ---
function listenToOrders() {
  onSnapshot(collection(db, "orders"), (snapshot) => {
    const list = document.getElementById("orders-list");
    list.innerHTML = "";
    snapshot.forEach((doc) => {
      const o = doc.data();
      list.innerHTML += `<div class="order-card">
                <strong>👤 العميل: ${o.customerName}</strong> (${o.customerPhone})<br>
                📍 العنوان: ${o.customerAddress}<br>
                💰 الإجمالي: ${o.totalPrice} ج.م<br>
                🕒 التاريخ: ${o.orderDate}
            </div>`;
    });
  });
}

listenToCategories();
listenToMenuItems();
listenToOrders();
