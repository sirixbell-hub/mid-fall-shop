// =======================================
// CART SYSTEM
// =======================================

// โหลดตะกร้าจาก localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// =======================================
// NAVIGATION
// =======================================
function goHome(){
  window.location.href = 'index.html';
}

function goToCart(){
  window.location.href = 'cart.html';
}

function goToPurchaseHistory(){
  window.location.href = 'history.html';
}

// =======================================
// ADD TO CART
// =======================================
function addToCart(id){
  if(typeof products === "undefined"){
    alert("ไม่พบข้อมูลสินค้า");
    return;
  }

  const item = products.find(p => p.id === id);
  if(!item) return;

  cart.push({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// =======================================
// REMOVE ITEM
// =======================================
function removeItem(index){
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// =======================================
// CART COUNT
// =======================================
function updateCartCount(){
  const count = document.getElementById('cart-count');
  if(count){
    count.innerText = cart.length;
  }
}

// =======================================
// RENDER CART (cart.html)
// =======================================
function renderCart(){
  const tbody = document.getElementById('cart-body');
  const totalEl = document.getElementById('total-price');

  if(!tbody) return;

  tbody.innerHTML = '';
  let total = 0;

  if(cart.length === 0){
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center;padding:20px;">
          🛒 ยังไม่มีสินค้าในตะกร้า
        </td>
      </tr>
    `;
    if(totalEl) totalEl.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    total += Number(item.price);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <img src="${item.image}" 
             alt="${item.name}" 
             style="width:70px;border-radius:8px;">
      </td>
      <td>${item.name}</td>
      <td>${item.price} บาท</td>
      <td>
        <button class="remove-btn" onclick="removeItem(${index})">
          ❌
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if(totalEl){
    totalEl.innerText = total;
  }
}

// =======================================
// INIT
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
