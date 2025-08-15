let complexityChart;
function initComplexityChart() {
    const ctx = document.getElementById('complexityChart').getContext('2d');
    const slider = document.getElementById('n-slider');
    const nValueSpan = document.getElementById('n-value');

    const calculateData = (n) => {
        const labels = Array.from({ length: n }, (_, i) => i + 1);
        return {
            labels,
            datasets: [
                { label: 'O(log n)', data: labels.map(x => Math.log2(x)), borderColor: '#34D399', tension: 0.1, pointRadius: 0 },
                { label: 'O(n)', data: labels.map(x => x), borderColor: '#60A5FA', tension: 0.1, pointRadius: 0 },
                { label: 'O(n log n)', data: labels.map(x => x * Math.log2(x)), borderColor: '#FBBF24', tension: 0.1, pointRadius: 0 },
                { label: 'O(n²)', data: labels.map(x => x * x), borderColor: '#F87171', tension: 0.1, pointRadius: 0 },
            ]
        };
    };

    complexityChart = new Chart(ctx, {
        type: 'line',
        data: calculateData(parseInt(slider.value)),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Operaciones' } },
                x: { title: { display: true, text: 'Tamaño de Entrada (n)' } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    slider.addEventListener('input', (e) => {
        const n = parseInt(e.target.value);
        nValueSpan.textContent = n;
        const newData = calculateData(n);
        complexityChart.data.labels = newData.labels;
        complexityChart.data.datasets.forEach((dataset, i) => {
            dataset.data = newData.datasets[i].data;
        });
        complexityChart.update();
    });
}
