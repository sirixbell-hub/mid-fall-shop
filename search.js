// ค้นหาสินค้า
function searchProduct(){
  const input = document.getElementById('search');
  if(!input) return;

  const keyword = input.value.trim().toLowerCase();

  // ถ้าไม่พิมพ์อะไร → แสดงทั้งหมด
  if(keyword === ''){
    renderProducts();
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  renderProducts(filtered);
}

// ล้างการค้นหา
function clearSearch(){
  const input = document.getElementById('search');
  if(input) input.value = '';
  renderProducts();
}
