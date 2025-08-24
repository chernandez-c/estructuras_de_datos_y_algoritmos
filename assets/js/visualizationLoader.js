document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const mod = params.get('mod');
  const container = document.getElementById('viz-container');
  const config = {
    '1': { file: 'assets/html/viz1.html', scripts: ['https://cdn.jsdelivr.net/npm/chart.js', 'assets/js/visualizations/complexityChart.js'], init: () => initComplexityChart() },
    '2': { file: 'assets/html/viz2.html', scripts: ['assets/js/visualizations/linearStructures.js'] },
    '3': { file: 'assets/html/viz3.html', scripts: ['assets/js/visualizations/searchComparison.js'], init: () => initSearchComparison() },
    '4': { file: 'assets/html/viz4.html', scripts: ['assets/js/visualizations/sortingVisualizer.js'], init: () => resetSort() },
    '5': { file: 'assets/html/viz5.html', scripts: ['assets/js/visualizations/bstVisualizer.js'], init: () => bstClear() },
    '6': { file: 'assets/html/viz6.html', scripts: ['assets/js/visualizations/graphVisualizer.js'], init: () => initGraph() }
  };
  const cfg = config[mod];
  if (!cfg) {
    container.innerHTML = '<p class="text-red-500">Visualización no disponible.</p>';
    return;
  }
  try {
    const res = await fetch(cfg.file);
    container.innerHTML = await res.text();
    for (const src of cfg.scripts) {
      await loadScript(src);
    }
    if (cfg.init) cfg.init();
  } catch (err) {
    container.innerHTML = '<p class="text-red-500">Error cargando la visualización.</p>';
  }
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}
