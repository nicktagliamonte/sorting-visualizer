export function* spaghettiSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Create a new sorted array to collect elements
  const sorted = [];
  
  // Keep track of which elements have been "picked up"
  const pickedUp = new Array(n).fill(false);
  
  // Continue until all elements are picked up
  while (sorted.length < n) {
    // Find the current maximum height (tallest remaining "spaghetti")
    let maxHeight = 0;
    let maxIndices = [];
    
    for (let i = 0; i < n; i++) {
      if (!pickedUp[i] && a[i] > maxHeight) {
        maxHeight = a[i];
        maxIndices = [i];
      } else if (!pickedUp[i] && a[i] === maxHeight) {
        maxIndices.push(i);
      }
    }
    
    // Visualization of the "hand" lowering to touch spaghetti
    for (let height = 110; height >= maxHeight; height -= 5) {
      const handVisualization = a.slice();
      
      // Visualize the hand
      const handHighlights = [];
      for (let i = 0; i < n; i++) {
        // Only highlight positions where the hand is above unselected elements
        if (!pickedUp[i] && handVisualization[i] <= height) {
          handHighlights.push(i);
        }
      }
      
      // Add the "hand" as horizontal line
      yield { 
        array: handVisualization, 
        highlights: handHighlights,
        handHeight: height // Custom property for hand visualization
      };
    }
    
    // Pick up the tallest pieces
    for (const index of maxIndices) {
      pickedUp[index] = true;
      sorted.push(a[index]);
      
      // Visualize the picking up of the max elements
      const visualArray = new Array(n).fill(0);
      
      // Fill in already sorted elements
      for (let i = 0; i < sorted.length; i++) {
        visualArray[n - 1 - i] = sorted[sorted.length - 1 - i];
      }
      
      // Fill in remaining elements
      let remainingIndex = 0;
      for (let i = 0; i < n; i++) {
        if (!pickedUp[i]) {
          visualArray[remainingIndex++] = a[i];
        }
      }
      
      yield { array: visualArray, highlights: [n - sorted.length] };
    }
  }
  
  // Final state - the array is now sorted in descending order
  // So we need to reverse it
  sorted.reverse();
  
  // Show the final sorted array
  yield { array: sorted, highlights: [] };
  
  return sorted;
}
