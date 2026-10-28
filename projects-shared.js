(() => {
  const HOVER_SLIDE_MS = 650;
  const getLanguage = () => document.documentElement.lang || "es";

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
    const homeService = project.homeService || project.service;
    service.textContent = homeService[language] || homeService.es;

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
    if (project.hoverImages?.length) {
      article.dataset.hoverImages = project.hoverImages.join(",");
    }
    if (project.hoverVideos?.length) {
      article.dataset.hoverVideos = project.hoverVideos.join(",");
    }
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

    const sortedProjects = window.PROJECTS_DATA.filter(
      (project) => project.showOnHome !== false
    );
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

    const sortedProjects = window.PROJECTS_DATA;
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
        const homeService = project.homeService || project.service;
        label.textContent = homeService[language] || homeService.es;
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

    document.querySelectorAll(".grid-project[data-hover-videos]").forEach((project) => {
      const imageWrap = project.querySelector(".grid-project__image");
      const img = project.querySelector(".grid-project__image img");

      if (!imageWrap || !img) return;

      const hoverVideos = project.dataset.hoverVideos
        .split(",")
        .map((src) => src.trim())
        .filter(Boolean);

      if (hoverVideos.length === 0) return;

      const video = document.createElement("video");
      video.className = "grid-project__hover-video";
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-hidden", "true");
      imageWrap.appendChild(video);

      let videoIndex = 0;
      let isHovering = false;

      const playVideo = (index) => {
        videoIndex = index;
        video.src = hoverVideos[videoIndex];
        video.load();
        video.play().catch(() => {});
      };

      video.addEventListener("ended", () => {
        if (isHovering) playVideo((videoIndex + 1) % hoverVideos.length);
      });

      imageWrap.addEventListener("mouseenter", () => {
        isHovering = true;
        imageWrap.classList.add("is-playing-video");
        playVideo(0);
      });

      imageWrap.addEventListener("mouseleave", () => {
        isHovering = false;
        video.pause();
        video.removeAttribute("src");
        video.load();
        imageWrap.classList.remove("is-playing-video");
      });
    });
  };

  window.ProjectsShared = {
    renderPortfolioCarousel,
    renderProjectsGrid,
    applyCarouselLabels,
    initProjectHoverSlideshow,
  };
})();
