const sortContainer = document.getElementById('sort-container');
let sortArray = [];
function resetSort() {
    sortArray = Array.from({length: 50}, () => Math.floor(Math.random() * 100) + 1);
    renderSortArray();
}
function renderSortArray() {
    sortContainer.innerHTML = sortArray.map(val => `<div class="sort-bar" style="height: ${val}%"></div>`).join('');
}
async function runSort() {
    const algo = document.getElementById('sort-algorithm-selector').value;
    switch(algo) {
        case 'bubbleSort': await bubbleSort(); break;
        case 'selectionSort': await selectionSort(); break;
        case 'insertionSort': await insertionSort(); break;
        case 'mergeSort': await mergeSort(sortArray, 0, sortArray.length - 1); break;
        case 'quickSort': await quickSort(sortArray, 0, sortArray.length - 1); break;
    }
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
async function bubbleSort() {
    for (let i = 0; i < sortArray.length; i++) {
        for (let j = 0; j < sortArray.length - i - 1; j++) {
            if (sortArray[j] > sortArray[j+1]) {
                [sortArray[j], sortArray[j+1]] = [sortArray[j+1], sortArray[j]];
                renderSortArray();
                await sleep(10);
            }
        }
    }
}
async function selectionSort() {
    for (let i = 0; i < sortArray.length; i++) {
        let minIndex = i;
        for (let j = i+1; j < sortArray.length; j++) {
            if (sortArray[j] < sortArray[minIndex]) minIndex = j;
        }
        if (minIndex !== i) {
            [sortArray[i], sortArray[minIndex]] = [sortArray[minIndex], sortArray[i]];
            renderSortArray();
            await sleep(10);
        }
    }
}
async function insertionSort() {
    for (let i = 1; i < sortArray.length; i++) {
        let key = sortArray[i];
        let j = i - 1;
        while (j >= 0 && sortArray[j] > key) {
            sortArray[j+1] = sortArray[j];
            j--;
            renderSortArray();
            await sleep(10);
        }
        sortArray[j+1] = key;
        renderSortArray();
        await sleep(10);
    }
}
async function merge(arr,l,m,r){
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m+1);
    let R = arr.slice(m+1, r+1);
    let i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(L[i] <= R[j]) arr[k++] = L[i++]; else arr[k++] = R[j++];
        renderSortArray();
        await sleep(10);
    }
    while(i<n1){arr[k++] = L[i++]; renderSortArray(); await sleep(10);}
    while(j<n2){arr[k++] = R[j++]; renderSortArray(); await sleep(10);}
}
async function mergeSort(arr,l,r){
    if(l>=r) return;
    let m = Math.floor((l+r)/2);
    await mergeSort(arr,l,m);
    await mergeSort(arr,m+1,r);
    await merge(arr,l,m,r);
}
async function partition(arr,low,high){
    let pivot = arr[high];
    let i = low-1;
    for(let j=low;j<high;j++){
        if(arr[j] < pivot){
            i++; [arr[i],arr[j]]=[arr[j],arr[i]]; renderSortArray(); await sleep(10);
        }
    }
    [arr[i+1],arr[high]]=[arr[high],arr[i+1]]; renderSortArray(); await sleep(10);
    return i+1;
}
async function quickSort(arr,low,high){
    if(low<high){
        let pi = await partition(arr,low,high);
        await quickSort(arr,low,pi-1);
        await quickSort(arr,pi+1,high);
    }
}
