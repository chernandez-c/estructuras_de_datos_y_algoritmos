window.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-links');
    const modulesContainer = document.getElementById('modules-container');

    modulesData.forEach(mod => {
        const link = document.createElement('a');
        link.href = `#${mod.id}`;
        link.textContent = mod.nav;
        link.className = 'nav-link px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-400';
        navContainer.appendChild(link);

        const section = document.createElement('section');
        section.id = mod.id;
        section.className = 'module-content min-h-screen pt-16 hidden';
        let linksHtml = `<a href="viewer.html?file=${mod.theme}" class="btn bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">📖 Ver tema</a>`;
        if (mod.test) {
            linksHtml += ` <a href="viewer.html?file=${mod.test}" class="btn bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">📝 Test</a>`;
        }
        if (mod.example) {
            linksHtml += ` <a href="visualizacion.html?mod=${mod.example}" class="btn bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">🧪 Ejemplo</a>`;
        }
        section.innerHTML = `<h2 class="text-3xl font-bold text-center mb-4">${mod.title}</h2><div class="text-center mb-8 space-x-4">${linksHtml}</div>`;
        modulesContainer.appendChild(section);
    });

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
