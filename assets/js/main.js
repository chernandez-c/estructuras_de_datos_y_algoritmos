window.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const hash = e.target.getAttribute('href');
            window.location.hash = hash;
        });
    });

    window.addEventListener('hashchange', () => {
        showModule(window.location.hash || '#inicio');
    });
    showModule(window.location.hash || '#inicio');
});
