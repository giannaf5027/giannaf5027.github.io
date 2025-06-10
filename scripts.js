// light and dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  function initializeToggle() {
    const toggleSwitch = document.getElementById("modeToggle");
    const cordString = document.querySelector('.cord-string');
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
      // Cord pull animation
      if (cordString) {
        cordString.classList.remove('pulling');
        // Force reflow for restart animation
        void cordString.offsetWidth;
        cordString.classList.add('pulling');
      }

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

  // Load header and footer HTML
  loadHTML("header", "header.html").then(() => {
    initializeToggle();
    initializeWaffleMenu();
  });
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

// Typing effect for homepage
document.addEventListener("DOMContentLoaded", () => {
  // Typing effect
  const typingPhrases = [
    "Hello! My name is Gianna Fernandez. I am studying Computer Engineering.",
    "¡Hola! Me llamo Gianna Fernández. Estoy estudiando ingeniería informática.",
    "¡Γειά σας! Mε λένε Γίαννα Φερνανδεζ. Σπουδάζω μηχανικός ιπολογιστών."
  ];
  const typingText = document.getElementById("typing-text");
  let phraseIndex = 0;
  let charIndex = 0;
  let typing = true;

  if (typingText) {
    // Remove all children
    typingText.innerHTML = "";
    // Create a text node and cursor
    const textNode = document.createTextNode("");
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    cursorSpan.textContent = "|";
    typingText.appendChild(textNode);
    typingText.appendChild(cursorSpan);

    function type() {
      if (!typingText) return;
      if (typing) {
        if (charIndex < typingPhrases[phraseIndex].length) {
          textNode.textContent += typingPhrases[phraseIndex][charIndex];
          charIndex++;
          setTimeout(type, 80);
        } else {
          typing = false;
          setTimeout(type, 1200);
        }
      } else {
        if (charIndex > 0) {
          textNode.textContent = typingPhrases[phraseIndex].slice(0, charIndex - 1);
          charIndex--;
          setTimeout(type, 40);
        } else {
          typing = true;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
          setTimeout(type, 400);
        }
      }
    }

    type();
    // Blinking cursor
    setInterval(() => {
      cursorSpan.style.opacity = cursorSpan.style.opacity === "0" ? "1" : "0";
    }, 500);
  }
});

// Waffle popup menu
function initializeWaffleMenu() {
  const waffleBtn = document.getElementById("waffleMenuBtn");
  const wafflePopup = document.getElementById("wafflePopup");
  const closeWaffle = document.getElementById("closeWaffle");

  if (waffleBtn && wafflePopup && closeWaffle) {
    waffleBtn.addEventListener("click", () => {
      wafflePopup.classList.add("active");
      waffleBtn.style.display = "none"; // Hide the waffle button
    });
    closeWaffle.addEventListener("click", () => {
      wafflePopup.classList.remove("active");
      waffleBtn.style.display = "flex"; // Show the waffle button again
    });
    // Optional: close popup when clicking outside nav
    wafflePopup.addEventListener("click", (e) => {
      if (e.target === wafflePopup) {
        wafflePopup.classList.remove("active");
        waffleBtn.style.display = "flex"; // Show the waffle button again
      }
    });
  }
}

function handleResponsiveNavbar() {
  const waffleBtn = document.getElementById("waffleMenuBtn");
  const navbar = document.querySelector(".navbar");
  const wafflePopup = document.getElementById("wafflePopup");

  if (!waffleBtn || !navbar) return;

  if (window.innerWidth <= 800) {
    waffleBtn.style.display = "flex";
    navbar.style.display = "none";
    // Hide popup if resizing to desktop
    if (wafflePopup) wafflePopup.classList.remove("active");
  } else {
    waffleBtn.style.display = "none";
    navbar.style.display = "flex";
    // Hide popup if resizing to desktop
    if (wafflePopup) wafflePopup.classList.remove("active");
  }
}

// Run on load and resize
window.addEventListener("resize", handleResponsiveNavbar);
document.addEventListener("DOMContentLoaded", handleResponsiveNavbar);
