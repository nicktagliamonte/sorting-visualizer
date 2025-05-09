export function* flashSort(arr) {
  const a = arr.slice();
  const n = a.length;

  if (n <= 1) return;

  // Step 1: Find min and max
  let min = a[0],
    max = a[0],
    maxIndex = 0;
  for (let i = 1; i < n; i++) {
    if (a[i] < min) min = a[i];
    if (a[i] > max) {
      max = a[i];
      maxIndex = i;
    }
  }

  if (min === max) return; // All elements are equal

  // Step 2: Bucket setup
  const m = Math.floor(0.43 * n);
  const buckets = new Array(m).fill(0);

  const getClass = (value) =>
    Math.floor(((m - 1) * (value - min)) / (max - min));

  // Step 3: Count distribution
  for (let i = 0; i < n; i++) {
    const k = getClass(a[i]);
    buckets[k]++;
    yield { array: a.slice(), highlights: [i] };
  }

  // Step 4: Accumulate counts
  for (let i = 1; i < m; i++) {
    buckets[i] += buckets[i - 1];
  }

  // Step 5: Permute elements to roughly correct bucket areas
  let count = 0;
  let i = 0;

  while (count < n) {
    let k = getClass(a[i]);
    while (i >= buckets[k]) {
      i++;
      k = getClass(a[i]);
    }

    let flash = a[i];
    while (i !== buckets[k]) {
      k = getClass(flash);
      const dst = --buckets[k];
      const tmp = a[dst];
      a[dst] = flash;
      flash = tmp;
      count++;
      yield { array: a.slice(), highlights: [i, dst] };
    }
  }

  // Step 6: Final pass — insertion sort
  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
      yield { array: a.slice(), highlights: [j + 1, i] };
    }
    a[j + 1] = key;
    yield { array: a.slice(), highlights: [j + 1] };
  }
}
