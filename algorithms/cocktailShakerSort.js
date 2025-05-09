export function* cocktailShakerSort(arr) {
  const a = arr.slice();
  let start = 0;
  let end = a.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Forward pass
    for (let i = start; i < end; i++) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
        yield { array: a.slice(), highlights: [i, i + 1] };
      }
    }

    if (!swapped) break;
    swapped = false;
    end--;

    // Backward pass
    for (let i = end - 1; i >= start; i--) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swapped = true;
        yield { array: a.slice(), highlights: [i, i + 1] };
      }
    }

    start++;
  }

  yield { array: a.slice(), highlights: [] }; // final state
}
