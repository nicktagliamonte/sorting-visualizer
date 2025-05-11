export function* radixSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Find the maximum value to determine number of digits
  let max = a[0];
  for (let i = 1; i < n; i++) {
    if (a[i] > max) {
      max = a[i];
    }
    yield { array: a.slice(), highlights: [], active: i };
  }
  
  // Count sort for each digit position
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Create count array for this digit position
    const count = new Array(10).fill(0);
    
    // Count occurrences of each digit at current position
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(a[i] / exp) % 10;
      count[digit]++;
      yield { array: a.slice(), highlights: [], active: i };
    }
    
    // Convert count to cumulative count (position)
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build output array
    const output = new Array(n);
    
    // Place elements in correct position according to current digit
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(a[i] / exp) % 10;
      output[--count[digit]] = a[i];
      
      // Create visualization showing progress
      const visualArray = [...a];
      // Highlight elements processed so far
      const highlights = [];
      for (let j = i + 1; j < n; j++) {
        highlights.push(j);
      }
      
      yield { array: visualArray, highlights, active: i };
    }
    
    // Copy output to original array for next iteration
    for (let i = 0; i < n; i++) {
      a[i] = output[i];
      yield { array: a.slice(), highlights: [], active: i };
    }
    
    // Show array after sorting by this digit
    yield { array: a.slice(), highlights: Array.from({length: n}, (_, i) => i) };
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  return a;
}
