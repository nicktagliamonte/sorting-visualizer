export function* bubbleSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      // Current element j is the active one
      // j+1 is the comparison element
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
      yield { array: a.slice(), highlights: [j + 1], active: j };
    }
  }
}
