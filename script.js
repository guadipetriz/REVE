const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#site-menu");
const nav = document.querySelector("[data-nav]");
const brandLink = document.querySelector("[data-brand-link]");
const languageToggle = document.querySelector("[data-language-toggle]");
const metaDescription = document.querySelector("[data-meta-description]");
const cursorDot = document.querySelector(".cursor-dot");
const yearElement = document.querySelector("#current-year");
let heroKeywords = document.querySelectorAll(".hero-keyword");
const heroTitle = document.querySelector("#hero-title");
const heroPreviewGroups = document.querySelectorAll(".hero-preview-group");
const heroActions = document.querySelectorAll("[data-hero-action]");
const portfolioCarousel = document.querySelector(".carousel");
const portfolioTrack = document.querySelector(".carousel__track");
const portfolioTitle = document.querySelector("[data-portfolio-title]");
const servicePanels = document.querySelectorAll(".service-panel");
const packagesModal = document.querySelector("#branding-packages-modal");
const openPackagesButtons = document.querySelectorAll("[data-open-packages]");
const closePackagesButtons = document.querySelectorAll("[data-close-packages]");
const packagesEyebrow = document.querySelector("[data-packages-eyebrow]");
const packagesTitle = document.querySelector("[data-packages-title]");
const packagesList = document.querySelector("[data-packages-list]");
const processCards = document.querySelectorAll(".process-card");
const processCardsSection = document.querySelector(".process-cards");
const contactSection = document.querySelector(".contact");
const contactLogo = document.querySelector(".contact__brand img");
const serviceHoverPreview = document.querySelector(".service-hover-preview");
const serviceHoverImages = serviceHoverPreview
  ? serviceHoverPreview.querySelectorAll("img")
  : [];
let scrollFrame = null;
let currentLanguage = "es";
let activePackageKey = "branding";
let renderPackages = () => {};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const translations = {
  es: {
    htmlLang: "es",
    meta:
      "Creative Studio",
    title: "RÊVE Studio",
    navLabel: "Navegación principal",
    brandLabel: "Guada Studio, ir al inicio",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    switchLabel: "Cambiar idioma a inglés",
    switchText: "EN",
    nav: {
      home: "Inicio",
      portfolio: "Portfolio",
      services: "Servicios",
      contact: "Contacto",
    },
    hero: {
      before: "Damos forma a eso que tu marca sueña ser a través de ",
      branding: "branding",
      middle: ", contenido para ",
      redes: "redes sociales",
      and: " y ",
      contenido: "páginas web",
      after: ".",
    },
    actions: {
      portfolio: "Ver portfolio",
      contact: "Trabajemos juntos",
    },
    heroActionsLabel: "Acciones principales",
    ticker:
      "DISEÑO Y DESARROLLO WEB — DISEÑO — REDES SOCIALES — FOTOGRAFÍA — DIRECCIÓN DE ARTE — NAMING — BRANDING —",
    tickerLabel: "Servicios destacados",
    carouselLabel: "Carrusel infinito de proyectos",
    servicesAccordionLabel: "Acordeón de servicios",
    portfolioTitle: "Últimos proyectos",
    projectLabels: [
      "Branding",
      "Branding / Ecommerce",
      "Diseño gráfico / Arquigrafía",
      "Packaging",
      "Contenido para Paid Media",
      "Diseño de tienda online",
    ],
    services: [
      {
        tab: "Branding",
        title: "Branding",
        text:
          "Con más de 10 marcas diseñadas en el último año para clientes de todo el mundo, incluyendo proyectos desarrollados para estudios como Ten10 Design, trabajé el branding de punta a punta, combinando estética, criterio y una base sólida para acompañar el crecimiento de cada marca.",
      },
      {
        tab: "Diseño gráfico",
        title: "Diseño gráfico",
        text:
          "Packaging, piezas impresas y aplicaciones para espacios comerciales pensadas para que tu marca se vea consistente en cada punto de contacto.",
      },
      {
        tab: "Redes sociales",
        title: "Redes sociales",
        text:
          "Con experiencia gestionando grandes comunidades, creamos contenido para redes sociales que ayuda a tu marca a crecer, conectar y mantenerse presente en los medios digitales.",
      },
      {
        tab: "Fotografía",
        title: "Fotografía",
        text:
          "Acompañamos la creación de contenido con una dirección creativa que asegura coherencia, optimiza tiempos y cuida cada detalle del resultado final.",
      },
      {
        tab: "Desarrollo web",
        title: "Diseño y desarrollo web",
        text:
          "Diseñamos y desarrollamos sitios web de alto impacto, pensados para transmitir el valor de tu marca y convertir visitas en oportunidades.",
      },
    ],
    packsButton: "Ver packs",
    processLabel: "Proceso creativo",
    processCards: [
      "Gestionando comunidades de +150 mil seguidores.",
      "+10 marcas desarrolladas en el último año.",
      "Trabajando para Buenos Aires, Costa Rica, España y Francia.",
      "Experiencia en retail, gastronomía y hotelería.",
    ],
    contactTitle: "Don't be shy, give REVE a try!",
    contactButton: "Escribinos",
    footerCredit: "Por Guadalupe Petriz",
    footerSocialLabel: "Redes sociales",
    instagramLabel: "Instagram de Guada Studio",
    closePacks: "Cerrar packs",
    quoteCta: "Cotizar este pack",
    packages: {
      branding: {
        eyebrow: "Branding",
        title: "Packs",
        label: "Packs de branding",
        items: [
          {
            name: "Básico",
            intro:
              "Pensado para quienes quieren salir al mercado rápido con una marca profesional, clara y bien resuelta.",
            includesLabel: "Incluye:",
            features: [
              ["Reunión inicial de kickoff.", true],
              ["Moodboard para definir la estética general.", true],
              ["Moodboard con 2 opciones conceptuales.", false],
              ["Logo principal con 2 instancias de modificación.", true],
              ["2 opciones de logo.", false],
              ["4 aplicaciones básicas a elección.", false],
              ["8 aplicaciones a elección.", false],
              ["2 instancias de modificación.", true],
              ["Entrega final del logo.", true],
              ["Brandbook completo.", true],
            ],
            list: [
              "Reunión inicial de kickoff.",
              "Presentación de moodboard para definir la estética general.",
              "Propuesta de logo principal con 2 instancias de modificación.",
              "Entrega final del logo.",
              "Brandbook completo.",
            ],
            meta: "Tiempo estimado: 20 días.",
            subject: "Cotizar Pack Básico",
            body:
              "Hola! Quiero cotizar el pack Básico de branding.",
          },
          {
            name: "Intermedio",
            intro:
              "Ideal para quienes buscan construir una marca desde una mirada más estratégica, con dirección, criterio y propósito.",
            includesLabel: "Incluye:",
            features: [
              ["Reunión inicial de kickoff.", true],
              ["Moodboard para definir la estética general.", false],
              ["Moodboard con 2 opciones conceptuales.", true],
              ["Logo principal con 2 instancias de modificación.", false],
              ["2 opciones de logo.", true],
              ["4 aplicaciones básicas a elección.", true],
              ["8 aplicaciones a elección.", false],
              ["2 instancias de modificación.", true],
              ["Entrega final del logo y aplicaciones en archivos editables.", true],
              ["Brandbook completo.", true],
            ],
            list: [
              "Reunión inicial de kickoff.",
              "Presentación de moodboard con 2 opciones conceptuales para definir la estética general.",
              "Propuesta de 2 opciones de logo.",
              "Desarrollo de 4 aplicaciones básicas a elección, como tarjetas personales, tote bag, vasos, entre otras.",
              "2 instancias de modificación.",
              "Entrega final del logo y aplicaciones en archivos editables.",
              "Brandbook completo.",
            ],
            meta: "Tiempo estimado: 30 días.",
            subject: "Cotizar Pack Intermedio",
            body:
              "Hola! Quiero cotizar el pack Intermedio de branding.",
          },
          {
            name: "PRO",
            intro:
              "Pensado para quienes quieren llevar su marca al siguiente nivel, desarrollando un sistema de identidad completo, consistente y aplicable a distintos puntos de contacto.",
            includesLabel: "Incluye:",
            features: [
              ["Reunión inicial de kickoff.", true],
              ["Moodboard para definir la estética general.", false],
              ["Moodboard con 2 opciones conceptuales.", true],
              ["Logo principal con 2 instancias de modificación.", false],
              ["2 opciones de logo.", true],
              ["4 aplicaciones básicas a elección.", false],
              ["8 aplicaciones a elección.", true],
              ["2 instancias de modificación.", true],
              ["Entrega final del logo y aplicaciones en archivos editables.", true],
              ["Brandbook completo.", true],
            ],
            list: [
              "Reunión inicial de kickoff.",
              "Presentación de moodboard con 2 opciones conceptuales para definir la estética general.",
              "Propuesta de 2 opciones de logo.",
              "Desarrollo de 8 aplicaciones a elección, como templates para redes sociales, vasos, cartelería, indumentaria, entre otras.",
              "2 instancias de modificación.",
              "Entrega final del logo y aplicaciones en archivos editables.",
              "Brandbook completo.",
            ],
            meta: "Tiempo estimado: 45 días.",
            subject: "Cotizar Pack PRO",
            body:
              "Hola! Quiero cotizar el pack PRO de branding.",
          },
        ],
      },
      redes: {
        eyebrow: "Redes sociales",
        title: "Packs",
        label: "Packs de redes sociales",
        note:
          "La producción de contenido audiovisual (fotografía y video) no está incluida y se cotiza por separado.",
        items: [
          {
            name: "Básico",
            intro:
              "Pensado para marcas que quieren mantener una presencia digital cuidada y consistente.",
            includesLabel: "Incluye:",
            list: [
              "Auditoría visual y análisis de referencias.",
              "Optimización del perfil (biografía e íconos para historias destacadas).",
              "Diseño de 6 posteos mensuales.",
              "Diseño de hasta 12 historias mensuales.",
            ],
            subject: "Cotizar Pack Básico Redes Sociales",
            body:
              "Hola! Quiero cotizar el pack Básico de redes sociales.",
          },
          {
            name: "Intermedio",
            intro:
              "Ideal para marcas que buscan crecer con una estrategia de contenido más sólida.",
            includesLabel: "Incluye:",
            list: [
              "Auditoría visual y análisis de referencias.",
              "Optimización del perfil (biografía e íconos para historias destacadas).",
              "Diseño de 12 posteos mensuales.",
              "Diseño de hasta 20 historias mensuales.",
              "Planificación y calendarización de contenidos.",
              "Informe básico de rendimiento.",
            ],
            subject: "Cotizar Pack Intermedio Redes Sociales",
            body:
              "Hola! Quiero cotizar el pack Intermedio de redes sociales.",
          },
          {
            name: "PRO",
            intro:
              "Pensado para marcas que buscan delegar la gestión de sus redes, hacer crecer su comunidad y potenciar su presencia digital.",
            includesLabel: "Incluye:",
            list: [
              "Auditoría visual y análisis de referencias.",
              "Optimización del perfil (biografía e íconos para historias destacadas).",
              "Diseño de 12 posteos mensuales.",
              "Diseño de hasta 35 historias mensuales.",
              "Planificación, calendarización y subida de contenidos.",
              "Redacción de copys.",
              "Informe completo de rendimiento.",
            ],
            subject: "Cotizar Pack PRO Redes Sociales",
            body:
              "Hola! Quiero cotizar el pack PRO de redes sociales.",
          },
        ],
      },
    },
  },
  en: {
    htmlLang: "en",
    meta:
      "Creative Studio",
    title: "RÊVE Studio",
    navLabel: "Main navigation",
    brandLabel: "Guada Studio, go to top",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    switchLabel: "Switch language to Spanish",
    switchText: "ES",
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      services: "Services",
      contact: "Contact",
    },
    hero: {
      before: "We shape what your brand dreams of becoming through ",
      branding: "branding",
      middle: ", content for ",
      redes: "social media",
      and: " and ",
      contenido: "websites",
      after: ".",
    },
    actions: {
      portfolio: "View portfolio",
      contact: "Let’s work together",
    },
    heroActionsLabel: "Main actions",
    ticker:
      "WEBSITE DESIGN AND DEVELOPMENT — DESIGN — SOCIAL MEDIA — PHOTOGRAPHY — ART DIRECTION — NAMING — BRANDING —",
    tickerLabel: "Featured services",
    carouselLabel: "Infinite project carousel",
    servicesAccordionLabel: "Services accordion",
    portfolioTitle: "Latest projects",
    projectLabels: [
      "Branding",
      "Branding / Ecommerce",
      "Graphic design / Environmental graphics",
      "Packaging",
      "Paid media content",
      "Online store design",
    ],
    services: [
      {
        tab: "Branding",
        title: "Branding",
        text:
          "With more than 10 brands designed over the past year for clients around the world, including projects developed for studios like Ten10 Design, I worked on branding from end to end, combining aesthetics, judgment, and a solid foundation to support each brand's growth.",
      },
      {
        tab: "Graphic design",
        title: "Graphic design",
        text:
          "From packaging and printed materials to applications for commercial spaces, we create cohesive visual systems that keep your brand consistent across every touchpoint.",
      },
      {
        tab: "Social media",
        title: "Social media",
        text:
          "With experience managing large communities, we create social media content that helps your brand grow, connect, and stay present in the digital landscape.",
      },
      {
        tab: "Photography",
        title: "Photography",
        text:
          "We guide content creation through thoughtful creative direction, ensuring consistency, optimizing production time, and caring for every detail of the final result.",
      },
      {
        tab: "Web development",
        title: "Web design and development",
        text:
          "We design and develop high-impact websites that communicate your brand’s value and turn visits into opportunities.",
      },
    ],
    packsButton: "View packs",
    processLabel: "Creative process",
    processCards: [
      "Managing communities of +150k followers.",
      "+10 brands developed in the past year.",
      "Working for Buenos Aires, Costa Rica, Spain and France.",
      "Experience in retail, gastronomy and hospitality.",
    ],
    contactTitle: "Don't be shy, give REVE a try!",
    contactButton: "Escribinos",
    footerCredit: "By Guadalupe Petriz",
    footerSocialLabel: "Social media",
    instagramLabel: "Guada Studio Instagram",
    closePacks: "Close packs",
    quoteCta: "Quote this pack",
    packages: {
      branding: {
        eyebrow: "Branding",
        title: "Packs",
        label: "Branding packs",
        items: [
          {
            name: "Basic",
            intro:
              "Designed for those who want to launch quickly with a professional, clear, and well-crafted brand.",
            includesLabel: "Includes:",
            features: [
              ["Initial kickoff meeting.", true],
              ["Moodboard to define the overall aesthetic direction.", true],
              ["Moodboard with 2 conceptual options.", false],
              ["Main logo with 2 rounds of revisions.", true],
              ["2 logo proposals.", false],
              ["4 basic brand applications of your choice.", false],
              ["8 brand applications of your choice.", false],
              ["2 rounds of revisions.", true],
              ["Final logo delivery.", true],
              ["Complete brandbook.", true],
            ],
            list: [
              "Initial kickoff meeting.",
              "Moodboard presentation to define the overall aesthetic direction.",
              "Main logo proposal with 2 rounds of revisions.",
              "Final logo delivery.",
              "Complete brandbook.",
            ],
            meta: "Estimated timeline: 20 days.",
            subject: "Quote Basic Pack",
            body:
              "Hi! I would like to quote the Basic branding pack.",
          },
          {
            name: "Intermediate",
            intro:
              "Ideal for those looking to build a brand from a more strategic perspective, with direction, intention, and purpose.",
            includesLabel: "Includes:",
            features: [
              ["Initial kickoff meeting.", true],
              ["Moodboard to define the overall aesthetic direction.", false],
              ["Moodboard with 2 conceptual options.", true],
              ["Main logo with 2 rounds of revisions.", false],
              ["2 logo proposals.", true],
              ["4 basic brand applications of your choice.", true],
              ["8 brand applications of your choice.", false],
              ["2 rounds of revisions.", true],
              ["Final delivery of the logo and applications in editable files.", true],
              ["Complete brandbook.", true],
            ],
            list: [
              "Initial kickoff meeting.",
              "Moodboard presentation with 2 conceptual options to define the overall aesthetic direction.",
              "2 logo proposals.",
              "Development of 4 basic brand applications of your choice, such as business cards, tote bags, cups, and more.",
              "2 rounds of revisions.",
              "Final delivery of the logo and applications in editable files.",
              "Complete brandbook.",
            ],
            meta: "Estimated timeline: 30 days.",
            subject: "Quote Intermediate Pack",
            body:
              "Hi! I would like to quote the Intermediate branding pack.",
          },
          {
            name: "PRO",
            intro:
              "Designed for those who want to take their brand to the next level by developing a complete, consistent identity system that can be applied across different touchpoints.",
            includesLabel: "Includes:",
            features: [
              ["Initial kickoff meeting.", true],
              ["Moodboard to define the overall aesthetic direction.", false],
              ["Moodboard with 2 conceptual options.", true],
              ["Main logo with 2 rounds of revisions.", false],
              ["2 logo proposals.", true],
              ["4 basic brand applications of your choice.", false],
              ["8 brand applications of your choice.", true],
              ["2 rounds of revisions.", true],
              ["Final delivery of the logo and applications in editable files.", true],
              ["Complete brandbook.", true],
            ],
            list: [
              "Initial kickoff meeting.",
              "Moodboard presentation with 2 conceptual options to define the overall aesthetic direction.",
              "2 logo proposals.",
              "Development of 8 brand applications of your choice, such as social media templates, cups, signage, apparel, and more.",
              "2 rounds of revisions.",
              "Final delivery of the logo and applications in editable files.",
              "Complete brandbook.",
            ],
            meta: "Estimated timeline: 45 days.",
            subject: "Quote PRO Pack",
            body:
              "Hi! I would like to quote the PRO branding pack.",
          },
        ],
      },
      redes: {
        eyebrow: "Social media",
        title: "Packs",
        label: "Social media packs",
        note:
          "Audiovisual content production (photo and video) is not included and is quoted separately.",
        items: [
          {
            name: "Basic",
            intro:
              "Designed for brands that want to maintain a polished and consistent digital presence.",
            includesLabel: "Includes:",
            list: [
              "Visual audit and reference analysis.",
              "Profile optimization (bio and highlight story icons).",
              "Design of 6 monthly posts.",
              "Design of up to 12 monthly stories.",
            ],
            subject: "Quote Basic Social Media Pack",
            body:
              "Hi! I would like to quote the Basic social media pack.",
          },
          {
            name: "Intermediate",
            intro:
              "Ideal for brands looking to grow with a stronger content strategy.",
            includesLabel: "Includes:",
            list: [
              "Visual audit and reference analysis.",
              "Profile optimization (bio and highlight story icons).",
              "Design of 12 monthly posts.",
              "Design of up to 20 monthly stories.",
              "Content planning and scheduling.",
              "Basic performance report.",
            ],
            subject: "Quote Intermediate Social Media Pack",
            body:
              "Hi! I would like to quote the Intermediate social media pack.",
          },
          {
            name: "PRO",
            intro:
              "Designed for brands looking to delegate social media management, grow their community, and strengthen their digital presence.",
            includesLabel: "Includes:",
            list: [
              "Visual audit and reference analysis.",
              "Profile optimization (bio and highlight story icons).",
              "Design of 12 monthly posts.",
              "Design of up to 35 monthly stories.",
              "Content planning, scheduling, and publishing.",
              "Copywriting.",
              "Complete performance report.",
            ],
            subject: "Quote PRO Social Media Pack",
            body:
              "Hi! I would like to quote the PRO social media pack.",
          },
        ],
      },
    },
  },
};

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

const updatePageBackground = () => {
  const cardsTop = processCardsSection
    ? processCardsSection.getBoundingClientRect().top
    : window.innerHeight;
  const isDark = cardsTop <= window.innerHeight * 0.45;
  const background = isDark ? "#000000" : "#ffffff";
  const foreground = isDark ? "#ffffff" : "#000000";

  document.documentElement.style.setProperty("--page-bg", background);
  document.documentElement.style.setProperty("--page-fg", foreground);
  updateContactLogo();
  scrollFrame = null;
};

const requestPageBackgroundUpdate = () => {
  if (scrollFrame) return;
  scrollFrame = window.requestAnimationFrame(updatePageBackground);
};

updatePageBackground();
window.addEventListener("scroll", requestPageBackgroundUpdate, { passive: true });
window.addEventListener("resize", requestPageBackgroundUpdate);

const createHeroKeyword = (category, text) => {
  const keyword = document.createElement("span");

  keyword.className = "hero-keyword";
  keyword.dataset.category = category;
  keyword.tabIndex = 0;
  keyword.textContent = text;

  return keyword;
};

const renderHeroTitle = (language) => {
  if (!heroTitle) return;

  const hero = translations[language].hero;

  heroTitle.replaceChildren(
    document.createTextNode(hero.before),
    createHeroKeyword("branding", hero.branding),
    document.createTextNode(hero.middle),
    createHeroKeyword("redes", hero.redes),
    document.createTextNode(hero.and),
    createHeroKeyword("contenido", hero.contenido),
    document.createTextNode(hero.after)
  );

  heroKeywords = document.querySelectorAll(".hero-keyword");
};

const applyHeroTyping = () => {
  if (
    !heroTitle ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let typingIndex = 0;
  const typingDelay = 14;
  const nodes = Array.from(heroTitle.childNodes);
  const fragment = document.createDocumentFragment();

  nodes.forEach((node, nodeIndex) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent.replace(/\s+/g, " ");

      if (nodeIndex === 0) text = text.trimStart();
      if (nodeIndex === nodes.length - 1) text = text.trimEnd();

      text.split("").forEach((letter) => {
        const letterElement = document.createElement("span");

        letterElement.className = "hero-typing-letter";
        letterElement.textContent = letter;
        letterElement.style.animationDelay = `${typingIndex * typingDelay}ms`;
        letterElement.addEventListener(
          "animationend",
          () => {
            letterElement.classList.add("has-typed");
          },
          { once: true }
        );
        fragment.appendChild(letterElement);
        typingIndex += 1;
      });
      return;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const nodeWrapper = document.createElement("span");

      nodeWrapper.className = "hero-typing-node";
      nodeWrapper.style.animationDelay = `${typingIndex * typingDelay}ms`;
      nodeWrapper.addEventListener(
        "animationend",
        () => {
          nodeWrapper.classList.add("has-typed");
        },
        { once: true }
      );
      nodeWrapper.appendChild(node);
      fragment.appendChild(nodeWrapper);
      typingIndex += Math.max(node.textContent.trim().length, 1);
    }
  });

  heroTitle.replaceChildren(fragment);
  heroKeywords = document.querySelectorAll(".hero-keyword");
};

const bindHeroPreviews = () => {
  if (!heroKeywords.length || !heroPreviewGroups.length) return;

  const hero = document.querySelector(".hero");

  const positionPreview = (keyword) => {
    if (!hero) return;

    const heroRect = hero.getBoundingClientRect();
    const keywordRect = keyword.getBoundingClientRect();
    const previewX = keywordRect.left + keywordRect.width / 2 - heroRect.left;
    const previewY = keywordRect.top - heroRect.top;

    hero.style.setProperty("--preview-x", `${previewX}px`);
    hero.style.setProperty("--preview-y", `${previewY}px`);
  };

  const showPreview = (keyword) => {
    const category = keyword.dataset.category;

    positionPreview(keyword);
    if (hero) hero.classList.add("has-keyword-hover");

    heroKeywords.forEach((keyword) => {
      keyword.classList.toggle(
        "is-active",
        keyword.dataset.category === category
      );
    });

    heroPreviewGroups.forEach((group) => {
      group.classList.toggle(
        "is-visible",
        group.dataset.previewCategory === category
      );
    });

    heroTitle.querySelectorAll(".hero-typing-node").forEach((node) => {
      const nodeKeyword = node.querySelector(".hero-keyword");

      node.classList.toggle(
        "is-keyword-active",
        Boolean(nodeKeyword && nodeKeyword.dataset.category === category)
      );
    });
  };

  const hidePreview = () => {
    if (hero) hero.classList.remove("has-keyword-hover");
    heroKeywords.forEach((keyword) => keyword.classList.remove("is-active"));
    heroPreviewGroups.forEach((group) => group.classList.remove("is-visible"));
    heroTitle
      .querySelectorAll(".hero-typing-node")
      .forEach((node) => node.classList.remove("is-keyword-active"));
  };

  heroKeywords.forEach((keyword) => {
    keyword.addEventListener("mouseenter", () => {
      showPreview(keyword);
    });
    keyword.addEventListener("focus", () => {
      showPreview(keyword);
    });
    keyword.addEventListener("mouseleave", hidePreview);
    keyword.addEventListener("blur", hidePreview);
  });
};

const setLanguage = (language) => {
  const copy = translations[language];

  currentLanguage = language;
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.title;
  if (metaDescription) metaDescription.setAttribute("content", copy.meta);
  if (nav) nav.setAttribute("aria-label", copy.navLabel);
  if (brandLink) brandLink.setAttribute("aria-label", copy.brandLabel);
  if (languageToggle) {
    languageToggle.textContent = copy.switchText;
    languageToggle.setAttribute("aria-label", copy.switchLabel);
  }
  if (navToggle) {
    const isOpen = document.body.classList.contains("nav-open");

    navToggle.setAttribute("aria-label", isOpen ? copy.menuClose : copy.menuOpen);
  }

  Object.entries(copy.nav).forEach(([key, value]) => {
    const link = document.querySelector(`[data-nav-link="${key}"]`);

    if (link) link.textContent = value;
  });

  renderHeroTitle(language);
  applyHeroTyping();
  bindHeroPreviews();

  heroActions.forEach((action) => {
    action.textContent = copy.actions[action.dataset.heroAction];
  });

  const heroActionsGroup = document.querySelector(".hero__actions");
  const tickerSection = document.querySelector(".ticker");
  const carousel = document.querySelector(".carousel");
  const servicesAccordion = document.querySelector(".services-accordion");

  if (heroActionsGroup) {
    heroActionsGroup.setAttribute("aria-label", copy.heroActionsLabel);
  }
  if (tickerSection) tickerSection.setAttribute("aria-label", copy.tickerLabel);
  if (carousel) carousel.setAttribute("aria-label", copy.carouselLabel);
  if (servicesAccordion) {
    servicesAccordion.setAttribute("aria-label", copy.servicesAccordionLabel);
  }

  document.querySelectorAll(".ticker__track span").forEach((tickerText) => {
    tickerText.textContent = copy.ticker;
  });

  if (portfolioTitle) portfolioTitle.textContent = copy.portfolioTitle;
  document.querySelectorAll(".project-card__content span").forEach((label, index) => {
    label.textContent = copy.projectLabels[index % copy.projectLabels.length];
  });

  servicePanels.forEach((panel, index) => {
    const service = copy.services[index];
    const tab = panel.querySelector(".service-panel__tab span");
    const title = panel.querySelector(".service-panel__content h3");
    const text = panel.querySelector(".service-panel__content p");
    const cta = panel.querySelector(".service-panel__cta");

    if (!service) return;
    if (tab) tab.textContent = service.tab;
    if (title) title.textContent = service.title;
    if (text) text.textContent = service.text;
    if (cta) cta.textContent = copy.packsButton;
  });

  if (processCardsSection) {
    processCardsSection.setAttribute("aria-label", copy.processLabel);
  }
  processCards.forEach((card, index) => {
    const text = card.querySelector("p");

    if (text) text.textContent = copy.processCards[index];
  });

  const contactTitle = document.querySelector("[data-contact-title]");
  const contactButton = document.querySelector(".contact-gooey-button__label");
  const footerSocial = document.querySelector(".footer ul");
  const instagramLink = document.querySelector(".footer a");
  const footerCredit = document.querySelector("[data-footer-credit]");
  const closeButton = packagesModal
    ? packagesModal.querySelector(".packages-modal__close")
    : null;

  if (contactTitle) contactTitle.textContent = copy.contactTitle;
  if (contactButton) contactButton.textContent = copy.contactButton;
  if (footerCredit) footerCredit.textContent = copy.footerCredit;
  if (footerSocial) footerSocial.setAttribute("aria-label", copy.footerSocialLabel);
  if (instagramLink) instagramLink.setAttribute("aria-label", copy.instagramLabel);
  if (closeButton) closeButton.setAttribute("aria-label", copy.closePacks);

  if (packagesModal && !packagesModal.hidden) {
    renderPackages(activePackageKey);
  }
};

// Carrusel de portfolio con movimiento automatico y arrastre con cursor.
if (portfolioCarousel && portfolioTrack) {
  let carouselOffset = 0;
  let carouselLoopWidth = 0;
  let isCarouselDragging = false;
  let isCarouselPaused = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  const carouselSpeed = 0.42;

  const measureCarousel = () => {
    const trackStyles = window.getComputedStyle(portfolioTrack);
    const trackGap = parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    carouselLoopWidth = portfolioTrack.scrollWidth / 2 + trackGap / 2;
  };

  const normalizeCarouselOffset = (offset) => {
    if (!carouselLoopWidth) return offset;

    while (offset <= -carouselLoopWidth) {
      offset += carouselLoopWidth;
    }

    while (offset > 0) {
      offset -= carouselLoopWidth;
    }

    return offset;
  };

  const renderCarousel = () => {
    carouselOffset = normalizeCarouselOffset(carouselOffset);
    portfolioTrack.style.transform = `translateX(${carouselOffset}px)`;
  };

  const animateCarousel = () => {
    if (!isCarouselDragging && !isCarouselPaused) {
      carouselOffset -= carouselSpeed;
      renderCarousel();
    }

    window.requestAnimationFrame(animateCarousel);
  };

  const startCarouselDrag = (event) => {
    isCarouselDragging = true;
    dragStartX = event.clientX;
    dragStartOffset = carouselOffset;
    portfolioCarousel.classList.add("is-dragging");
    portfolioCarousel.setPointerCapture(event.pointerId);
  };

  const moveCarouselDrag = (event) => {
    if (!isCarouselDragging) return;

    carouselOffset = dragStartOffset + event.clientX - dragStartX;
    renderCarousel();
  };

  const endCarouselDrag = (event) => {
    if (!isCarouselDragging) return;

    isCarouselDragging = false;
    portfolioCarousel.classList.remove("is-dragging");

    if (portfolioCarousel.hasPointerCapture(event.pointerId)) {
      portfolioCarousel.releasePointerCapture(event.pointerId);
    }
  };

  measureCarousel();
  renderCarousel();
  window.requestAnimationFrame(animateCarousel);

  portfolioCarousel.addEventListener("pointerdown", startCarouselDrag);
  portfolioCarousel.addEventListener("pointermove", moveCarouselDrag);
  portfolioCarousel.addEventListener("pointerup", endCarouselDrag);
  portfolioCarousel.addEventListener("pointercancel", endCarouselDrag);
  portfolioCarousel.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      isCarouselPaused = true;
    });
    card.addEventListener("mouseleave", () => {
      isCarouselPaused = false;
    });
    card.addEventListener("focusin", () => {
      isCarouselPaused = true;
    });
    card.addEventListener("focusout", () => {
      isCarouselPaused = false;
    });
  });
  window.addEventListener("resize", () => {
    measureCarousel();
    renderCarousel();
  });
}

// Mantiene el año del footer actualizado automáticamente.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Controla el menú responsive sin depender de librerías externas.
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    const copy = translations[currentLanguage];

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? copy.menuClose : copy.menuOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", translations[currentLanguage].menuOpen);
    });
  });
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "es" ? "en" : "es");

    if (navToggle) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", translations[currentLanguage].menuOpen);
    }
  });
}

// Acordeón horizontal de servicios.
if (servicePanels.length) {
  servicePanels.forEach((panel) => {
    const tab = panel.querySelector(".service-panel__tab");

    tab.addEventListener("click", () => {
      servicePanels.forEach((item) => {
        const isActive = item === panel;

        item.classList.toggle("is-active", isActive);
        item
          .querySelector(".service-panel__tab")
          .setAttribute("aria-expanded", String(isActive));
      });
    });
  });
}

// Collage sutil de imagenes al pasar por cada servicio.
if (servicePanels.length && serviceHoverPreview && serviceHoverImages.length) {
  const canUseServicePreview = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (min-width: 901px)"
  ).matches;
  const moveServicePreview = (event) => {
    document.documentElement.style.setProperty(
      "--service-preview-x",
      `${event.clientX}px`
    );
    document.documentElement.style.setProperty(
      "--service-preview-y",
      `${event.clientY}px`
    );
  };

  const showServicePreview = (panel, event) => {
    if (!canUseServicePreview) return;

    const imagePaths = panel.dataset.serviceImages
      ? panel.dataset.serviceImages.split(",")
      : [];

    if (!imagePaths.length) {
      hideServicePreview();
      return;
    }

    serviceHoverImages.forEach((image, index) => {
      image.src = imagePaths[index] || "";
    });

    moveServicePreview(event);
    serviceHoverPreview.classList.remove("is-visible");
    void serviceHoverPreview.offsetWidth;
    serviceHoverPreview.classList.add("is-visible");
  };

  const hideServicePreview = () => {
    serviceHoverPreview.classList.remove("is-visible");
  };

  if (canUseServicePreview) {
    servicePanels.forEach((panel) => {
      panel.addEventListener("mouseenter", (event) => {
        showServicePreview(panel, event);
      });

      panel.addEventListener("mousemove", moveServicePreview);
      panel.addEventListener("mouseleave", hideServicePreview);
    });
  }
}

// Popup de packs de servicios.
if (packagesModal && openPackagesButtons.length) {
  const createPackageCard = (pack) => {
    const article = document.createElement("article");
    const title = document.createElement("h4");
    const meta = document.createElement("p");
    const cta = document.createElement("a");

    article.className = "branding-package";
    title.textContent = pack.name;
    article.appendChild(title);

    if (pack.intro) {
      const intro = document.createElement("p");

      intro.textContent = pack.intro;
      article.appendChild(intro);
    }

    if (pack.includesLabel) {
      const includesLabel = document.createElement("strong");

      includesLabel.className = "branding-package__includes-label";
      includesLabel.textContent = pack.includesLabel;
      article.appendChild(includesLabel);
    }

    const list = document.createElement("ul");

    (pack.list || pack.items).forEach((item) => {
      const listItem = document.createElement("li");

      listItem.textContent = item;
      list.appendChild(listItem);
    });
    article.appendChild(list);

    if (pack.meta) {
      meta.className = "branding-package__meta";
      meta.textContent = pack.meta;
      article.appendChild(meta);
    }

    cta.className = "branding-package__cta";
    cta.href = `mailto:guadi.petriz@gmail.com?subject=${encodeURIComponent(
      pack.subject
    )}&body=${encodeURIComponent(pack.body)}`;
    cta.textContent = translations[currentLanguage].quoteCta;
    article.appendChild(cta);

    return article;
  };

  renderPackages = (packageKey) => {
    activePackageKey = packageKey;
    const languagePackages = translations[currentLanguage].packages;
    const content = languagePackages[packageKey] || languagePackages.branding;

    if (packagesEyebrow) packagesEyebrow.textContent = content.eyebrow;
    if (packagesTitle) packagesTitle.textContent = content.title;
    if (packagesList) {
      packagesList.setAttribute("aria-label", content.label);
      packagesList.replaceChildren(
        ...content.items.map((pack) => createPackageCard(pack))
      );
    }

    const currentNote = packagesModal.querySelector(".packages-modal__note");
    currentNote?.remove();

    if (content.note && packagesList) {
      const note = document.createElement("p");

      note.className = "packages-modal__note";
      note.textContent = content.note;
      packagesList.insertAdjacentElement("afterend", note);
    }
  };

  const openPackagesModal = (packageKey = "branding") => {
    renderPackages(packageKey);
    packagesModal.hidden = false;
    document.body.classList.add("modal-open");
    packagesModal.querySelector(".packages-modal__close").focus();
  };

  const closePackagesModal = () => {
    packagesModal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  openPackagesButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openPackagesModal(button.dataset.openPackages);
    });
  });

  closePackagesButtons.forEach((button) => {
    button.addEventListener("click", closePackagesModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !packagesModal.hidden) {
      closePackagesModal();
    }
  });
}

setLanguage("es");

if (cursorDot) {
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let dotX = cursorX;
  let dotY = cursorY;

  const renderCursorDot = () => {
    dotX += (cursorX - dotX) * 0.28;
    dotY += (cursorY - dotY) * 0.28;
    cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

    window.requestAnimationFrame(renderCursorDot);
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      cursorDot.classList.add("is-visible");
    },
    { passive: true }
  );

  window.addEventListener("pointerleave", () => {
    cursorDot.classList.remove("is-visible");
  });

  window.requestAnimationFrame(renderCursorDot);
}

// Animacion breve al tocar las cards del bloque negro.
if (processCards.length) {
  processCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.remove("is-tapped");
      void card.offsetWidth;
      card.classList.add("is-tapped");

      window.setTimeout(() => {
        card.classList.remove("is-tapped");
      }, 420);
    });
  });
}
