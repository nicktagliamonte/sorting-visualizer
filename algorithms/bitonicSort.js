function* bitonicSort(arr) {
  const n = arr.length;
  let currentSize = 2; // Start by sorting bitonic sequences of size 2

  // The outer loop controls the sequence size (2, 4, 8, 16, ...)
  while (currentSize <= n) {
    for (let start = 0; start < n; start += currentSize) {
      // For each sequence of the current size, do bitonic merge
      yield* bitonicMerge(arr, start, currentSize);
    }
    currentSize *= 2; // Double the size of the bitonic subsequences
  }

  // Final result: the array is sorted
  return arr;
}

// Function for bitonic merge (part of the bitonic sort)
function* bitonicMerge(arr, start, size) {
  const mid = Math.floor(size / 2);

  // Compare and swap within the bitonic subsequence
  for (let i = start; i < start + mid; i++) {
    if (arr[i] > arr[i + mid]) {
      [arr[i], arr[i + mid]] = [arr[i + mid], arr[i]]; // Swap if out of order
    }
    yield arr; // Yield after each comparison and swap
  }

  // Recursively merge smaller subarrays
  if (mid > 1) {
    yield* bitonicMerge(arr, start, mid); // Merge the first half
    yield* bitonicMerge(arr, start + mid, mid); // Merge the second half
  }
}
