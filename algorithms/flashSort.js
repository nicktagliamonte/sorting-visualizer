export function* flashSort(arr) {
  const a = arr.slice();
  const n = a.length;
  
  if (n <= 1) return;
  
  // Find min and max values
  let min = a[0];
  let max = a[0];
  let maxIndex = 0;
  
  for (let i = 1; i < n; i++) {
    if (a[i] < min) {
      min = a[i];
    } else if (a[i] > max) {
      max = a[i];
      maxIndex = i;
    }
  }
  
  // Return if all elements are the same
  if (max === min) return;
  
  // Calculate bucket count (0.43 is an empirically derived coefficient)
  const m = Math.floor(0.43 * n);
  const buckets = new Array(m).fill(0);
  
  // Count elements per bucket
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.floor((m - 1) * (a[i] - min) / (max - min));
    buckets[bucketIndex]++;
    yield { array: a.slice(), highlights: [i] };
  }
  
  // Calculate starting position of each bucket
  for (let i = 1; i < m; i++) {
    buckets[i] += buckets[i - 1];
  }
  
  // Move elements to their expected positions (first permutation)
  let move = 0;
  let j = 0;
  let k = m - 1;
  
  while (move < n - 1) {
    while (j > buckets[k] - 1) {
      j++;
      k = Math.floor((m - 1) * (a[j] - min) / (max - min));
    }
    
    const flashElement = a[j];
    
    while (j !== buckets[k] - 1) {
      k = Math.floor((m - 1) * (flashElement - min) / (max - min));
      const location = --buckets[k];
      [a[j], a[location]] = [a[location], flashElement];
      yield { array: a.slice(), highlights: [j, location] };
      move++;
    }
  }
  
  // Insertion sort to finalize
  for (let i = 1; i < n; i++) {
    const temp = a[i];
    let j = i - 1;
    
    while (j >= 0 && a[j] > temp) {
      a[j + 1] = a[j];
      j--;
      yield { array: a.slice(), highlights: [j + 1, i] };
    }
    
    a[j + 1] = temp;
    yield { array: a.slice(), highlights: [j + 1] };
  }
}