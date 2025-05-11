export function* cocktailShakerSort(arr) {
  const a = arr.slice();
  let start = 0;
  let end = a.length - 1;
  let swapped = true;

  // Initial state
  yield { array: a.slice(), highlights: [] };

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      // Mark current position as active and next position as comparison
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
      yield { array: a.slice(), highlights: [i + 1], active: i };
    }

    if (!swapped) break;
    swapped = false;
    end--;

    // Backward pass
    for (let i = end - 1; i >= start; i--) {
      // Mark current position as active and next position as comparison
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
      }
      yield { array: a.slice(), highlights: [i + 1], active: i };
    }

    start++;
  }

  // Final state
  yield { array: a.slice(), highlights: [] };
}
