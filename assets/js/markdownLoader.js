async function loadMarkdownInto(el, path) {
  try {
    const res = await fetch(path);
    const text = await res.text();
    const content = text.replace(/^---[\s\S]*?---/, '');
    el.classList.add('markdown-body');
    el.innerHTML = marked.parse(content);

    const base = path.substring(0, path.lastIndexOf('/') + 1);
    const baseUrl = new URL(base, window.location.origin + '/');
    el.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !/^(?:[a-z]+:)?\/\//i.test(src) && !src.startsWith('/')) {
        const resolved = new URL(src, baseUrl);
        img.setAttribute('src', resolved.pathname);
      }
    });
  } catch (err) {
    el.innerHTML = '<p class="text-red-500">Error cargando el contenido.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-md]').forEach(el => {
    const path = el.getAttribute('data-md');
    if (path) loadMarkdownInto(el, path);
  });
});
