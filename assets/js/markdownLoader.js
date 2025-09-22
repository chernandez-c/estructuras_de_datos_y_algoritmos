const FRONT_MATTER_RE = /^---[\s\S]*?---/;
const MATH_DELIMITERS = [
  { left: '$$', right: '$$', display: true },
  { left: '$', right: '$', display: false },
  { left: '\\(', right: '\\)', display: false },
  { left: '\\[', right: '\\]', display: true }
];
const LAST_CONTENT_SELECTOR = ':scope > p:last-of-type, :scope > ul:last-of-type, :scope > ol:last-of-type, :scope > pre:last-of-type, :scope > blockquote:last-of-type, :scope > table:last-of-type';

const pendingMathElements = new Set();

function stripFrontMatter(text) {
  return text.replace(FRONT_MATTER_RE, '');
}

function normaliseImageSources(root, basePath) {
  if (!basePath) return;
  const baseUrl = new URL(basePath, `${window.location.origin}/`);
  root.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (!src || /^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith('/')) return;
    const resolved = new URL(src, baseUrl);
    img.setAttribute('src', resolved.pathname);
  });
}

function renderMath(element) {
  if (typeof window.renderMathInElement === 'function') {
    window.renderMathInElement(element, { delimiters: MATH_DELIMITERS, throwOnError: false });
  } else {
    pendingMathElements.add(element);
  }
}

window.addEventListener('katexready', () => {
  if (typeof window.renderMathInElement !== 'function' || !pendingMathElements.size) return;
  pendingMathElements.forEach(el => window.renderMathInElement(el, { delimiters: MATH_DELIMITERS, throwOnError: false }));
  pendingMathElements.clear();
});

function createAnswerControls(answerText) {
  const container = document.createElement('div');
  container.className = 'answer-controls';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-purple px-3 py-1 rounded-md text-sm';
  button.textContent = 'Ver respuesta';

  const bubble = document.createElement('div');
  bubble.className = 'hidden text-sm answer-bubble';
  bubble.textContent = `Respuesta correcta: ${answerText}`;

  button.addEventListener('click', () => {
    const hidden = bubble.classList.toggle('hidden');
    button.textContent = hidden ? 'Ver respuesta' : 'Ocultar respuesta';
  });

  container.appendChild(button);
  container.appendChild(bubble);
  return container;
}

function buildAnswerMap(answerNodes) {
  const map = new Map();
  const lines = answerNodes
    .map(node => node.textContent.replace(/\u00a0/g, ' ').trim())
    .join('\n')
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean);

  lines.forEach(line => {
    const modern = line.match(/^pregunta\s+(\d+)\s*:\s*respuesta\s+([a-z])(?:\s*[–-]\s*(.+))?$/i);
    if (modern) {
      const idx = parseInt(modern[1], 10);
      if (!Number.isNaN(idx)) {
        const letter = modern[2].toUpperCase();
        const extra = modern[3]?.trim();
        map.set(idx, extra ? `${letter} – ${extra}` : letter);
      }
      return;
    }

    const legacy = line.match(/^(\d+)\s*[–-]\s*(.+)$/);
    if (legacy) {
      const idx = parseInt(legacy[1], 10);
      if (!Number.isNaN(idx)) map.set(idx, legacy[2].trim());
    }
  });
  return map;
}

function collectQuestionItems(preguntasHeading, respuestasHeading) {
  const items = [];
  let cursor = preguntasHeading.nextElementSibling;
  while (cursor && cursor !== respuestasHeading) {
    if (cursor.tagName === 'OL') {
      cursor.querySelectorAll(':scope > li').forEach(li => items.push(li));
    }
    cursor = cursor.nextElementSibling;
  }
  return items;
}

function enhanceSelfAssessmentSections(root) {
  const headings = Array.from(root.querySelectorAll('h2'));
  const preguntasHeading = headings.find(h => h.textContent.trim().toLowerCase() === 'preguntas');
  const respuestasHeading = headings.find(h => h.textContent.trim().toLowerCase() === 'respuestas');
  if (!preguntasHeading || !respuestasHeading) return;

  const answerNodes = [];
  let cursor = respuestasHeading.nextElementSibling;
  while (cursor && cursor.tagName !== 'H2') {
    answerNodes.push(cursor);
    cursor = cursor.nextElementSibling;
  }

  const answerMap = buildAnswerMap(answerNodes);
  if (!answerMap.size) return;

  const questionItems = collectQuestionItems(preguntasHeading, respuestasHeading);
  questionItems.forEach((item, index) => {
    const answer = answerMap.get(index + 1);
    if (!answer) return;

    const controls = createAnswerControls(answer);
    const anchor = item.querySelector(LAST_CONTENT_SELECTOR);
    if (anchor) {
      anchor.insertAdjacentElement('afterend', controls);
    } else {
      item.appendChild(controls);
    }
  });

  respuestasHeading.remove();
  answerNodes.forEach(node => node.remove());
}

async function loadMarkdownInto(el, path) {
  try {
    const response = await fetch(path);
    const raw = await response.text();
    const content = stripFrontMatter(raw);

    el.classList.add('markdown-body');
    el.innerHTML = marked.parse(content);

    enhanceSelfAssessmentSections(el);
    normaliseImageSources(el, path.substring(0, path.lastIndexOf('/') + 1));
    renderMath(el);
  } catch (error) {
    el.innerHTML = '<p class="text-red-500">Error cargando el contenido.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-md]').forEach(el => {
    const path = el.getAttribute('data-md');
    if (path) loadMarkdownInto(el, path);
  });
});

window.loadMarkdownInto = loadMarkdownInto;
