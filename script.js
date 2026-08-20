const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-dot]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const intervalDuration = 6000;

  let currentIndex = 0;
  let timer = null;
  let pointerStartX = null;
  let suppressNextClick = false;

  function showSlide(index, { restart = true } = {}) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.querySelector("a").tabIndex = isActive ? 0 : -1;
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    if (restart) startTimer();
  }

  function startTimer() {
    window.clearInterval(timer);

    if (reduceMotion.matches || document.hidden) return;

    timer = window.setInterval(() => {
      showSlide(currentIndex + 1, { restart: false });
    }, intervalDuration);
  }

  function stopTimer() {
    window.clearInterval(timer);
    timer = null;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.carouselDot));
    });
  });

  carousel.addEventListener("mouseenter", stopTimer);
  carousel.addEventListener("mouseleave", startTimer);
  carousel.addEventListener("focusin", stopTimer);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startTimer();
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    pointerStartX = event.clientX;
  });

  carousel.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;

    const distance = event.clientX - pointerStartX;
    pointerStartX = null;

    if (Math.abs(distance) < 45) return;
    suppressNextClick = true;
    showSlide(currentIndex + (distance < 0 ? 1 : -1));
    window.setTimeout(() => {
      suppressNextClick = false;
    }, 0);
  });

  carousel.addEventListener("click", (event) => {
    if (!suppressNextClick || !event.target.closest(".slide-link")) return;
    event.preventDefault();
    suppressNextClick = false;
  });

  carousel.addEventListener("pointercancel", () => {
    pointerStartX = null;
  });

  document.addEventListener("visibilitychange", startTimer);
  reduceMotion.addEventListener("change", startTimer);
  startTimer();
}
