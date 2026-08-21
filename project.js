// Add more image paths to a project's `images` array whenever new detail
// images are placed in its folder. Mixed portrait, landscape and square sizes
// are supported; the gallery preserves each image's original aspect ratio.
const projects = {
  gumma: {
    title: "Gumma",
    images: [
      {
        webp: "assets/gumma-slides/1.webp?v=20260821-7",
        fallback: "assets/gumma-slides/1.jpg?v=20260821-7",
        width: 2000,
        height: 1499,
      },
      {
        webp: "assets/gumma-slides/2.webp?v=20260821-7",
        fallback: "assets/gumma-slides/2.jpg?v=20260821-7",
        width: 2000,
        height: 1501,
      },
      {
        webp: "assets/gumma-slides/3.webp?v=20260821-7",
        fallback: "assets/gumma-slides/3.jpg?v=20260821-7",
        width: 1500,
        height: 2000,
      },
      {
        webp: "assets/gumma-slides/4.webp?v=20260821-7",
        fallback: "assets/gumma-slides/4.jpg?v=20260821-7",
        width: 1500,
        height: 2000,
      },
    ],
  },
};

const searchParams = new URLSearchParams(window.location.search);
const projectKey = searchParams.get("project") || "gumma";
const project = projects[projectKey] || projects.gumma;
const gallery = document.querySelector("[data-project-gallery]");
const template = document.querySelector("#gallery-item-template");

document.title = `${project.title} — Gumma`;

function loadGalleryImage(figure) {
  if (figure.dataset.loaded === "true") return;

  const source = figure.querySelector("source");
  const image = figure.querySelector("img");
  source.srcset = source.dataset.srcset;
  image.src = image.dataset.src;
  figure.dataset.loaded = "true";
}

const deferredFigures = [];

project.images.forEach((imageData, index) => {
  const item = template.content.cloneNode(true);
  const figure = item.querySelector("figure");
  const source = item.querySelector("source");
  const image = item.querySelector("img");
  figure.style.aspectRatio = `${imageData.width} / ${imageData.height}`;
  source.dataset.srcset = imageData.webp;
  image.dataset.src = imageData.fallback;
  image.alt = `${project.title} project detail ${index + 1}`;
  image.width = imageData.width;
  image.height = imageData.height;

  if (index === 0) {
    image.loading = "eager";
    image.fetchPriority = "high";
    loadGalleryImage(figure);
  } else {
    deferredFigures.push(figure);
  }

  gallery.append(item);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadGalleryImage(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "100px 0px" },
  );

  deferredFigures.forEach((figure) => observer.observe(figure));
} else {
  deferredFigures.forEach(loadGalleryImage);
}
