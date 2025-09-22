const sortContainer = document.getElementById('sort-container');
const runSortBtn = document.getElementById('run-sort-btn');
const pauseSortBtn = document.getElementById('pause-sort-btn');
const speedSelect = document.getElementById('sort-speed');

const SORT_SIZE = 50;
const DEFAULT_SORT_DELAY = 25;
const PAUSE_POLL_INTERVAL = 40;

class SortCancelled extends Error {}

let sortArray = [];
let isSorting = false;
let isPaused = false;
let shouldStop = false;
let currentSortPromise = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomArray() {
    return Array.from({ length: SORT_SIZE }, () => Math.floor(Math.random() * 100) + 1);
}

function updateSortControls() {
    if (runSortBtn) runSortBtn.disabled = isSorting;
    if (pauseSortBtn) {
        pauseSortBtn.disabled = !isSorting;
        pauseSortBtn.textContent = isPaused ? 'Reanudar' : 'Pausar';
    }
}

function renderSortArray() {
    if (!sortContainer) return;
    sortContainer.innerHTML = '';
    sortArray.forEach(val => {
        const bar = document.createElement('div');
        bar.className = 'sort-bar';
        bar.style.height = `${val}%`;

        const label = document.createElement('span');
        label.className = 'sort-bar-label';
        label.textContent = val;

        bar.appendChild(label);
        sortContainer.appendChild(bar);
    });
}

async function guard() {
    if (shouldStop) throw new SortCancelled();
    while (isPaused) {
        await sleep(PAUSE_POLL_INTERVAL);
        if (shouldStop) throw new SortCancelled();
    }
}

function getCurrentDelay() {
    const raw = speedSelect?.value ?? '';
    const delay = parseInt(raw, 10);
    return Number.isFinite(delay) && delay >= 0 ? delay : DEFAULT_SORT_DELAY;
}

async function sleepWithGuard() {
    await guard();
    await sleep(getCurrentDelay());
    await guard();
}

async function runSort() {
    if (isSorting) return;

    shouldStop = false;
    isPaused = false;
    isSorting = true;
    updateSortControls();

    const algo = document.getElementById('sort-algorithm-selector')?.value;

    const sortTask = (async () => {
        try {
            switch (algo) {
                case 'bubbleSort':
                    await bubbleSort();
                    break;
                case 'selectionSort':
                    await selectionSort();
                    break;
                case 'insertionSort':
                    await insertionSort();
                    break;
                case 'mergeSort':
                    await mergeSort(sortArray, 0, sortArray.length - 1);
                    break;
                case 'quickSort':
                    await quickSort(sortArray, 0, sortArray.length - 1);
                    break;
                default:
                    break;
            }
        } catch (error) {
            if (!(error instanceof SortCancelled)) throw error;
        }
    })();

    currentSortPromise = sortTask;

    try {
        await sortTask;
    } finally {
        isSorting = false;
        isPaused = false;
        shouldStop = false;
        currentSortPromise = null;
        updateSortControls();
    }
}

async function resetSort() {
    shouldStop = true;
    isPaused = false;
    updateSortControls();

    if (currentSortPromise) {
        try {
            await currentSortPromise;
        } catch (error) {
            if (!(error instanceof SortCancelled)) throw error;
        }
    }

    sortArray = generateRandomArray();
    renderSortArray();
}

function toggleSortPause() {
    if (!isSorting) return;
    isPaused = !isPaused;
    updateSortControls();
}

async function bubbleSort() {
    for (let i = 0; i < sortArray.length; i++) {
        await guard();
        for (let j = 0; j < sortArray.length - i - 1; j++) {
            await guard();
            if (sortArray[j] > sortArray[j + 1]) {
                [sortArray[j], sortArray[j + 1]] = [sortArray[j + 1], sortArray[j]];
                renderSortArray();
                await sleepWithGuard();
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < sortArray.length; i++) {
        await guard();
        let minIndex = i;
        for (let j = i + 1; j < sortArray.length; j++) {
            await guard();
            if (sortArray[j] < sortArray[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [sortArray[i], sortArray[minIndex]] = [sortArray[minIndex], sortArray[i]];
            renderSortArray();
            await sleepWithGuard();
        }
    }
}

async function insertionSort() {
    for (let i = 1; i < sortArray.length; i++) {
        await guard();
        const key = sortArray[i];
        let j = i - 1;
        while (j >= 0 && sortArray[j] > key) {
            await guard();
            sortArray[j + 1] = sortArray[j];
            j--;
            renderSortArray();
            await sleepWithGuard();
        }
        sortArray[j + 1] = key;
        renderSortArray();
        await sleepWithGuard();
    }
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);
    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        await guard();
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
        renderSortArray();
        await sleepWithGuard();
    }

    while (i < n1) {
        await guard();
        arr[k++] = L[i++];
        renderSortArray();
        await sleepWithGuard();
    }

    while (j < n2) {
        await guard();
        arr[k++] = R[j++];
        renderSortArray();
        await sleepWithGuard();
    }
}

async function mergeSort(arr, l, r) {
    await guard();
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        await guard();
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            renderSortArray();
            await sleepWithGuard();
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    renderSortArray();
    await sleepWithGuard();
    return i + 1;
}

async function quickSort(arr, low, high) {
    await guard();
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}
