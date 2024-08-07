document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('modeToggle');
    const currentMode = localStorage.getItem('theme');

    if (currentMode) {
        document.body.classList.add(currentMode);
        toggleSwitch.checked = currentMode === 'dark-mode';
    } else {
        // Default to light mode if no theme is stored
        document.body.classList.add('light-mode');
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
});
