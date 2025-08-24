(function() {
  function setIcon(isDark) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.textContent = isDark ? '☀️' : '🌙';
  }
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    setIcon(document.documentElement.classList.contains('dark'));
    btn.addEventListener('click', function() {
      var isDark = document.documentElement.classList.toggle('dark');
      localStorage.theme = isDark ? 'dark' : 'light';
      setIcon(isDark);
    });
  });
})();
