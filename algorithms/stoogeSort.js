export function* stoogeSort(arr) {
  // Create a copy of the original array
  const a = arr.slice();
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Start the recursive stooge sort
  yield* stoogeSortHelper(a, 0, a.length - 1);
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

function* stoogeSortHelper(arr, start, end) {
  // Highlight the current subarray being sorted
  const currentSubarrayHighlights = [];
  for (let i = start + 1; i <= end; i++) {
    currentSubarrayHighlights.push(i);
  }
  yield { array: arr.slice(), highlights: currentSubarrayHighlights, active: start };
  
  // If first element is larger than last, swap them
  if (arr[start] > arr[end]) {
    // Highlight elements to be swapped
    yield { array: arr.slice(), highlights: [], active: start, active2: end };
    
    // Swap
    [arr[start], arr[end]] = [arr[end], arr[start]];
    
    // Highlight after swap
    yield { array: arr.slice(), highlights: [], active: end, active2: start };
  }
  
  // If there are at least 3 elements in the subarray
  const length = end - start + 1;
  if (length >= 3) {
    // Calculate the two-thirds point
    const third = Math.floor(length / 3);
    
    // Sort first 2/3 of array
    const firstTwoThirdsHighlights = [];
    for (let i = start; i <= start + 2*third; i++) {
      if (i !== start) firstTwoThirdsHighlights.push(i);
    }
    yield { array: arr.slice(), highlights: firstTwoThirdsHighlights, active: start };
    
    yield* stoogeSortHelper(arr, start, end - third);
    
    // Sort last 2/3 of array
    const lastTwoThirdsHighlights = [];
    for (let i = start + third; i <= end; i++) {
      if (i !== start + third) lastTwoThirdsHighlights.push(i);
    }
    yield { array: arr.slice(), highlights: lastTwoThirdsHighlights, active: start + third };
    
    yield* stoogeSortHelper(arr, start + third, end);
    
    // Sort first 2/3 of array again
    yield { array: arr.slice(), highlights: firstTwoThirdsHighlights, active: start };
    
    yield* stoogeSortHelper(arr, start, end - third);
  }
}
