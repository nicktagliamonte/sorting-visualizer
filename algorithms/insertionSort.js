export function* insertionSort(arr) {
  const a = arr.slice();
  const n = a.length;

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      yield { array: a.slice(), highlights: [j, j + 1] };
      j--;
    }

    a[j + 1] = key;
    yield { array: a.slice(), highlights: [j + 1] };
  }

  yield { array: a.slice(), highlights: [] }; // Final state
}
