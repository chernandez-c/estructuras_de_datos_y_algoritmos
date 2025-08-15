const searchArraySize = 30;
let searchArray = [];
function initSearchComparison() {
    searchArray = Array.from({length: searchArraySize}, (_, i) => i + 1);
    const linearContainer = document.getElementById('linear-search-array');
    const binaryContainer = document.getElementById('binary-search-array');
    linearContainer.innerHTML = '';
    binaryContainer.innerHTML = '';
    searchArray.forEach(val => {
        linearContainer.innerHTML += `<div id="linear-${val}" class="w-8 h-8 m-1 flex items-center justify-center bg-gray-300 rounded text-xs">${val}</div>`;
        binaryContainer.innerHTML += `<div id="binary-${val}" class="w-8 h-8 m-1 flex items-center justify-center bg-gray-300 rounded text-xs">${val}</div>`;
    });
}

async function startSearchComparison() {
    initSearchComparison();
    const value = parseInt(document.getElementById('searchValue').value);
    if (isNaN(value) || value < 1 || value > searchArraySize) {
        alert("Por favor, introduce un número entre 1 y " + searchArraySize);
        return;
    }
    await linearSearch(value);
    await binarySearch(value);
}

async function linearSearch(value) {
    let steps = 0;
    for (let i = 0; i < searchArray.length; i++) {
        steps++;
        const el = document.getElementById(`linear-${searchArray[i]}`);
        el.classList.add('bg-yellow-400');
        await new Promise(r => setTimeout(r, 50));
        if (searchArray[i] === value) {
            el.classList.replace('bg-yellow-400', 'bg-green-500');
            document.getElementById('linear-steps').textContent = `(${steps} pasos)`;
            return;
        }
        el.classList.replace('bg-yellow-400', 'bg-gray-400');
    }
}

async function binarySearch(value) {
    let steps = 0;
    let low = 0, high = searchArray.length - 1;
    while (low <= high) {
        steps++;
        let mid = Math.floor((low + high) / 2);
        for(let i = low; i <= high; i++) document.getElementById(`binary-${searchArray[i]}`).classList.add('bg-blue-300');

        const midEl = document.getElementById(`binary-${searchArray[mid]}`);
        midEl.classList.replace('bg-blue-300', 'bg-yellow-400');
        await new Promise(r => setTimeout(r, 500));

        if (searchArray[mid] === value) {
            midEl.classList.replace('bg-yellow-400', 'bg-green-500');
            document.getElementById('binary-steps').textContent = `(${steps} pasos)`;
            return;
        } else if (searchArray[mid] < value) {
            for(let i = low; i <= mid; i++) document.getElementById(`binary-${searchArray[i]}`).className = 'w-8 h-8 m-1 flex items-center justify-center bg-gray-400 rounded text-xs';
            low = mid + 1;
        } else {
            for(let i = mid; i <= high; i++) document.getElementById(`binary-${searchArray[i]}`).className = 'w-8 h-8 m-1 flex items-center justify-center bg-gray-400 rounded text-xs';
            high = mid - 1;
        }
        await new Promise(r => setTimeout(r, 500));
    }
}
