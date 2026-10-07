/* ===== SITE SETTINGS: edit these ===== */
const CONFIG = {
  hotelName: "Aurelia Boutique Hotel",
  whatsapp: "910000000000",      // country code + number, digits only (no + or spaces)
  email: "hello@example.com",
  heroSeconds: 5                 // seconds per hero photo
};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const waLink = t => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`;
// Fill WhatsApp / email / name everywhere from CONFIG
$$("[data-wa]").forEach(a => a.href = waLink("Hello! I'd like to ask about a room."));
$$("[data-email]").forEach(a => { a.href = "mailto:" + CONFIG.email; a.textContent = CONFIG.email; });
$$("[data-hotel-name]").forEach(e => e.textContent = CONFIG.hotelName);
$("#year").textContent = new Date().getFullYear();
// Mobile menu
const mb = $("#menu-btn"), nav = $("#nav");
mb.onclick = () => mb.setAttribute("aria-expanded", nav.classList.toggle("open"));
// Date inputs: no past dates, checkout after check-in
const today = new Date().toISOString().slice(0, 10);
[["b-in", "b-out"], ["in", "out"]].forEach(([a, b]) => {
  const i = $("#" + a), o = $("#" + b); if (!i) return;
  i.min = o.min = today; i.onchange = () => { o.min = i.value || today; };
});
// Looping hero gallery (stays still if the visitor prefers reduced motion)
const slides = $$(".slide");
if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let n = 0; setInterval(() => { slides[n].classList.remove("on"); n = (n + 1) % slides.length; slides[n].classList.add("on"); }, CONFIG.heroSeconds * 1000);
}
// Booking bar + form -> WhatsApp or email (no backend)
function check(p, errId) {
  const v = id => ($("#" + p + id) || {}).value || "", e = $(errId);
  const bad = !v("in") || !v("out") ? "Please choose check-in and check-out dates." : v("out") <= v("in") ? "Check-out must be after check-in." : "";
  e.textContent = bad; e.hidden = !bad; return !bad;
}
const bar = $("#booking-bar");
if (bar) bar.onsubmit = e => {
  e.preventDefault(); if (check("b-", "#b-error"))
    open(waLink(`Hello ${CONFIG.hotelName}! Is a room available from ${$("#b-in").value} to ${$("#b-out").value} for ${$("#b-guests").value}?`), "_blank", "noopener");
};
// const form = $("#book");
// if (form) {
//   const msg = () => {
//     if (!$("#name").value.trim()) { $("#form-error").textContent = "Please enter your name."; $("#form-error").hidden = false; return null; }
//     if (!check("", "#form-error")) return null;
//     return `Hello ${CONFIG.hotelName}! I'm ${$("#name").value.trim()}. I'd like a ${$("#room").value} for ${$("#guests").value} guest(s), ${$("#in").value} to ${$("#out").value}. ${$("#msg").value.trim()}`;
//   };
//   form.onsubmit = e => { e.preventDefault(); const m = msg(); if (m) open(waLink(m), "_blank", "noopener"); };
//   $("#send-email").onclick = () => { const m = msg(); if (m) location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(m)}`; };
// }
// Lightbox
const lb = $("#lightbox");
if (lb) {
  const items = $$(".gal-item"); let cur = 0;
  const show = n => { cur = (n + items.length) % items.length; $("#lb-img").src = items[cur].dataset.full; $("#lb-img").alt = $("#lb-cap").textContent = items[cur].dataset.alt; };
  items.forEach((b, n) => b.onclick = () => { show(n); lb.showModal(); });
  $("#lb-close").onclick = () => lb.close(); $("#lb-prev").onclick = () => show(cur - 1); $("#lb-next").onclick = () => show(cur + 1);
  lb.onclick = e => { if (e.target === lb) lb.close(); };
  lb.onkeydown = e => { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); };
}

const msg = () => {
  const err = $("#form-error"), v = id => $("#" + id).value.trim();
  const bad = !v("name") ? "Please enter your name."
    : !/^\S+@\S+\.\S+$/.test(v("email")) ? "Please enter a valid email address."
    : v("phone").replace(/\D/g, "").length < 7 ? "Please enter a valid phone number."
    : "";
  if (bad) { err.textContent = bad; err.hidden = false; return null; }
  if (!check("", "#form-error")) return null; // checks the dates
  return `Hello ${CONFIG.hotelName}! I'm ${v("name")} (email: ${v("email")}, phone: ${v("phone")}). I'd like to book from ${v("in")} to ${v("out")}. ${v("msg")}`;
};
