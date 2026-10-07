(function () {
  const tabs = [...document.querySelectorAll(".gal-tab")];
  const items = [...document.querySelectorAll(".gal-item")];
  tabs.forEach(tab => tab.addEventListener("click", () => {
    const f = tab.dataset.filter;
    tabs.forEach(t => t.setAttribute("aria-pressed", t === tab));
    items.forEach(i => { i.hidden = f !== "all" && i.dataset.category !== f; });
  }));
})();