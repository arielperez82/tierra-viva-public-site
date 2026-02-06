function initHeader(): void {
  const toggle = document.querySelector("[data-header-toggle]");
  const menu = document.querySelector("[data-header-menu]");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Open menu" : "Close menu");
    menu.classList.toggle("hidden", expanded);
    menu.setAttribute("aria-hidden", String(expanded));
  });
}

initHeader();
