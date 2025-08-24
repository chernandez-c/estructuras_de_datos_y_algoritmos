function initBioExample() {
  const seqEl = document.getElementById('bio-seq');
  const motifEl = document.getElementById('bio-motif');
  const resEl = document.getElementById('bio-results');
  const seq = generateRandomDNA(5000);
  seqEl.value = seq;
  document.getElementById('bio-run').addEventListener('click', () => {
    const motif = motifEl.value.trim().toUpperCase();
    if (!motif) {
      resEl.textContent = 'Introduce un motivo.';
      return;
    }
    const t1 = performance.now();
    const naiveCount = naiveSearch(seq, motif);
    const t2 = performance.now();
    const index = buildIndex(seq, motif.length);
    const t3 = performance.now();
    const hashCount = indexSearch(index, motif);
    const t4 = performance.now();
    resEl.innerHTML = `Ingenua: ${naiveCount} coincidencias en ${(t2 - t1).toFixed(2)} ms<br>` +
      `Indexada: ${hashCount} coincidencias en ${(t4 - t3).toFixed(2)} ms`;
  });
}

function generateRandomDNA(n) {
  const chars = 'ACGT';
  let s = '';
  for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * 4)];
  return s;
}

function naiveSearch(seq, motif) {
  let count = 0;
  const k = motif.length;
  for (let i = 0; i <= seq.length - k; i++) {
    if (seq.substr(i, k) === motif) count++;
  }
  return count;
}

function buildIndex(seq, k) {
  const index = {};
  for (let i = 0; i <= seq.length - k; i++) {
    const kmer = seq.substr(i, k);
    index[kmer] = (index[kmer] || 0) + 1;
  }
  return index;
}

function indexSearch(index, motif) {
  return index[motif] || 0;
}
