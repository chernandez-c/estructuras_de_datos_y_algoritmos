// Tema: implementación robusta con tolerancia a elementos opcionales

(function () {
  const STORAGE_KEY = 'theme'; // 'light' | 'dark' | 'system'
  const LIGHT_MD = 'https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-light.min.css';
  const DARK_MD = 'https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-dark.min.css';

  const ICON_SUN = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
  const ICON_MOON = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'light' || v === 'dark' || v === 'system' ? v : null;
    } catch { return null; }
  }

  function setStoredTheme(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
  }

  function getSetting() {
    const saved = getStoredTheme();
    return saved || 'system';
  }

  function getResolvedTheme(setting) {
    if (setting === 'light' || setting === 'dark') return setting;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyTheme(setting) {
    const resolved = getResolvedTheme(setting);
    const isDark = resolved === 'dark';
    const root = document.documentElement;
    root.setAttribute('data-theme', setting);

    // Actualiza icono si existe botón
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = isDark ? ICON_SUN : ICON_MOON;
      btn.setAttribute('aria-pressed', String(isDark));
      const next = (setting === 'light') ? 'oscuro' : (setting === 'dark') ? 'sistema' : 'claro';
      btn.title = 'Cambiar a modo ' + next;
    }

    const select = document.getElementById('theme-select');
    if (select && (select instanceof HTMLSelectElement)) {
      const currentSetting = getSetting();
      if (select.value !== currentSetting) select.value = currentSetting;
    }

    const tooltip = document.getElementById('theme-tooltip');
    if (tooltip) {
      const label = setting === 'system' ? ('Sistema (' + (isDark ? 'Oscuro' : 'Claro') + ')') : (setting === 'dark' ? 'Oscuro' : 'Claro');
      tooltip.textContent = 'Tema: ' + label;
    }

    // Cambia la hoja de estilo de Markdown si existe
    const mdLink = document.getElementById('markdown-style');
    if (mdLink) {
      mdLink.setAttribute('href', isDark ? DARK_MD : LIGHT_MD);
    }
  }

  function toggleTheme() {
    const setting = getSetting();
    // Cicla: light -> dark -> system -> light
    const next = setting === 'light' ? 'dark' : setting === 'dark' ? 'system' : 'light';
    setStoredTheme(next);
    applyTheme(next);
  }

  // Inicialización al cargar
  document.addEventListener('DOMContentLoaded', () => {
    // Aplica tema usando el ajuste guardado ('system' por defecto)
    applyTheme(getSetting());

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);

    const select = document.getElementById('theme-select');
    if (select && (select instanceof HTMLSelectElement)) {
      // Inicializa valor y suscriptor
      select.value = getSetting();
      select.addEventListener('change', () => {
        const val = select.value === 'light' || select.value === 'dark' ? select.value : 'system';
        setStoredTheme(val);
        applyTheme(val);
      });
    }

    // Sincroniza cambios si se modifica en otra pestaña
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) applyTheme(getSetting());
    });

    // Responde a cambios del sistema cuando el ajuste es 'system'
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = () => { if (getSetting() === 'system') applyTheme('system'); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange); // Safari antiguo
    }
  });

  // Exporta para uso manual si hiciera falta
  window.toggleTheme = toggleTheme;
})();
