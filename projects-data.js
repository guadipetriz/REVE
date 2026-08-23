const hoverPaths = (slug, count) =>
  Array.from(
    { length: count },
    (_, index) =>
      `assets/projects-hover/${slug}/${String(index + 1).padStart(2, "0")}.jpg`
  );

window.PROJECTS_DATA = [
  {
    id: "olen-aroa",
    name: "Olen Aroa",
    cover: "assets/services/branding/branding-07.jpg",
    alt: {
      es: "Identidad visual de Olen Aroa",
      en: "Visual identity for Olen Aroa",
    },
    service: {
      es: "Branding / Packaging",
      en: "Branding / Packaging",
    },
    categories: ["branding", "packaging"],
    hoverImages: hoverPaths("olen-aroa", 6),
    carouselLink: "proyectos.html",
  },
  {
    id: "dos-orillas",
    name: "Dos Orillas",
    cover: "assets/portfolio-jpg/dos-orillas.jpg",
    alt: {
      es: "Identidad visual de Dos Orillas",
      en: "Visual identity for Dos Orillas",
    },
    service: {
      es: "Branding",
      en: "Branding",
    },
    categories: ["branding"],
    hoverImages: hoverPaths("dos-orillas", 4),
  },
  {
    id: "garage-bar",
    name: "Garage Bar",
    cover: "assets/portfolio-jpg/garage-02.jpg",
    alt: {
      es: "Identidad visual de Garage Bar",
      en: "Visual identity for Garage Bar",
    },
    service: {
      es: "Branding",
      en: "Branding",
    },
    categories: ["branding"],
    hoverImages: hoverPaths("garage-bar", 10),
  },
  {
    id: "valentina",
    name: "Valentina",
    cover: "assets/portfolio-jpg/valentina.jpg",
    alt: {
      es: "Identidad visual y ecommerce de Valentina",
      en: "Visual identity and ecommerce for Valentina",
    },
    service: {
      es: "Branding / Ecommerce",
      en: "Branding / Ecommerce",
    },
    categories: ["branding"],
    hoverImages: hoverPaths("valentina", 4),
  },
  {
    id: "checkpoint-charlie",
    name: "Checkpoint Charlie",
    cover: "assets/portfolio-jpg/checkpoint-charlie.jpg",
    alt: {
      es: "Diseño gráfico y arquigrafía para Checkpoint Charlie",
      en: "Graphic design and environmental graphics for Checkpoint Charlie",
    },
    service: {
      es: "Diseño gráfico / Arquigrafía",
      en: "Graphic design / Environmental graphics",
    },
    categories: ["otros"],
    hoverImages: hoverPaths("checkpoint-charlie", 4),
  },
  {
    id: "dulces-serra",
    name: "Dulces Serra",
    cover: "assets/portfolio-jpg/dulces-serra.jpg",
    alt: {
      es: "Diseño de packaging para Dulces Serra",
      en: "Packaging design for Dulces Serra",
    },
    service: {
      es: "Packaging",
      en: "Packaging",
    },
    categories: ["packaging"],
    hoverImages: hoverPaths("dulces-serra", 4),
  },
  {
    id: "muvon",
    name: "Muvon",
    cover: "assets/portfolio-jpg/muvon.jpg",
    alt: {
      es: "Contenido para paid media de Muvon",
      en: "Paid media content for Muvon",
    },
    service: {
      es: "Contenido para Paid Media",
      en: "Paid media content",
    },
    categories: ["otros"],
    hoverImages: hoverPaths("muvon", 4),
  },
  {
    id: "wabro",
    name: "Wabro",
    cover: "assets/portfolio-jpg/wabro.jpg",
    alt: {
      es: "Diseño de tienda online para Wabro",
      en: "Online store design for Wabro",
    },
    service: {
      es: "Diseño de tienda online",
      en: "Online store design",
    },
    categories: ["web"],
    hoverImages: hoverPaths("wabro", 4),
  },
];
