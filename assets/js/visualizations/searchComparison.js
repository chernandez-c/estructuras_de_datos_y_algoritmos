const searchArraySize = 30;
let searchArray = [];
function initSearchComparison() {
    searchArray = Array.from({length: searchArraySize}, (_, i) => i + 1);
    const linearContainer = document.getElementById('linear-search-array');
    const binaryContainer = document.getElementById('binary-search-array');
    linearContainer.innerHTML = '';
    binaryContainer.innerHTML = '';
    searchArray.forEach(val => {
        linearContainer.innerHTML += `<div id="linear-${val}" class="chip">${val}</div>`;
        binaryContainer.innerHTML += `<div id="binary-${val}" class="chip">${val}</div>`;
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
        el.classList.add('chip-active');
        await new Promise(r => setTimeout(r, 50));
        if (searchArray[i] === value) {
            el.classList.remove('chip-active');
            el.classList.add('chip-found');
            document.getElementById('linear-steps').textContent = `(${steps} pasos)`;
            return;
        }
        el.classList.remove('chip-active');
        el.classList.add('chip-dim');
    }
}

async function binarySearch(value) {
    let steps = 0;
    let low = 0, high = searchArray.length - 1;
    while (low <= high) {
        steps++;
        let mid = Math.floor((low + high) / 2);
        for(let i = low; i <= high; i++) document.getElementById(`binary-${searchArray[i]}`).classList.add('chip-range');

        const midEl = document.getElementById(`binary-${searchArray[mid]}`);
        midEl.classList.remove('chip-range');
        midEl.classList.add('chip-active');
        await new Promise(r => setTimeout(r, 500));

        if (searchArray[mid] === value) {
            midEl.classList.remove('chip-active');
            midEl.classList.add('chip-found');
            document.getElementById('binary-steps').textContent = `(${steps} pasos)`;
            return;
        } else if (searchArray[mid] < value) {
            for(let i = low; i <= mid; i++) {
                const el = document.getElementById(`binary-${searchArray[i]}`);
                el.className = 'chip chip-dim';
            }
            low = mid + 1;
        } else {
            for(let i = mid; i <= high; i++) {
                const el = document.getElementById(`binary-${searchArray[i]}`);
                el.className = 'chip chip-dim';
            }
            high = mid - 1;
        }
        await new Promise(r => setTimeout(r, 500));
    }
}
