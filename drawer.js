const drawerToggle = document.querySelector("[data-drawer-toggle]");
const drawer = document.querySelector("[data-drawer]");
const drawerBackdrop = document.querySelector("[data-drawer-backdrop]");

if (drawerToggle && drawer && drawerBackdrop) {
  function setDrawerOpen(isOpen) {
    document.body.classList.toggle("drawer-open", isOpen);
    drawerToggle.setAttribute("aria-expanded", String(isOpen));
    drawerToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    drawer.setAttribute("aria-hidden", String(!isOpen));

    if (isOpen) {
      drawer.focus({ preventScroll: true });
    } else {
      drawerToggle.focus({ preventScroll: true });
    }
  }

  drawerToggle.addEventListener("click", () => {
    const isOpen = drawerToggle.getAttribute("aria-expanded") === "true";
    setDrawerOpen(!isOpen);
  });

  drawerBackdrop.addEventListener("click", () => setDrawerOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (drawerToggle.getAttribute("aria-expanded") !== "true") return;
    setDrawerOpen(false);
  });
}
