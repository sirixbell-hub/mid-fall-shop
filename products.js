// ข้อมูลสินค้า
// ข้อมูลสินค้า
const products = [
  {
    id: 1,
    name: "if",
    category: "เครื่องดื่ม",
    price: 100,
    image: "images/product1.jpg"
  },
  {
    id: 2,
    name: "kito",
    category: "รองเท้า",
    price: 200,
    image: "images/product2.jpg"
  },
  {
    id: 3,
    name: "adda",
    category: "รองเท้า",
    price: 150,
    image: "images/product3.jpg"
  },
  {
    id: 4,
    name: "SEACHENIC",
    category: "กางเกง",
    price: 250,
    image: "images/product4.jpg"
  },
  {
    id: 5,
    name: "SEACHENIC",
    category: "ถุงเท้า",
    price: 250,
    image: "images/product5.jpg"
  },
  {
    id: 6,
    name: "วาสลีนเรเดียนซ์ ซัน โทนอัพ 150ก",
    category: "บำรุงผิว",
    price: 250,
    image: "images/product6.jpg"
  },
  {
    id: 7,
    name: "Socksy",
    category: "ถุงเท้า",
    price: 250,
    image: "images/product7.jpg"
  },
  {
    id: 8,
    name: "เครื่องวัดระดับน้ำเลเซอร์",
    category: "เครื่องมือช่าง",
    price: 250,
    image: "images/product8.jpg"
  },
  {
    id: 9,
    name: "กระเป๋าไก่ตุ๊กตา นุ่ม ดีไซน์น่ารักสินค้า D",
    category: "กระเป๋า",
    price: 250,
    image: "images/product9.jpg"
  },
  {
    id: 10,
    name: "กระเป๋าแฟชั่นผู้ชาย",
    category: "กระเป๋า",
    price: 250,
    image: "images/product10.jpg"
  },
  {
    id: 11,
    name: "กระเป๋านุ่มนิ่มผ้าร่มใบจิ๋ว",
    category: "กระเป๋า",
    price: 250,
    image: "images/product11.jpg"
  },
  {
    id: 12,
    name: "รองเท้าแตะ ARI",
    category: "รองเท้า",
    price: 250,
    image: "images/product12.jpg"
  },
  {
    id: 13,
    name: "รองเท้ากีฬา รองเท้าวิ่งลําลอง พื้นนิ่ม ",
    category: "รองเท้า",
    price: 250,
    image: "images/product13.jpg"
  },
  {
    id: 14,
    name: "SUGE เด็ก สีขาวพื้นนุ่ม",
    category: "รองเท้า",
    price: 250,
    image: "images/product14.jpg"
  },
  {
    id: 15,
    name: "PUMA BASICS ",
    category: "กระเป๋า",
    price: 250,
    image: "images/product15.jpg"
  },
  {
    id: 16,
    name: "กระเป๋าเป้สะพายหลัง",
    category: "กระเป๋า",
    price: 250,
    image: "images/product16.jpg"
  },
  {
    id: 17,
    name: "Nims crispy choco tube",
    category: "ขนม",
    price: 250,
    image: "images/product17.jpg"
  },
  {
    id: 18,
    name: "BON FOOTBALL CHOCO ช็อกโกแลตฟุตบอลกระปุก",
    category: "ขนม",
    price: 250,
    image: "images/product18.jpg"
  },
  {
    id: 19,
    name: "ผักอบกรอบ ผักผลไม้อบกรอบ",
    category: "ขนม",
    price: 250,
    image: "images/product19.jpg"
  },
  {
    id: 20,
    name: "เม็ดมะม่วงหิมพานต์",
    category: "ขนม",
    price: 250,
    image: "images/product20.jpg"
  },
  {
    id: 21,
    name: "เพียวริคุ  ยกลัง 24 ขวด ",
    category: "เครื่องดื่ม",
    price: 250,
    image: "images/product21.jpg"
  },
  {
    id: 22,
    name: "กางเกงขาสั้นผู้ชายแฟชั่น",
    category: "กางเกง",
    price: 250,
    image: "images/product22.jpg"
  },
  {
    id: 23,
    name: "กางเกงในผู้ชายขาสั้น",
    category: "กางเกงใน",
    price: 250,
    image: "images/product23.jpg"
  },
  {
    id: 24,
    name: "ที่วางโทรศัพท์มือถือ แบบตั้งโต๊ะ พกพาสะดวก",
    category: "ที่วางโทรศัพท์",
    price: 250,
    image: "images/product24.jpg"
  }
];

// ฟังก์ชันแสดงสินค้า
function renderProducts(list = products) {
  const container = document.getElementById('product-list');
  if (!container) return;

  container.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.id = `product-${item.id}`; // ⭐ สำคัญ (ใช้กับเอฟเฟ็กต์ลอย)

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">${item.price} บาท</p>
      <button type="button" onclick="addToCart(${item.id})">
        เพิ่มตะกร้า
      </button>
    `;

    container.appendChild(card);
  });
}

