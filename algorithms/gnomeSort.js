export function* gnomeSort(arr) {
  const a = arr.slice();
  let index = 0;

  while (index < a.length) {
    // If we are at the start or element is in correct order, move forward
    if (index === 0 || a[index - 1] <= a[index]) {
      // Mark current position as active
      yield { array: a.slice(), highlights: index > 0 ? [index - 1] : [], active: index };
      index++;
    } else {
      // Swap the elements if they are out of order
      [a[index - 1], a[index]] = [a[index], a[index - 1]];
      
      // Mark the elements being swapped: current position as active, previous as comparison
      yield { array: a.slice(), highlights: [index - 1], active: index };
      
      index--; // Move back to previous element
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
}
