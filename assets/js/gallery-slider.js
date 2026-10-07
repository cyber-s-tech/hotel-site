/* Home page gallery slider.
   - Slides automatically in a seamless loop
   - Pauses while the mouse is over it, or a photo has keyboard focus, or it is being touched
   - Click (or Enter) on a photo opens a popup with previous / next
   Needs: #gs-viewport, #gs-track, .gs-item buttons, #gs-popup (all in index.html). */
(function () {
  const vp = document.getElementById("gs-viewport"), track = document.getElementById("gs-track");
  if (!vp || !track) return;
  const SPEED = 40; // pixels per second: change to slide faster or slower
  const items = [...track.querySelectorAll(".gs-item")];

  // Clone the photos once so the loop has no visible jump
  items.forEach(el => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.tabIndex = -1; track.appendChild(c); });
  const loopWidth = () => track.children[items.length].offsetLeft - track.children[0].offsetLeft;

  // ----- auto slide -----
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let paused = false, pos = 0, last = 0, touchTimer;
  function tick(t) {
    if (!last) last = t;
    const dt = (t - last) / 1000; last = t;
    if (!paused && !still) {
      pos += SPEED * dt;
      const w = loopWidth(); if (w > 0 && pos >= w) pos -= w;
      vp.scrollLeft = pos;
    }
    requestAnimationFrame(tick);
  }
  const pause = () => { paused = true; };
  const resume = () => { pos = vp.scrollLeft; paused = false; }; // continue from where the visitor left it
  vp.addEventListener("mouseenter", pause);
  vp.addEventListener("mouseleave", resume);
  vp.addEventListener("focusin", pause);
  vp.addEventListener("focusout", resume);
  vp.addEventListener("touchstart", () => { clearTimeout(touchTimer); pause(); }, { passive: true });
  vp.addEventListener("touchend", () => { touchTimer = setTimeout(resume, 2500); }, { passive: true });
  // keep the loop seamless if the visitor drags or swipes past the end
  vp.addEventListener("scroll", () => { if (paused) { const w = loopWidth(); if (vp.scrollLeft >= w) vp.scrollLeft -= w; } }, { passive: true });
  requestAnimationFrame(tick);

  // ----- popup -----
  const pop = document.getElementById("gs-popup");
  if (!pop) return;
  let cur = 0;
  const show = n => {
    cur = (n + items.length) % items.length;
    const b = items[cur];
    document.getElementById("gs-img").src = b.dataset.full;
    document.getElementById("gs-img").alt = document.getElementById("gs-cap").textContent = b.dataset.alt;
  };
  track.addEventListener("click", e => {
    const b = e.target.closest(".gs-item"); if (!b) return;
    show([...track.children].indexOf(b) % items.length);
    pop.showModal();
  });
  pop.addEventListener("close", resume);
  document.getElementById("gs-close").onclick = () => pop.close();
  document.getElementById("gs-prev").onclick = () => show(cur - 1);
  document.getElementById("gs-next").onclick = () => show(cur + 1);
  pop.addEventListener("click", e => { if (e.target === pop) pop.close(); });
  pop.addEventListener("keydown", e => { if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
})();
