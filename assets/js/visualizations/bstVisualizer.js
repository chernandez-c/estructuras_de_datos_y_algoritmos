let bstRoot = null;
const bstContainer = document.getElementById('bst-container');
function bstInsert() {
    const value = parseInt(document.getElementById('bst-value').value);
    if (isNaN(value)) return;
    function insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) node.left = newNode;
            else insertNode(node.left, newNode);
        } else {
            if (node.right === null) node.right = newNode;
            else insertNode(node.right, newNode);
        }
    }
    const newNode = { value, left: null, right: null };
    if (bstRoot === null) bstRoot = newNode;
    else insertNode(bstRoot, newNode);
    document.getElementById('bst-value').value = '';
    renderBST();
}
function bstClear() { bstRoot = null; renderBST(); }
function renderBST() {
    bstContainer.innerHTML = '';
    if (!bstRoot) { bstContainer.innerHTML = `<p class="text-muted">El árbol aparecerá aquí...</p>`; return; }
    function drawNode(node, x, y, px, py, level) {
        if (!node) return;
        if (px !== null) {
            const line = document.createElement('div');
            line.className = 'absolute bg-gray-400';
            const angle = Math.atan2(py - y, px - x) * 180 / Math.PI;
            const dist = Math.sqrt((px - x)**2 + (py - y)**2);
            line.style.width = `${dist}px`;
            line.style.height = '2px';
            line.style.left = `${x}px`;
            line.style.top = `${y}px`;
            line.style.transformOrigin = '0 0';
            line.style.transform = `rotate(${angle}deg)`;
            bstContainer.appendChild(line);
        }
        const nodeEl = document.createElement('div');
        nodeEl.id = `bst-node-${node.value}`;
        nodeEl.className = 'absolute w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold border-2 border-white shadow-lg';
        nodeEl.style.left = `${x - 20}px`;
        nodeEl.style.top = `${y - 20}px`;
        nodeEl.textContent = node.value;
        bstContainer.appendChild(nodeEl);
        const offset = 120 / (level + 1.5);
        drawNode(node.left, x - offset, y + 60, x, y, level + 1);
        drawNode(node.right, x + offset, y + 60, x, y, level + 1);
    }
    drawNode(bstRoot, bstContainer.clientWidth / 2, 30, null, null, 0);
}
async function bstTraverse(type) {
    let result = [];
    async function animateNode(node) {
        const el = document.getElementById(`bst-node-${node.value}`);
        el.classList.add('bg-yellow-400');
        await new Promise(r => setTimeout(r, 300));
        el.classList.remove('bg-yellow-400');
    }
    async function inOrder(node) { if (node) { await inOrder(node.left); result.push(node.value); await animateNode(node); await inOrder(node.right); } }
    async function preOrder(node) { if (node) { result.push(node.value); await animateNode(node); await preOrder(node.left); await preOrder(node.right); } }
    async function postOrder(node) { if (node) { await postOrder(node.left); await postOrder(node.right); result.push(node.value); await animateNode(node); } }
    if (type === 'in-order') await inOrder(bstRoot);
    if (type === 'pre-order') await preOrder(bstRoot);
    if (type === 'post-order') await postOrder(bstRoot);
    document.getElementById('traversal-output').textContent = result.join(' → ');
}
