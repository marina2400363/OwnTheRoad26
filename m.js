const $ = id => document.getElementById(id);
const nameInp = $('name'), emailInp = $('email'), phoneInp = $('phone');
const pickup = $('pickup'), ret = $('return'), btn = $('bookBtn'), msg = $('msg');
const daysSpan = $('days'), subSpan = $('sub'), taxSpan = $('tax'), totalSpan = $('total');
const RATE = 850, TAX = 0.08;

function getDays(s, e) {
  if (!s || !e) return 0;
  let start = new Date(s), end = new Date(e);
  start.setHours(0,0,0,0); end.setHours(0,0,0,0);
  let diff = (end - start) / (86400000);
  return diff >= 0 ? diff + 1 : 0;
}

function update() {
  let days = getDays(pickup.value, ret.value);
  daysSpan.innerText = days;
  let sub = days * RATE, tax = sub * TAX, total = sub + tax;
  subSpan.innerText = sub.toFixed(2);
  taxSpan.innerText = tax.toFixed(2);
  totalSpan.innerText = total.toFixed(2);
}

function isValid() {
  let name = nameInp.value.trim();
  if (!name || name.length < 3) return alert("Name (min 3 chars)"), false;
  let email = emailInp.value.trim();
  if (!email.includes('@') || !email.includes('.')) return alert("Valid email needed"), false;
  let phone = phoneInp.value.trim().replace(/\D/g,'');
  if (phone.length < 10 || phone.length > 11) return alert("Phone must be 10–11 digits"), false;
  let today = new Date(); today.setHours(0,0,0,0);
  let pick = new Date(pickup.value), retD = new Date(ret.value);
  if (!pickup.value || pick < today) return alert("Pickup date invalid or past"), false;
  if (!ret.value || retD < pick) return alert("Return date must be after pickup"), false;
  return true;
}

function save() {
  let bookings = JSON.parse(localStorage.getItem('velocity_bookings') || '[]');
  bookings.push({ id: Date.now(), name: nameInp.value.trim(), email: emailInp.value.trim(), phone: phoneInp.value.trim(), car: "Lamborghini Aventador", pickup: pickup.value, return: ret.value, days: daysSpan.innerText, total: totalSpan.innerText });
  localStorage.setItem('velocity_bookings', JSON.stringify(bookings));
}

btn.onclick = e => {
  e.preventDefault();
  if (!isValid()) return;
  save();
  msg.innerHTML = '<span style="color:#2ecc71;">✅ Booked! Total ' + totalSpan.innerText + ' LE</span>';
  setTimeout(() => msg.innerHTML = '', 3000);
};

let today = new Date(), y = today.getFullYear(), m = String(today.getMonth()+1).padStart(2,'0'), d = String(today.getDate()).padStart(2,'0');
let tom = new Date(today); tom.setDate(today.getDate()+1);
pickup.value = `${y}-${m}-${d}`;
ret.value = `${y}-${String(tom.getMonth()+1).padStart(2,'0')}-${String(tom.getDate()).padStart(2,'0')}`;
pickup.onchange = ret.onchange = update;
update();