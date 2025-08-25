(function() {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const body = document.body || root;
  
  function updateIcon(isDark) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    body.classList.toggle('dark', isDark);
    const mdLink = document.getElementById('markdown-style');
    if (mdLink) {
      mdLink.href = isDark
        ? 'https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-dark.min.css'
        : 'https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-light.min.css';
    }
    updateIcon(isDark);
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
    applyTheme(saved || 'light');
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
  });

  window.toggleTheme = toggleTheme;
})();
