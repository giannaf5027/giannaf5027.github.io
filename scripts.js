// videos on photos page

//n

document.addEventListener("DOMContentLoaded", () => {
  function initializeToggle() {
    const toggleSwitch = document.getElementById("modeToggle");
    if (!toggleSwitch) {
      console.error("Toggle switch not found.");
      return;
    }

    const currentMode = localStorage.getItem("theme");
    if (currentMode) {
      document.body.classList.add(currentMode);
      toggleSwitch.checked = currentMode === "dark-mode";
    }

    toggleSwitch.addEventListener("change", () => {
      if (toggleSwitch.checked) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark-mode");
      } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
      }
    });
  }

  loadHTML("header", "header.html").then(initializeToggle);
  loadHTML("footer", "footer.html");
});

function loadHTML(element, file) {
  return fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(element).innerHTML = data;
    })
    .catch((error) => console.error("Error loading HTML:", error));
}

// study abroad page
let currentIndex = 0;
const carousel = document.querySelector(".carousel");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
const itemWidth = items[0]?.clientWidth + 20;

items.forEach((item) => {
  const clone = item.cloneNode(true);
  carousel.appendChild(clone);
});

const totalClones = carousel?.children.length ?? 0;

if (carousel){
  carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function moveCarousel(direction) {
  currentIndex += direction;

  if (currentIndex >= totalItems) {
    currentIndex = 0;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(0px)`;
    setTimeout(() => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      moveCarousel(direction);
    }, 0);
  } else if (currentIndex < 0) {
    currentIndex = totalItems - 1;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    setTimeout(() => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      moveCarousel(direction);
    }, 0);
  } else {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
}

// used for both study abroad and photos page

function showDescription(title, description) {
  document.getElementById("image-title").textContent = title;
  document.getElementById("image-description").textContent = description;
}

// photos page
function filterPhotos(category) {
  var items = document.querySelectorAll(".photos-gallery-item");

  items.forEach(function (item) {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// mute functionality
const allvideos = Array.from(document.querySelectorAll(".hover-video"));
console.log(allvideos);
allvideos.forEach((vid) => {
  vid.addEventListener("mouseover", (event) => {
    allvideos
      .filter((v) => v != vid)
      .forEach((v) => {
        const video = v.querySelector("video");
        video.muted = true;
      });
    const video = vid.querySelector("video");
    video.muted = false;
  });
});
