const __pendingMathElements = new Set();

function renderMathIfReady(el) {
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
  } else {
    __pendingMathElements.add(el);
  }
}

function flushPendingMath() {
  if (!window.renderMathInElement) return;
  if (__pendingMathElements.size === 0) return;
  __pendingMathElements.forEach(el => {
    window.renderMathInElement(el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false
    });
  });
  __pendingMathElements.clear();
}

window.addEventListener('katexready', flushPendingMath);

async function loadMarkdownInto(el, path) {
  try {
    const res = await fetch(path);
    const text = await res.text();
    const content = text.replace(/^---[\s\S]*?---/, '');
    el.classList.add('markdown-body');
    el.innerHTML = marked.parse(content);

    renderMathIfReady(el);

    enhanceSelfAssessmentSections(el);

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

function enhanceSelfAssessmentSections(root) {
  const headings = Array.from(root.querySelectorAll('h2'));
  if (headings.length === 0) return;

  const preguntasHeading = headings.find(h => h.textContent.trim().toLowerCase() === 'preguntas');
  const respuestasHeading = headings.find(h => h.textContent.trim().toLowerCase() === 'respuestas');
  if (!preguntasHeading || !respuestasHeading) return;

  const answerNodes = [];
  let answerCursor = respuestasHeading.nextElementSibling;
  while (answerCursor && answerCursor.tagName !== 'H2') {
    answerNodes.push(answerCursor);
    answerCursor = answerCursor.nextElementSibling;
  }

  const answersText = answerNodes.map(node => node.textContent.trim()).join('\n');
  const answerMap = {};
  answersText.split(/\n+/).forEach(line => {
    const clean = line.trim();
    if (!clean) return;

    const modernMatch = clean.match(/^pregunta\s+(\d+)\s*:\s*respuesta\s+([a-z])(?:\s*[–-]\s*(.+))?$/i);
    if (modernMatch) {
      const questionNumber = parseInt(modernMatch[1], 10);
      if (!Number.isNaN(questionNumber)) {
        const letter = modernMatch[2].toUpperCase();
        const extra = modernMatch[3]?.trim();
        answerMap[questionNumber] = extra ? `${letter} – ${extra}` : letter;
      }
      return;
    }

    const legacyMatch = clean.match(/^(\d+)\s*[–-]\s*(.+)$/);
    if (legacyMatch) {
      const questionNumber = parseInt(legacyMatch[1], 10);
      if (!Number.isNaN(questionNumber)) {
        answerMap[questionNumber] = legacyMatch[2].trim();
      }
    }
  });

  if (Object.keys(answerMap).length === 0) return;

  const questionItems = [];
  let questionCursor = preguntasHeading.nextElementSibling;
  while (questionCursor && questionCursor !== respuestasHeading) {
    if (questionCursor.tagName === 'OL') {
      questionItems.push(...Array.from(questionCursor.children).filter(child => child.tagName === 'LI'));
    }
    questionCursor = questionCursor.nextElementSibling;
  }

  questionItems.forEach((item, index) => {
    const questionNumber = index + 1;
    const answerText = answerMap[questionNumber];
    if (!answerText) return;

    const controlsContainer = document.createElement('span');
    controlsContainer.className = 'answer-controls';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-purple px-3 py-1 rounded-md text-sm';
    button.textContent = 'Ver respuesta';

    const answerBubble = document.createElement('div');
    answerBubble.className = 'hidden text-sm answer-bubble';
    answerBubble.textContent = `Respuesta correcta: ${answerText}`;

    button.addEventListener('click', () => {
      const isHidden = answerBubble.classList.toggle('hidden');
      button.textContent = isHidden ? 'Ver respuesta' : 'Ocultar respuesta';
    });

    controlsContainer.appendChild(button);
    controlsContainer.appendChild(answerBubble);

    const contentAnchor = item.querySelector(
      ':scope > p:last-of-type, :scope > ul:last-of-type, :scope > ol:last-of-type, :scope > pre:last-of-type'
    );

    if (contentAnchor) {
      contentAnchor.insertAdjacentElement('afterend', controlsContainer);
    } else {
      item.appendChild(controlsContainer);
    }
  });

  respuestasHeading.remove();
  answerNodes.forEach(node => node.remove());
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-md]').forEach(el => {
    const path = el.getAttribute('data-md');
    if (path) loadMarkdownInto(el, path);
  });
});
