export function* bozoSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;

  // Initial state
  yield { array: a.slice(), highlights: [] };

  // For sanity, limit the maximum number of swaps
  const MAX_SWAPS = 200;
  let swapCount = 0;

  // Continue until the array is sorted or we reach the maximum swaps
  while (!isSorted(a) && swapCount < MAX_SWAPS) {
    // Pick two random indices
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);

    // Swap the elements at those indices
    [a[i], a[j]] = [a[j], a[i]];
    swapCount++;

    // Yield the new state with the swapped elements highlighted
    yield { array: a.slice(), highlights: [i, j] };

    // Add some commentary at certain milestones
    if (swapCount === 50) {
      yield {
        array: a.slice(),
        highlights: Array.from({ length: n }, (_, i) => i),
      };
    }

    if (swapCount === 100) {
      yield {
        array: a.slice(),
        highlights: Array.from({ length: n }, (_, i) => i),
      };
    }

    if (swapCount === MAX_SWAPS - 1) {
      // Signal that we're giving up
      const message = Array(n).fill(50); // A visible but neutral height
      yield {
        array: message,
        highlights: Array.from({ length: n }, (_, i) => i),
      };

      // Then restore the last swapped state
      yield { array: a.slice(), highlights: [] };
    }
  }

  // Final state (either sorted or the last swap)
  yield {
    array: a.slice(),
    highlights: isSorted(a) ? Array.from({ length: n }, (_, i) => i) : [],
  };

  return a;
}

// Check if the array is sorted
function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
