export function* bitonicSort(arr) {
  // Make a copy of the array to avoid modifying the original
  const workingArray = [...arr];
  const n = workingArray.length;
  
  // Initial state
  yield { array: [...workingArray], highlights: [] };
  
  // Do nothing for empty or single-element arrays
  if (n <= 1) return workingArray;
  
  // Simple iterative approach
  for (let k = 2; k <= n; k *= 2) {
    for (let j = k/2; j > 0; j /= 2) {
      for (let i = 0; i < n; i++) {
        const l = i ^ j;
        
        // Only compare if l > i and l is within array bounds
        if (l > i && l < n) {
          // Determine sort direction based on position
          const isAscending = ((i & k) === 0);
          
          // Compare and swap if needed
          if ((workingArray[i] > workingArray[l]) === isAscending) {
            // Swap elements
            [workingArray[i], workingArray[l]] = [workingArray[l], workingArray[i]];
            
            // Mark i as active and l as comparison element
            yield { array: [...workingArray], highlights: [l], active: i };
          } else {
            // Even when no swap happens, still show the comparison
            yield { array: [...workingArray], highlights: [l], active: i };
          }
        }
      }
    }
  }
  
  // Final state
  yield { array: [...workingArray], highlights: [] };
  return workingArray;
}
