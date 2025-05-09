export function* combSort(arr) {
  const a = arr.slice();
  const n = a.length;
  let gap = n;
  let swapped = true;

  // Define the shrink factor, usually 1.3 is used
  const shrinkFactor = 1.3;

  // Step 1: Continue until no swaps are made
  while (gap > 1 || swapped) {
    // Reduce gap
    gap = Math.floor(gap / shrinkFactor);
    if (gap < 1) gap = 1; // Ensure gap is at least 1

    swapped = false;

    // Step 2: Compare elements that are gap positions apart
    for (let i = 0; i < n - gap; i++) {
      const j = i + gap;
      if (a[i] > a[j]) {
        // Swap elements if they are in the wrong order
        [a[i], a[j]] = [a[j], a[i]];
        swapped = true;
      }

      // Yield array state for visualization
      yield { array: a.slice(), highlights: [i, j] };
    }
  }
}
