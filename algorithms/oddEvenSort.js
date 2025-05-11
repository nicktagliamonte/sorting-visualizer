export function* oddEvenSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  let sorted = false;
  
  while (!sorted) {
    sorted = true;
    
    // Odd phase - compare elements at positions 1,3,5...
    for (let i = 1; i < n - 1; i += 2) {
      // Mark current position as active and next position as comparison
      yield { array: a.slice(), highlights: [i + 1], active: i };
      
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        // Show after swap
        yield { array: a.slice(), highlights: [i + 1], active: i };
      }
    }
    
    // Even phase - compare elements at positions 0,2,4...
    for (let i = 0; i < n - 1; i += 2) {
      // Mark current position as active and next position as comparison
      yield { array: a.slice(), highlights: [i + 1], active: i };
      
      if (a[i] > a[i + 1]) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        sorted = false;
        // Show after swap
        yield { array: a.slice(), highlights: [i + 1], active: i };
      }
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
}
