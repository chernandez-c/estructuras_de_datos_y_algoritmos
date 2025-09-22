function renderMathContent(el) {
  if (window.renderMathInElement) {
    window.renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  }
}

function enhanceAnswerSections(root) {
  const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    if (heading.textContent.trim().toLowerCase() === 'respuestas') {
      const level = parseInt(heading.tagName.slice(1), 10) || 6;
      const details = document.createElement('details');
      details.className = 'answers-block';

      const summary = document.createElement('summary');
      summary.className = 'answers-summary';

      const label = document.createElement('span');
      label.className = 'answers-summary-label';
      label.textContent = 'Respuestas';
      const action = document.createElement('span');
      action.className = 'answers-summary-action';
      action.textContent = 'Ver respuestas';

      summary.appendChild(label);
      summary.appendChild(action);
      details.appendChild(summary);

      let sibling = heading.nextSibling;
      while (sibling) {
        if (sibling.nodeType === Node.ELEMENT_NODE) {
          const tag = sibling.tagName;
          if (tag && /^H[1-6]$/.test(tag) && parseInt(tag.slice(1), 10) <= level) {
            break;
          }
        }
        const nextSibling = sibling.nextSibling;
        details.appendChild(sibling);
        sibling = nextSibling;
      }

      details.addEventListener('toggle', () => {
        action.textContent = details.open ? 'Ocultar respuestas' : 'Ver respuestas';
      });

      heading.replaceWith(details);
    }
  });
}

async function loadMarkdownInto(el, path) {
  try {
    const res = await fetch(path);
    const text = await res.text();
    const content = text.replace(/^---[\s\S]*?---/, '');
    const normalized = content
      .replace(/\\\[/g, '$$')
      .replace(/\\\]/g, '$$')
      .replace(/\\\(/g, '$')
      .replace(/\\\)/g, '$');
    el.classList.add('markdown-body');
    el.innerHTML = marked.parse(normalized);

    const base = path.substring(0, path.lastIndexOf('/') + 1);
    const baseUrl = new URL(base, window.location.origin + '/');
    el.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !/^(?:[a-z]+:)?\/\//i.test(src) && !src.startsWith('/')) {
        const resolved = new URL(src, baseUrl);
        img.setAttribute('src', resolved.pathname);
      }
    });

    renderMathContent(el);
    enhanceAnswerSections(el);
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
