export function* countingSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Find min and max values
  let min = a[0];
  let max = a[0];
  for (let i = 1; i < n; i++) {
    if (a[i] < min) min = a[i];
    if (a[i] > max) max = a[i];
    yield { array: a.slice(), highlights: [i] };
  }
  
  // Create and populate the counts array
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  
  // Count occurrences of each element
  for (let i = 0; i < n; i++) {
    count[a[i] - min]++;
    
    // Visualize the counting process with a temporary array
    // that shows the current distribution
    const countVisualization = [];
    for (let j = 0; j < range; j++) {
      for (let k = 0; k < count[j]; k++) {
        countVisualization.push(j + min);
      }
    }
    
    // Pad the array with zeros if needed
    while (countVisualization.length < n) {
      countVisualization.push(0);
    }
    
    yield { array: countVisualization, highlights: [i] };
  }
  
  // Build the sorted array
  const sorted = new Array(n);
  let pos = 0;
  
  for (let i = 0; i < range; i++) {
    // Place each element in its sorted position
    for (let j = 0; j < count[i]; j++) {
      sorted[pos] = i + min;
      
      // Create a visualization array with elements placed so far
      const placementVisualization = new Array(n).fill(0);
      for (let k = 0; k <= pos; k++) {
        placementVisualization[k] = sorted[k];
      }
      
      yield { array: placementVisualization, highlights: [pos] };
      pos++;
    }
  }
  
  // Copy sorted array back to the original
  for (let i = 0; i < n; i++) {
    a[i] = sorted[i];
  }
  
  // Final state
  yield { array: a, highlights: [] };
  return a;
}
