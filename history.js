// ===============================
// ประวัติการซื้อ (History)
// ===============================

// แสดงประวัติการซื้อ
function renderHistory(){
  const list = document.getElementById('history-list');
  if(!list) return;

  const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
  list.innerHTML = '';

  // กรณียังไม่มีประวัติ
  if(history.length === 0){
    list.innerHTML = `
      <li class="history-empty">
        🛒 ยังไม่มีประวัติการซื้อ
      </li>
    `;
    return;
  }

  let totalPrice = 0;

  history.forEach(item => {
    totalPrice += Number(item.price) || 0;

    const li = document.createElement('li');
    li.className = 'history-item';

    li.innerHTML = `
      <div class="history-row">
        <img src="${item.image}" alt="${item.name}">
        <div class="history-info">
          <strong>${item.name}</strong><br>
          <span class="history-price">
            ราคา ${item.price} บาท
          </span>
        </div>
      </div>
    `;

    list.appendChild(li);
  });

  // แสดงราคารวมท้ายรายการ
  const totalLi = document.createElement('li');
  totalLi.className = 'history-total';
  totalLi.innerHTML = `
    💰 รวมทั้งหมด: <strong>${totalPrice}</strong> บาท
  `;
  list.appendChild(totalLi);
}

// ===============================
// ลบประวัติทั้งหมด
// ===============================
function clearHistory(){
  const confirmDelete = confirm('คุณต้องการลบประวัติการซื้อทั้งหมดหรือไม่?');
  if(!confirmDelete) return;

  localStorage.removeItem('purchaseHistory');
  renderHistory();
}

// ===============================
// ปุ่มนำทาง
// ===============================
function goHome(){
  window.location.href = 'index.html';
}

function goToCart(){
  window.location.href = 'cart.html';
}

// ===============================
// โหลดอัตโนมัติเมื่อเปิดหน้า
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  renderHistory();
});
