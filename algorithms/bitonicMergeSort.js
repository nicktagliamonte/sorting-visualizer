// Web Worker code as a string
const workerCode = `
self.onmessage = function (e) {
  const { arr, ascending } = e.data;
  function bitonicSort(a, up) {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    const first = bitonicSort(a.slice(0, mid), true);
    const second = bitonicSort(a.slice(mid), false);
    return bitonicMerge(first.concat(second), up);
  }
  function bitonicMerge(a, up) {
    if (a.length <= 1) return a;
    const mid = Math.floor(a.length / 2);
    for (let i = 0; i < mid; i++) {
      if ((a[i] > a[i + mid]) === up) {
        [a[i], a[i + mid]] = [a[i + mid], a[i]];
      }
    }
    const first = bitonicMerge(a.slice(0, mid), up);
    const second = bitonicMerge(a.slice(mid), up);
    return first.concat(second);
  }
  const sorted = bitonicSort(arr, ascending);
  self.postMessage({ sorted });
};
`;

// Create a worker from the code string
function createWorker() {
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}

// Main function: sorts in parallel, yields only the final result
export function* bitonicMergeSort(arr) {
  const numWorkers = 4;
  const n = arr.length;
  const chunkSize = Math.ceil(n / numWorkers);
  const promises = [];
  for (let i = 0; i < numWorkers; i++) {
    const worker = createWorker();
    const chunk = arr.slice(i * chunkSize, (i + 1) * chunkSize);
    promises.push(new Promise((resolve) => {
      worker.onmessage = (e) => {
        resolve(e.data.sorted);
        worker.terminate();
      };
      worker.postMessage({ arr: chunk, ascending: true });
    }));
  }
  yield new Promise(async (resolve) => {
    let sortedChunks = await Promise.all(promises);
    // Concatenate all sorted chunks
    let merged = [].concat(...sortedChunks);
    // Pad to next power of two for bitonic sort
    let k = 1;
    while (k < merged.length) k <<= 1;
    while (merged.length < k) merged.push(Infinity); // Use Infinity as padding
    // Perform bitonic sort on the merged array in the main thread
    bitonicSortInPlace(merged, 0, merged.length, true);
    // Remove padding
    merged = merged.filter(x => x !== Infinity);
    resolve({ array: merged, highlights: [] });
  });
}

// In-place bitonic sort for merging all chunks
function bitonicSortInPlace(a, low, cnt, dir) {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);
    bitonicSortInPlace(a, low, k, true);
    bitonicSortInPlace(a, low + k, cnt - k, false);
    bitonicMergeInPlace(a, low, cnt, dir);
  }
}

function bitonicMergeInPlace(a, low, cnt, dir) {
  if (cnt > 1) {
    const k = Math.floor(cnt / 2);
    for (let i = low; i < low + k; i++) {
      if ((a[i] > a[i + k]) === dir) {
        [a[i], a[i + k]] = [a[i + k], a[i]];
      }
    }
    bitonicMergeInPlace(a, low, k, dir);
    bitonicMergeInPlace(a, low + k, cnt - k, dir);
  }
}

// Helper: merge two sorted arrays using bitonic merge
function mergeBitonic(a, b) {
  const arr = a.concat(b);
  const n = arr.length;
  let k = 1;
  while (k < n) k <<= 1;
  arr.length = k; // pad with undefined if needed
  return bitonicMerge(arr, true).filter((x) => x !== undefined);
}

function bitonicMerge(a, up) {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  for (let i = 0; i < mid; i++) {
    if ((a[i] > a[i + mid]) === up) {
      [a[i], a[i + mid]] = [a[i + mid], a[i]];
    }
  }
  const first = bitonicMerge(a.slice(0, mid), up);
  const second = bitonicMerge(a.slice(mid), up);
  return first.concat(second);
}
