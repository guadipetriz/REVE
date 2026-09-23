(() => {
  const projects = [
    { slug: "muta", name: "MUTA" },
    { slug: "femma", name: "Femma" },
    { slug: "cr-helados", name: "CR Helados" },
    { slug: "macarella", name: "Macarella" },
    { slug: "body-koncept", name: "Body Koncept" },
    { slug: "masa-madre", name: "Masa Madre" },
    { slug: "talia", name: "Talia" },
  ];
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const currentSlug = pathParts.at(-1) === "index.html" ? pathParts.at(-2) : pathParts.at(-1);
  const intro = document.querySelector(".byten10-intro");

  if (intro) {
    const projectNav = document.createElement("nav");
    const projectList = document.createElement("ul");
    const projectLabel = document.createElement("p");

    projectNav.className = "byten10-project-nav";
    projectNav.setAttribute("aria-label", "Otros proyectos realizados para Ten10 Design");
    projectLabel.className = "byten10-project-nav__label";
    projectLabel.textContent = "Proyectos Ten10";
    projectList.className = "byten10-project-nav__list";

    projects.forEach((project) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      const isCurrent = project.slug === currentSlug;

      link.href = `../${project.slug}/`;
      link.textContent = project.name;
      link.classList.toggle("is-current", isCurrent);

      if (isCurrent) link.setAttribute("aria-current", "page");

      item.appendChild(link);
      projectList.appendChild(item);
    });

    projectNav.append(projectLabel, projectList);
    intro.appendChild(projectNav);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const introItems = document.querySelectorAll(
    ".byten10-intro__facts > div, .byten10-intro__description"
  );
  const galleryItems = document.querySelectorAll(".byten10-gallery__item");
  const projectNav = document.querySelector(".byten10-project-nav");
  const revealItems = [...introItems, ...(projectNav ? [projectNav] : []), ...galleryItems];

  if (reduceMotion || !("IntersectionObserver" in window)) return;

  introItems.forEach((item, index) => {
    item.classList.add("byten10-reveal");
    item.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });

  galleryItems.forEach((item) => item.classList.add("byten10-reveal"));
  projectNav?.classList.add("byten10-reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
