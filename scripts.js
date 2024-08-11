document.addEventListener('DOMContentLoaded', () => {
    function initializeToggle() {
        const toggleSwitch = document.getElementById('modeToggle');
        if (!toggleSwitch) {
            console.error("Toggle switch not found.");
            return;
        }

        const currentMode = localStorage.getItem('theme');
        if (currentMode) {
            document.body.classList.add(currentMode);
            toggleSwitch.checked = currentMode === 'dark-mode';
        }

        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    loadHTML('header', 'header.html').then(initializeToggle);
    loadHTML('footer', 'footer.html');
});

function loadHTML(element, file) {
    return fetch(file)
        .then(response => response.text())
        .then(data => {
            document.querySelector(element).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const itemWidth = items[0].clientWidth + 20; // Assuming 20px gap between items

// Clone all items and append them at the end of the carousel
items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
});

// Update totalItems after cloning
const totalClones = carousel.children.length;

// Set the initial position of the carousel
carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

// Function to move the carousel
function moveCarousel(direction) {
    currentIndex += direction;

    // Check if we have reached the end of the cloned items and reset the position
    if (currentIndex >= totalItems) {
        currentIndex = 0;
        carousel.style.transition = 'none'; // Disable transition for the jump
        carousel.style.transform = `translateX(0px)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            moveCarousel(direction);
        }, 0); // Move to the next slide after resetting
    } else if (currentIndex < 0) {
        currentIndex = totalItems - 1;
        carousel.style.transition = 'none'; // Disable transition for the jump
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
            moveCarousel(direction);
        }, 0); // Move to the previous slide after resetting
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out'; // Regular transition
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

function showDescription(title, description) {
    document.getElementById('image-title').textContent = title;
    document.getElementById('image-description').textContent = description;
}
