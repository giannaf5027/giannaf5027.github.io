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

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
        currentIndex = 0;
    }

    const itemWidth = items[0].clientWidth + 20; // 20 is the gap between items
    const offset = -currentIndex * itemWidth;
    carousel.style.transform = `translateX(${offset}px)`;
}

function showDescription(title, description) {
    document.getElementById('image-title').textContent = title;
    document.getElementById('image-description').textContent = description;
}
