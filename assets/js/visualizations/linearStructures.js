let stackCounter = 0;
const stackContainer = document.getElementById('stack-container');
function stackPush() {
    if (stackContainer.children.length >= 8) return;
    stackCounter++;
    const item = document.createElement('div');
    item.className = 'stack-item w-1/2 bg-blue-400 text-white text-center font-bold p-2 rounded shadow-md border border-blue-500';
    item.textContent = stackCounter;
    item.style.transform = 'scale(0)';
    stackContainer.appendChild(item);
    setTimeout(() => item.style.transform = 'scale(1)', 50);
}
function stackPop() {
    if (stackContainer.children.length > 0) {
        const item = stackContainer.lastChild;
        item.style.transform = 'scale(0)';
        setTimeout(() => stackContainer.removeChild(item), 500);
    }
}

let queueCounter = 0;
const queueContainer = document.getElementById('queue-container');
function queueEnqueue() {
    if (queueContainer.children.length >= 8) return;
    queueCounter++;
    const item = document.createElement('div');
    item.className = 'queue-item bg-indigo-400 text-white text-center font-bold p-2 rounded shadow-md border border-indigo-500 mx-1';
    item.textContent = queueCounter;
    item.style.transform = 'scale(0)';
    queueContainer.appendChild(item);
    setTimeout(() => item.style.transform = 'scale(1)', 50);
}
function queueDequeue() {
    if (queueContainer.children.length > 0) {
        const item = queueContainer.firstChild;
        item.style.transform = 'translateX(-100px) rotate(-45deg)';
        item.style.opacity = '0';
        setTimeout(() => queueContainer.removeChild(item), 500);
    }
}
