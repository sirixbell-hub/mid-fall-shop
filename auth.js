/****************************
 * PASSWORD VALIDATION
 ****************************/

// ตรวจว่ารหัสเป็นลำดับ (ตัวเลข / อังกฤษ / ไทย)
function isSequential(password){
  const seqNum = "0123456789";
  const seqEng = "abcdefghijklmnopqrstuvwxyz";
  const seqThai = "กขคงจฉชซฌญ";

  password = password.toLowerCase();

  for(let i = 0; i <= password.length - 3; i++){
    const part = password.substring(i, i + 3);
    if(
      seqNum.includes(part) ||
      seqEng.includes(part) ||
      seqThai.includes(part)
    ){
      return true;
    }
  }
  return false;
}

// ตรวจตัวซ้ำติดกันเกิน 2 ตัว
function hasRepeatedChars(password){
  let count = 1;
  for(let i = 1; i < password.length; i++){
    if(password[i] === password[i - 1]){
      count++;
      if(count >= 3) return true;
    }else{
      count = 1;
    }
  }
  return false;
}

/****************************
 * REGISTER
 ****************************/
function register(){
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  if(!username || !password){
    alert('กรุณากรอกข้อมูลให้ครบ');
    return;
  }

  if(username.length < 6 || username.length > 20){
    alert('ชื่อผู้ใช้ต้องยาว 6–20 ตัวอักษร');
    return;
  }

  if(password.length < 6){
    alert('รหัสผ่านต้องมีอย่างน้อย 6 ตัว');
    return;
  }

  if(isSequential(password)){
    alert('รหัสผ่านเดาง่ายเกินไป (ห้ามเป็นลำดับ)');
    return;
  }

  if(hasRepeatedChars(password)){
    alert('รหัสผ่านห้ามมีตัวซ้ำติดกันเกิน 2 ตัว');
    return;
  }

  const user = { username, password };
  localStorage.setItem('user', JSON.stringify(user));

  alert('สมัครสมาชิกสำเร็จ ✅');
  window.location.href = 'login.html';
}

/****************************
 * LOGIN
 ****************************/
function login(){
  const username = document.getElementById('username')?.value.trim();
  const password = document.getElementById('password')?.value.trim();

  const user = JSON.parse(localStorage.getItem('user'));

  if(!user){
    alert('ยังไม่มีบัญชี กรุณาสมัครสมาชิกก่อน');
    return;
  }

  if(username === user.username && password === user.password){
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);

    alert('ล็อกอินสำเร็จ 🎉');
    window.location.href = 'index.html';
  }else{
    alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  }
}

/****************************
 * LOGOUT
 ****************************/
function logout(){
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');

  alert('ออกจากระบบเรียบร้อย');
  window.location.href = 'index.html';
}

/****************************
 * AUTH UI
 ****************************/
function updateAuthUI(){
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');

  if(loginBtn){
    loginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
  }
  if(logoutBtn){
    logoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', updateAuthUI);

/****************************
 * REQUIRE LOGIN
 ****************************/
function requireLogin(){
  if(localStorage.getItem('isLoggedIn') !== 'true'){
    alert('กรุณาล็อกอินก่อนทำรายการ');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/****************************
 * NAVIGATION
 ****************************/
function goHome(){
  window.location.href = 'index.html';
}
