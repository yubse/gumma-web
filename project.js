// Add more image paths to a project's `images` array whenever new detail
// images are placed in its folder. Mixed portrait, landscape and square sizes
// are supported; the gallery preserves each image's original aspect ratio.
const projects = {
  gumma: {
    title: "Gumma",
    images: [
      "assets/gumma-slides/1.jpg?v=20260821-1",
      "assets/gumma-slides/2.jpg?v=20260821-1",
      "assets/gumma-slides/3.jpg?v=20260821-1",
      "assets/gumma-slides/4.jpg?v=20260821-1",
    ],
    next: "plant",
  },
  plant: {
    title: "Plant",
    images: [
      "assets/plant-slides/1.jpg?v=20260821-1",
      "assets/plant-slides/2.jpg?v=20260821-1",
    ],
    next: "gumma",
  },
};

const searchParams = new URLSearchParams(window.location.search);
const projectKey = searchParams.get("project") || "gumma";
const project = projects[projectKey] || projects.gumma;
const gallery = document.querySelector("[data-project-gallery]");
const template = document.querySelector("#gallery-item-template");
const nextProject = document.querySelector("[data-next-project]");

document.title = `${project.title} — Gumma`;
nextProject.href = `project.html?project=${project.next}`;

project.images.forEach((imagePath, index) => {
  const item = template.content.cloneNode(true);
  const image = item.querySelector("img");
  image.src = imagePath;
  image.alt = `${project.title} 作品详情 ${index + 1}`;
  gallery.append(item);
});
