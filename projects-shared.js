(() => {
  const HOVER_SLIDE_MS = 650;
  const uploadDateCache = new Map();

  const getLanguage = () => document.documentElement.lang || "es";

  const getResourceUploadDate = async (src) => {
    if (uploadDateCache.has(src)) {
      return uploadDateCache.get(src);
    }

    let uploadedAt = 0;

    try {
      const response = await fetch(src, { method: "HEAD", cache: "no-store" });

      if (response.ok) {
        const lastModified = response.headers.get("Last-Modified");

        if (lastModified) {
          uploadedAt = Date.parse(lastModified) || 0;
        }
      }
    } catch {
      uploadedAt = 0;
    }

    uploadDateCache.set(src, uploadedAt);
    return uploadedAt;
  };

  const getProjectUploadDate = async (project) => {
    const sources = [project.cover, ...(project.hoverImages || [])];
    const dates = await Promise.all(sources.map(getResourceUploadDate));
    return Math.max(...dates, 0);
  };

  const sortProjectsByUploadDate = async (projects) => {
    const projectsWithDates = await Promise.all(
      projects.map(async (project, index) => ({
        project,
        uploadedAt: await getProjectUploadDate(project),
        index,
      }))
    );

    return projectsWithDates
      .sort((left, right) => {
        if (right.uploadedAt !== left.uploadedAt) {
          return right.uploadedAt - left.uploadedAt;
        }

        return left.index - right.index;
      })
      .map(({ project }) => project);
  };

  const buildCarouselCard = (project, language, options = {}) => {
    const { duplicate = false } = options;
    const article = document.createElement("article");
    article.className = "project-card";
    article.dataset.projectId = project.id;

    if (duplicate) {
      article.setAttribute("aria-hidden", "true");
    }

    const link = document.createElement("a");
    link.className = "project-card__image-link";

    if (project.carouselLink && !duplicate) {
      link.href = project.carouselLink;
    }

    if (duplicate) {
      link.tabIndex = -1;
    }

    const image = document.createElement("img");
    image.src = project.cover;
    image.alt = duplicate ? "" : project.alt[language] || project.alt.es;

    const content = document.createElement("div");
    content.className = "project-card__content";

    const service = document.createElement("span");
    service.textContent = project.service[language] || project.service.es;

    const title = document.createElement("h3");
    title.textContent = project.name;

    link.appendChild(image);
    content.append(service, title);
    article.append(link, content);

    return article;
  };

  const buildGridProject = (project, language) => {
    const article = document.createElement("article");
    article.className = "grid-project";
    article.dataset.projectId = project.id;
    article.dataset.category = project.categories.join(" ");
    article.dataset.hoverImages = project.hoverImages.join(",");
    article.tabIndex = 0;

    const imageWrap = document.createElement("div");
    imageWrap.className = "grid-project__image";

    const image = document.createElement("img");
    image.src = project.cover;
    image.alt = project.alt[language] || project.alt.es;

    const content = document.createElement("div");
    content.className = "grid-project__content";

    const title = document.createElement("h2");
    title.textContent = project.name;

    const service = document.createElement("p");
    service.textContent = project.service[language] || project.service.es;

    imageWrap.appendChild(image);
    content.append(title, service);
    article.append(imageWrap, content);

    return article;
  };

  const renderPortfolioCarousel = async (track, language = getLanguage()) => {
    if (!track || !window.PROJECTS_DATA?.length) return [];

    const sortedProjects = await sortProjectsByUploadDate(window.PROJECTS_DATA);
    const fragment = document.createDocumentFragment();

    sortedProjects.forEach((project) => {
      fragment.appendChild(buildCarouselCard(project, language));
    });

    sortedProjects.forEach((project) => {
      fragment.appendChild(
        buildCarouselCard(project, language, { duplicate: true })
      );
    });

    track.replaceChildren(fragment);
    return sortedProjects;
  };

  const renderProjectsGrid = async (grid, language = getLanguage()) => {
    if (!grid || !window.PROJECTS_DATA?.length) return [];

    const sortedProjects = await sortProjectsByUploadDate(window.PROJECTS_DATA);
    const fragment = document.createDocumentFragment();

    sortedProjects.forEach((project) => {
      fragment.appendChild(buildGridProject(project, language));
    });

    grid.replaceChildren(fragment);
    return sortedProjects;
  };

  const applyCarouselLabels = (language = getLanguage()) => {
    if (!window.PROJECTS_DATA?.length) return;

    document.querySelectorAll(".project-card[data-project-id]").forEach((card) => {
      const project = window.PROJECTS_DATA.find(
        (item) => item.id === card.dataset.projectId
      );

      if (!project) return;

      const label = card.querySelector(".project-card__content span");
      const image = card.querySelector("img");

      if (label) {
        label.textContent = project.service[language] || project.service.es;
      }

      if (image && !card.hasAttribute("aria-hidden")) {
        image.alt = project.alt[language] || project.alt.es;
      }
    });
  };

  const initProjectHoverSlideshow = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    document.querySelectorAll(".grid-project[data-hover-images]").forEach((project) => {
      const imageWrap = project.querySelector(".grid-project__image");
      const img = project.querySelector(".grid-project__image img");

      if (!imageWrap || !img) return;

      const hoverImages = project.dataset.hoverImages
        .split(",")
        .map((src) => src.trim())
        .filter(Boolean);

      if (hoverImages.length === 0) return;

      const defaultSrc = img.getAttribute("src");
      let frameIndex = 0;
      let slideTimer = null;

      hoverImages.forEach((src) => {
        const preload = new Image();
        preload.src = src;
      });

      const showFrame = (index) => {
        img.src = hoverImages[index];
      };

      const startSlideshow = () => {
        if (slideTimer) return;

        frameIndex = 0;
        showFrame(frameIndex);

        slideTimer = window.setInterval(() => {
          frameIndex = (frameIndex + 1) % hoverImages.length;
          showFrame(frameIndex);
        }, HOVER_SLIDE_MS);
      };

      const stopSlideshow = () => {
        if (slideTimer) {
          window.clearInterval(slideTimer);
          slideTimer = null;
        }

        img.src = defaultSrc;
      };

      imageWrap.addEventListener("mouseenter", startSlideshow);
      imageWrap.addEventListener("mouseleave", stopSlideshow);
    });
  };

  window.ProjectsShared = {
    sortProjectsByUploadDate,
    renderPortfolioCarousel,
    renderProjectsGrid,
    applyCarouselLabels,
    initProjectHoverSlideshow,
  };
})();
