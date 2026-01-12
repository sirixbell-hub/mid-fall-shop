// =======================================
// CHECKOUT SYSTEM
// =======================================

// ตรวจสอบการล็อกอิน
function checkLogin(){
  if(localStorage.getItem('isLoggedIn') !== 'true'){
    alert('กรุณาล็อกอินก่อน');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// ดึงข้อมูลตะกร้า
function getCart(){
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// ดึงข้อมูลที่อยู่
function getDelivery(){
  return JSON.parse(localStorage.getItem('deliveryInfo'));
}

// =======================================
// CHECKOUT หลัก
// =======================================
function checkout(paymentMethod){
  if(!checkLogin()) return;

  const cart = getCart();
  if(cart.length === 0){
    alert("ไม่มีสินค้าในตะกร้า");
    return;
  }

  const delivery = getDelivery();
  if(!delivery){
    alert("กรุณาบันทึกที่อยู่จัดส่งก่อน");
    return;
  }

  // บันทึกประวัติการซื้อ
  const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

  cart.forEach(item => {
    history.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      payment: paymentMethod,
      date: new Date().toLocaleString()
    });
  });

  localStorage.setItem('purchaseHistory', JSON.stringify(history));
  localStorage.setItem('cart', JSON.stringify([])); // ล้างตะกร้า

  // แจ้งผลการชำระ
  if(paymentMethod === "bank"){
    alert(
      `💳 ชำระเงินผ่านธนาคารสำเร็จ!\n\n` +
      `ชื่อ: ${delivery.name}\n` +
      `ที่อยู่: ${delivery.address}\n` +
      `เบอร์: ${delivery.phone}`
    );
  } else {
    alert(
      `🚚 สั่งซื้อเรียบร้อย (เก็บเงินปลายทาง)\n\n` +
      `ชื่อ: ${delivery.name}\n` +
      `ที่อยู่: ${delivery.address}\n` +
      `เบอร์: ${delivery.phone}`
    );
  }

  window.location.href = 'history.html';
}

// =======================================
// PAYMENT METHODS
// =======================================
function payBank(){
  if(!checkLogin()) return;

  if(getCart().length === 0){
    alert("ไม่มีสินค้าในตะกร้า");
    return;
  }

  if(!getDelivery()){
    alert("กรุณาบันทึกที่อยู่จัดส่งก่อน");
    return;
  }

  document.getElementById("qr-result").innerText =
    "📷 กรุณาสแกน QR Code เพื่อชำระเงินผ่านธนาคาร";

  startQRScanner(() => checkout("bank"));
}

function payCOD(){
  checkout("cod");
}

// =======================================
// DELIVERY INFO
// =======================================
function saveDelivery(){
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if(!name || !address || !phone){
    alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }

  // เบอร์โทรไทย
  const phonePattern = /^0\d{8,9}$/;
  if(!phonePattern.test(phone)){
    alert('กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 0812345678');
    return;
  }

  localStorage.setItem(
    'deliveryInfo',
    JSON.stringify({ name, address, phone })
  );

  alert('📦 บันทึกที่อยู่จัดส่งเรียบร้อยแล้ว');
}

// =======================================
// QR SCANNER
// =======================================
function startQRScanner(onScanSuccess){
  const html5QrCode = new Html5Qrcode("qr-reader");

  html5QrCode.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrMessage => {
      document.getElementById("qr-result").innerText =
        "✅ สแกนสำเร็จ: " + qrMessage;

      html5QrCode.stop();

      if(onScanSuccess) onScanSuccess(qrMessage);
    },
    error => {}
  ).catch(err => {
    console.error(err);
    alert("❌ ไม่สามารถเปิดกล้องได้ (ต้องใช้ HTTPS หรืออนุญาตกล้อง)");
  });
}

// =======================================
// NAVIGATION
// =======================================
function goHome(){
  window.location.href = "index.html";
}

function goToCart(){
  window.location.href = "cart.html";
}
