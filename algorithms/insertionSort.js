export function* insertionSort(arr) {
  const a = arr.slice();
  const n = a.length;

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    // Mark current key as active
    yield { array: a.slice(), highlights: [], active: i };

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      
      // Mark the position being compared as highlight, key position as active
      yield { array: a.slice(), highlights: [j], active: i };
      
      j--;
    }

    a[j + 1] = key;
    
    // Show key being placed in its final position for this iteration
    yield { array: a.slice(), highlights: [], active: j + 1 };
  }

  // Final state
  yield { array: a.slice(), highlights: [] };
}
