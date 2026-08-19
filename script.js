const body = document.body;
const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuLinks = [...menu.querySelectorAll("a")];
const sections = [...document.querySelectorAll("main section[id]")];

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
}

menuToggle.addEventListener("click", () => {
  setMenu(!body.classList.contains("menu-open"));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 24),
  { passive: true },
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    menuLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${visible.target.id}`,
      );
    });
  },
  { rootMargin: "-30% 0px -55%", threshold: [0, 0.25, 0.6] },
);

sections.forEach((section) => sectionObserver.observe(section));
document.querySelector("[data-year]").textContent = new Date().getFullYear();
