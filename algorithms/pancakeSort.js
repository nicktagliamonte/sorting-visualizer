export function* pancakeSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Start with the entire array and reduce one element at a time
  for (let currSize = n; currSize > 1; currSize--) {
    // Find index of the maximum element in arr[0..currSize-1]
    let maxIdx = 0;
    for (let i = 0; i < currSize; i++) {
      // Mark current position as active and current max as comparison
      yield { array: a.slice(), highlights: [maxIdx], active: i };
      
      if (a[i] > a[maxIdx]) {
        maxIdx = i;
      }
    }
    
    // If the maximum element is already at the end of the current subarray
    if (maxIdx === currSize - 1) {
      continue; // Already in place, skip to next iteration
    }
    
    // First flip: Move the maximum to the beginning
    // (Only if max element is not already at the beginning)
    if (maxIdx !== 0) {
      // Highlight the subarray that will be flipped [0...maxIdx]
      // Mark the pivot element as active
      const flipHighlights = [];
      for (let i = 0; i < maxIdx; i++) {
        flipHighlights.push(i);
      }
      yield { array: a.slice(), highlights: flipHighlights, active: maxIdx };
      
      // Flip the subarray from 0 to maxIdx
      yield* flip(a, maxIdx);
    }
    
    // Second flip: Move the maximum (now at beginning) to the end of current subarray
    // Mark the first element as active (the max element about to be flipped)
    const flipHighlights = [];
    for (let i = 1; i < currSize; i++) {
      flipHighlights.push(i);
    }
    yield { array: a.slice(), highlights: flipHighlights, active: 0 };
    
    // Flip the subarray from 0 to currSize-1
    yield* flip(a, currSize - 1);
    
    // Show that one more element is now in its final position
    yield { array: a.slice(), highlights: [], active: currSize - 1 };
  }
  
  // Final state - the array is now sorted
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// Helper function to flip a subarray from 0 to end
function* flip(arr, end) {
  let start = 0;
  while (start < end) {
    // Swap elements
    [arr[start], arr[end]] = [arr[end], arr[start]];
    
    // Highlight the elements that were just swapped
    yield { array: arr.slice(), highlights: [end], active: start };
    
    // Move towards the middle
    start++;
    end--;
  }
}
