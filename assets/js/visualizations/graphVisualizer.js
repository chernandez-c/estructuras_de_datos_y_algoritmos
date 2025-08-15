const graph = {
    'Glucosa': ['G6P'],
    'G6P': ['F6P', 'Glucógeno'],
    'F6P': ['F1,6BP', 'Glucosamina-6P'],
    'Glucógeno': [],
    'F1,6BP': [],
    'Glucosamina-6P': []
};
const graphPositions = {
    'Glucosa': {x: 50, y: 10},
    'G6P': {x: 50, y: 35},
    'F6P': {x: 50, y: 60},
    'Glucógeno': {x: 80, y: 35},
    'F1,6BP': {x: 30, y: 85},
    'Glucosamina-6P': {x: 70, y: 85}
};
const graphContainer = document.getElementById('graph-container');
function initGraph() {
    graphContainer.innerHTML = '';
    Object.entries(graphPositions).forEach(([node, pos]) => {
        const nodeEl = document.createElement('div');
        nodeEl.id = `graph-node-${node}`;
        nodeEl.className = 'absolute p-1 text-xs rounded bg-indigo-500 text-white flex items-center justify-center font-bold border-2 border-white shadow-lg';
        nodeEl.style.left = `${pos.x}%`;
        nodeEl.style.top = `${pos.y}%`;
        nodeEl.style.transform = 'translate(-50%, -50%)';
        nodeEl.textContent = node;
        graphContainer.appendChild(nodeEl);
    });
}
async function graphTraverse(type) {
    initGraph();
    let result = [];
    const startNode = 'Glucosa';
    if (type === 'bfs') {
        let queue = [startNode];
        let visited = new Set([startNode]);
        while (queue.length > 0) {
            let node = queue.shift();
            result.push(node);
            document.getElementById(`graph-node-${node}`).classList.add('bg-yellow-400');
            await new Promise(r => setTimeout(r, 500));
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    } else { // dfs
        let stack = [startNode];
        let visited = new Set();
        while (stack.length > 0) {
            let node = stack.pop();
            if (!visited.has(node)) {
                visited.add(node);
                result.push(node);
                document.getElementById(`graph-node-${node}`).classList.add('bg-yellow-400');
                await new Promise(r => setTimeout(r, 500));
                for (const neighbor of graph[node].slice().reverse()) {
                    stack.push(neighbor);
                }
            }
        }
    }
    document.getElementById('graph-traversal-output').textContent = result.join(' → ');
}
