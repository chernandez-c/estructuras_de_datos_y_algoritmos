(function() {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const body = document.body || root;

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    body.classList.toggle('dark', isDark);
    // Force style update
    void root.offsetWidth;
  }

  function toggleTheme() {
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved);
    }
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  });

  window.toggleTheme = toggleTheme;
})();
