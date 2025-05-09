export function* oddEvenSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  let sorted = false;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  while (!sorted) {
    sorted = true;
    
    // Odd phase - compare elements at positions 0,2,4...
    for (let i = 1; i < n - 1; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        yield { array: a.slice(), highlights: [i, i + 1] };
      }
    }
    
    // Even phase - compare elements at positions 1,3,5...
    for (let i = 0; i < n - 1; i += 2) {
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        yield { array: a.slice(), highlights: [i, i + 1] };
      }
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
}
