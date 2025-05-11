export function* selectionSort(arr) {
  const a = arr.slice();
  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    
    // Mark current position as active
    yield { array: a.slice(), highlights: [], active: i };
    
    for (let j = i + 1; j < a.length; j++) {
      // Highlight each element being compared
      yield { array: a.slice(), highlights: [j], active: minIndex };
      
      if (a[j] < a[minIndex]) {
        minIndex = j;
        // Update minimum element highlight
        yield { array: a.slice(), highlights: [], active: minIndex };
      }
    }
    
    if (minIndex !== i) {
      // Swap elements
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      // Visualize the swap
      yield { array: a.slice(), highlights: [i], active: minIndex };
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
}