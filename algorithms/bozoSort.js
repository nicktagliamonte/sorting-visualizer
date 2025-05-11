export function* bozoSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // For sanity, limit maximum number of swaps
  const MAX_SWAPS = 500;
  let swapCount = 0;
  
  while (!isSorted(a) && swapCount < MAX_SWAPS) {
    // Select two random indices
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    
    // Always make the first index the active one
    const active = i;
    const highlight = j;
    
    // Swap the elements
    [a[i], a[j]] = [a[j], a[i]];
    swapCount++;
    
    // Yield with active and comparison elements
    yield { array: a.slice(), highlights: [highlight], active };
    
    // If we're about to hit the limit, show a message
    if (swapCount === MAX_SWAPS - 1) {
      // Signal that we're giving up
      const message = Array(n).fill(50);
      yield { array: message, highlights: [] };
      yield { array: a.slice(), highlights: [] };
      break;
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// Check if array is sorted
function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
