const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const hero = document.querySelector(".hero");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;

  const updateParallax = () => {
    const progress = Math.min(window.scrollY, hero.offsetHeight);
    hero.style.setProperty("--hero-shift", `${progress * 0.16}px`);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();

  const cards = document.querySelectorAll(".card");
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
          window.setTimeout(() => {
            entry.target.classList.remove("reveal-card", "is-visible");
          }, 1000);
        }
      });
    },
    { threshold: 0.18 }
  );

  cards.forEach((card) => {
    card.classList.add("reveal-card");
    cardObserver.observe(card);
  });

  const revealElements = document.querySelectorAll(
    ".section-head:not(.services-head), .brand-marquee, .about-media, .contact-cta, .contact-actions, .contact-footer-bottom"
  );
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${(index % 3) * 70}ms`);
    revealObserver.observe(element);
  });

  document.querySelectorAll(".about-lead .eyebrow, .about-intro, .founder").forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${index * 140}ms`);
    revealObserver.observe(element);
  });

  if (window.matchMedia("(min-width: 861px)").matches) {
    const servicesHead = document.querySelector(".services-head");
    if (servicesHead) {
      servicesHead.classList.add("reveal-services");
      const servicesObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.32, rootMargin: "0px 0px -12% 0px" }
      );
      servicesObserver.observe(servicesHead);
    }
  }
}

const syncNavToggle = () => {
  const pastHero = window.scrollY > Math.max(hero.offsetHeight - 56, 0);
  toggle.classList.toggle("is-past-hero", pastHero);
};

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
});

document.addEventListener("scroll", syncNavToggle, { passive: true });
window.addEventListener("resize", syncNavToggle);
syncNavToggle();

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Abrir menú";
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-timeline]").forEach((root) => {
  if (root.closest(".is-folded")) {
    return;
  }

  const methodDots = [...root.querySelectorAll("[data-method-step]")];
  const methodPanels = [...root.querySelectorAll("[data-method-panel]")];
  const methodCurrent = root.querySelector(".current-step");
  const methodStepLabel = root.querySelector(".method-step-label");
  const methodProgress = root.querySelector(".method-progress span");
  const methodPrev = root.querySelector(".method-prev");
  const methodNext = root.querySelector(".method-next");
  const methodPanelsWrap = root.querySelector(".methodology-panels");
  const methodSection = root.closest("section");
  let activeMethod = 0;
  let methodTimer;
  let methodInView = false;
  let syncingPanelScroll = false;
  const isArcMobile = () =>
    Boolean(root.closest(".section-arc")) && window.matchMedia("(max-width: 860px)").matches;

  const scrollArcPanel = (index) => {
    if (!isArcMobile()) {
      return;
    }
    const width = methodPanelsWrap.clientWidth;
    if (!width) {
      return;
    }
    syncingPanelScroll = true;
    methodPanelsWrap.scrollTo({
      left: width * index,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      syncingPanelScroll = false;
    }, 480);
  };

  const fillMethodProgress = () => {
    methodProgress.style.transition = "none";
    methodProgress.style.width = "0%";
    if (reduceMotion) {
      methodProgress.style.width = "100%";
      return;
    }
    void methodProgress.offsetWidth;
    methodProgress.style.transition = "width 10s linear";
    methodProgress.style.width = "100%";
  };

  const scheduleMethodAdvance = () => {
    window.clearTimeout(methodTimer);
    if (!methodInView) {
      return;
    }
    methodTimer = window.setTimeout(() => {
      showMethod(activeMethod + 1);
    }, 10000);
  };

  const showMethod = (index, restart, fromScroll) => {
    activeMethod = (index + methodDots.length) % methodDots.length;

    const apply = () => {
      methodDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeMethod;
        dot.classList.toggle("is-active", isActive);
        dot.classList.toggle("is-complete", dotIndex < activeMethod);
        dot.setAttribute("aria-selected", String(isActive));
      });

      methodPanels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === activeMethod;
        panel.classList.toggle("is-active", isActive);
        panel.setAttribute("aria-hidden", String(!isActive));
      });

      methodCurrent.textContent = String(activeMethod + 1).padStart(2, "0");
      methodStepLabel.textContent = String(activeMethod + 1);
      methodPanelsWrap.style.setProperty("--method-index", String(activeMethod));
      if (!fromScroll) {
        scrollArcPanel(activeMethod);
      }
      fillMethodProgress();
      scheduleMethodAdvance();
    };

    if (restart) {
      methodDots.forEach((dot) => dot.classList.remove("is-active", "is-complete"));
      methodPanels.forEach((panel) => panel.classList.remove("is-active"));
      window.requestAnimationFrame(apply);
      return;
    }

    apply();
  };

  methodDots.forEach((dot, index) => {
    dot.addEventListener("click", () => showMethod(index));
  });

  methodPrev.addEventListener("click", () => showMethod(activeMethod - 1));
  methodNext.addEventListener("click", () => showMethod(activeMethod + 1));

  let panelScrollTick = false;
  methodPanelsWrap.addEventListener(
    "scroll",
    () => {
      if (!isArcMobile() || syncingPanelScroll || panelScrollTick) {
        return;
      }
      panelScrollTick = true;
      window.requestAnimationFrame(() => {
        panelScrollTick = false;
        const width = methodPanelsWrap.clientWidth;
        if (!width) {
          return;
        }
        const index = Math.round(methodPanelsWrap.scrollLeft / width);
        if (index !== activeMethod) {
          showMethod(index, false, true);
        }
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (!isArcMobile()) {
      return;
    }
    methodPanelsWrap.scrollLeft = methodPanelsWrap.clientWidth * activeMethod;
  });

  let swipeX = 0;
  let swipeY = 0;
  let swipeScroll = 0;
  let swipeLock = "";
  let swipeActive = false;
  const swipeRoot = methodSection || root;

  swipeRoot.addEventListener(
    "touchstart",
    (event) => {
      if (!isArcMobile() || event.touches.length !== 1) {
        return;
      }
      if (methodPanelsWrap.contains(event.target)) {
        swipeActive = false;
        return;
      }
      const touch = event.touches[0];
      swipeX = touch.clientX;
      swipeY = touch.clientY;
      swipeScroll = methodPanelsWrap.scrollLeft;
      swipeLock = "";
      swipeActive = true;
    },
    { passive: true }
  );

  swipeRoot.addEventListener(
    "touchmove",
    (event) => {
      if (!swipeActive || !isArcMobile()) {
        return;
      }
      const touch = event.touches[0];
      const dx = touch.clientX - swipeX;
      const dy = touch.clientY - swipeY;
      if (!swipeLock) {
        if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
          return;
        }
        swipeLock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (swipeLock !== "x") {
        return;
      }
      event.preventDefault();
      const width = methodPanelsWrap.clientWidth;
      const max = Math.max(0, methodPanelsWrap.scrollWidth - width);
      methodPanelsWrap.scrollLeft = Math.max(0, Math.min(max, swipeScroll - dx));
    },
    { passive: false }
  );

  const endArcSwipe = () => {
    const shouldSnap = swipeActive && swipeLock === "x";
    swipeActive = false;
    swipeLock = "";
    if (!shouldSnap || !isArcMobile()) {
      return;
    }
    const width = methodPanelsWrap.clientWidth;
    if (!width) {
      return;
    }
    showMethod(Math.round(methodPanelsWrap.scrollLeft / width));
  };

  swipeRoot.addEventListener("touchend", endArcSwipe);
  swipeRoot.addEventListener("touchcancel", endArcSwipe);

  const methodView = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!methodInView) {
            methodInView = true;
            methodSection.classList.add("is-inview");
            showMethod(0, true);
          }
        } else if (methodInView) {
          methodInView = false;
          window.clearTimeout(methodTimer);
          methodProgress.style.transition = "none";
          methodSection.classList.remove("is-inview");
        }
      });
    },
    { threshold: 0.45 }
  );

  methodView.observe(root);
});

const floatPill = document.querySelector(".float-pill");
const contactFooter = document.querySelector(".contact-footer");
const mobileLayout = window.matchMedia("(max-width: 860px)");

const parkFloatPill = () => {
  if (mobileLayout.matches) {
    floatPill.style.bottom = "";
    return;
  }
  const gap = 20;
  const footerTop = contactFooter.getBoundingClientRect().top;
  if (footerTop < window.innerHeight - gap) {
    floatPill.style.bottom = `${window.innerHeight - footerTop + gap}px`;
  } else {
    floatPill.style.bottom = "";
  }
};

document.addEventListener("scroll", parkFloatPill, { passive: true, capture: true });
window.addEventListener("resize", parkFloatPill);
mobileLayout.addEventListener("change", parkFloatPill);
parkFloatPill();

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!mobileLayout.matches || event.target.closest(".card-arrow")) {
      return;
    }
    card.classList.toggle("is-marked");
  });
});

document.querySelectorAll(".founder-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (!mobileLayout.matches) {
      return;
    }
    const founder = link.closest(".founder");
    document.querySelectorAll(".founder").forEach((item) => {
      item.classList.toggle("is-named", item === founder);
    });
  });
});

const challengeHead = document.querySelector(".challenges-head");
const challengePin = document.querySelector(".challenges-pin");
const lastChallenge = document.querySelector(".challenge-card:nth-child(4)");
if (challengeHead && lastChallenge) {
  const syncChallengeStack = () => {
    if (mobileLayout.matches) {
      challengeHead.classList.remove("is-covered");
      if (challengePin) {
        const headTop = parseFloat(getComputedStyle(challengeHead).top) || 0;
        const headHeight = challengeHead.getBoundingClientRect().height;
        challengePin.style.setProperty("--stack-start", `${Math.ceil(headTop + headHeight + 12)}px`);
      }
      return;
    }
    if (challengePin) {
      challengePin.style.removeProperty("--stack-start");
    }
    const lastTop = lastChallenge.getBoundingClientRect().top;
    const headBottom = challengeHead.getBoundingClientRect().bottom;
    challengeHead.classList.toggle("is-covered", lastTop < headBottom - 12);
  };
  document.addEventListener("scroll", syncChallengeStack, { passive: true });
  window.addEventListener("resize", syncChallengeStack);
  mobileLayout.addEventListener("change", syncChallengeStack);
  syncChallengeStack();
}
