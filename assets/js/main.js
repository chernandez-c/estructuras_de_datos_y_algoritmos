window.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-links');
    const sidebarNav = document.getElementById('sidebar-nav');
    const modulesContainer = document.getElementById('modules-container');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileMedia = window.matchMedia('(max-width: 1023px)');

    const ensureInitialSidebarState = () => {
        if (mobileMedia.matches) {
            document.body.classList.add('sidebar-collapsed');
        } else {
            document.body.classList.remove('sidebar-collapsed');
        }
    };

    const updateSidebarState = () => {
        const collapsed = document.body.classList.contains('sidebar-collapsed');
        if (sidebarToggle) {
            const icon = sidebarToggle.querySelector('.toggle-icon');
            const label = sidebarToggle.querySelector('.toggle-label');
            if (icon) icon.textContent = collapsed ? 'Menú' : 'Cerrar';
            if (label) label.textContent = 'módulos';
            sidebarToggle.setAttribute('aria-pressed', (!collapsed).toString());
            sidebarToggle.setAttribute('aria-label', collapsed ? 'Mostrar navegación de módulos' : 'Ocultar navegación de módulos');
        }
        if (sidebarOverlay) {
            if (!collapsed && mobileMedia.matches) {
                sidebarOverlay.classList.add('visible');
            } else {
                sidebarOverlay.classList.remove('visible');
            }
        }
    };

    ensureInitialSidebarState();
    updateSidebarState();

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
            updateSidebarState();
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            if (!document.body.classList.contains('sidebar-collapsed')) {
                document.body.classList.add('sidebar-collapsed');
                updateSidebarState();
            }
        });
    }

    const mediaChangeHandler = () => {
        ensureInitialSidebarState();
        updateSidebarState();
    };

    if (typeof mobileMedia.addEventListener === 'function') {
        mobileMedia.addEventListener('change', mediaChangeHandler);
    } else if (typeof mobileMedia.addListener === 'function') {
        mobileMedia.addListener(mediaChangeHandler);
    }

    modulesData.forEach(mod => {
        if (navContainer) {
            const topLink = document.createElement('a');
            topLink.href = `#${mod.id}`;
            topLink.textContent = mod.title;
            topLink.className = 'nav-link px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent';
            topLink.setAttribute('title', mod.title);
            navContainer.appendChild(topLink);
        }

        if (sidebarNav) {
            const sideLink = document.createElement('a');
            sideLink.href = `#${mod.id}`;
            sideLink.textContent = mod.title;
            sideLink.className = 'nav-link sidebar-link';
            sideLink.setAttribute('title', mod.title);
            sidebarNav.appendChild(sideLink);
        }

        const section = document.createElement('section');
        section.id = mod.id;
        section.className = 'module-content min-h-screen pt-16 hidden';
        let linksHtml = `<a href="viewer.html?file=${mod.theme}" class="btn btn-primary text-white font-bold py-2 px-4 rounded-lg shadow-md">📖 Ver tema</a>`;
        if (mod.test) {
            linksHtml += ` <a href="viewer.html?file=${mod.test}" class="btn btn-success text-white font-bold py-2 px-4 rounded-lg shadow-md">📝 Test</a>`;
        }
        if (mod.example) {
            linksHtml += ` <a href="visualizacion.html?mod=${mod.example}" class="btn btn-purple text-white font-bold py-2 px-4 rounded-lg shadow-md">🧪 Ejemplo</a>`;
        }
        section.innerHTML = `<h2 class="text-3xl font-bold text-center mb-4">${mod.title}</h2><div class="text-center mb-8 space-x-4">${linksHtml}</div>`;
        modulesContainer.appendChild(section);
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const hash = event.currentTarget.getAttribute('href');
            if (!hash) return;
            event.preventDefault();
            window.location.hash = hash;
            if (mobileMedia.matches) {
                document.body.classList.add('sidebar-collapsed');
                updateSidebarState();
            }
        });
    });

    window.addEventListener('hashchange', () => {
        showModule(window.location.hash || '#inicio');
    });
    showModule(window.location.hash || '#inicio');
});
