async function loadMarkdownInto(el, path) {
  try {
    const res = await fetch(path);
    const text = await res.text();
    const content = text.replace(/^---[\s\S]*?---/, '');
    el.innerHTML = marked.parse(content);
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
