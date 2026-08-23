const year = document.querySelector("#current-year");
const projectsGrid = document.querySelector(".projects-grid");
const filters = document.querySelectorAll("[data-filter]");
const contactSection = document.querySelector(".contact");
const contactLogo = document.querySelector(".contact__brand img");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

if (year) year.textContent = new Date().getFullYear();

const updateContactLogo = () => {
  if (!contactSection || !contactLogo) return;

  const contactRect = contactSection.getBoundingClientRect();
  const revealStart = window.innerHeight * 1.05;
  const revealEnd = window.innerHeight * 0.75;
  const progress = clamp(
    (revealStart - contactRect.top) / (revealStart - revealEnd),
    0,
    1
  );
  const stretch = 2 - progress;

  contactLogo.style.setProperty("--contact-logo-stretch", stretch);
};

let contactLogoFrame = null;

const requestContactLogoUpdate = () => {
  if (contactLogoFrame) return;

  contactLogoFrame = window.requestAnimationFrame(() => {
    updateContactLogo();
    contactLogoFrame = null;
  });
};

updateContactLogo();
window.addEventListener("scroll", requestContactLogoUpdate, { passive: true });
window.addEventListener("resize", requestContactLogoUpdate);

const bindProjectFilters = () => {
  const projects = document.querySelectorAll(".grid-project[data-category]");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach((button) => {
        const active = button === filter;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      projects.forEach((project) => {
        const categories = project.dataset.category.split(" ");
        project.hidden = category !== "all" && !categories.includes(category);
      });
    });
  });
};

const initProjectsPage = async () => {
  if (projectsGrid && window.ProjectsShared) {
    await window.ProjectsShared.renderProjectsGrid(projectsGrid);
    window.ProjectsShared.initProjectHoverSlideshow();
  }

  bindProjectFilters();
};

initProjectsPage();

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#site-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}
