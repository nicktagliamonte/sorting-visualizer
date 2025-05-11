export function* shellSort(arr) {
  // Create a copy of the array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Start with a large gap and reduce it over time
  // Common gap sequence is n/2, n/4, n/8, ..., 1
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Highlight the current gap size
    const gapHighlights = [];
    for (let i = 0; i < gap; i++) {
      if (i < n) gapHighlights.push(i);
    }
    yield { array: a.slice(), highlights: gapHighlights };
    
    // Perform insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      // Save a[i] in temp and make a hole at position i
      const temp = a[i];
      
      // Mark current position as active
      yield { array: a.slice(), highlights: [], active: i };
      
      // Shift earlier gap-sorted elements up until the correct location for a[i] is found
      let j;
      for (j = i; j >= gap && a[j - gap] > temp; j -= gap) {
        a[j] = a[j - gap];
        
        // Visualize each shift - highlight position being compared, active is current element
        yield { array: a.slice(), highlights: [j - gap], active: i };
      }
      
      // Put temp in its correct location
      a[j] = temp;
      
      // Visualize after placing the element
      yield { array: a.slice(), highlights: [], active: j };
    }
  }
  
  // Final state - array is now sorted
  yield { array: a.slice(), highlights: [] };
  
  return a;
}
