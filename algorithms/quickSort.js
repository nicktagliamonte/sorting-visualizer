export function* quickSort(arr) {
  // Create a copy of the array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Start the recursive quicksort
  yield* quickSortHelper(a, 0, n - 1);
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

function* quickSortHelper(arr, low, high) {
  if (low < high) {
    // Partition the array and get the pivot index
    const pivotIndex = yield* partition(arr, low, high);
    
    // Highlight the pivot in its final position
    yield { array: arr.slice(), highlights: [pivotIndex] };
    
    // Recursively sort the sub-arrays
    yield* quickSortHelper(arr, low, pivotIndex - 1);
    yield* quickSortHelper(arr, pivotIndex + 1, high);
  }
}

function* partition(arr, low, high) {
  // Choose rightmost element as pivot
  const pivot = arr[high];
  
  // Highlight the pivot
  yield { array: arr.slice(), highlights: [high] };
  
  // Index of smaller element
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    // Highlight current element being compared with pivot
    yield { array: arr.slice(), highlights: [j, high] };
    
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++;
      
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
      
      // Visualize the swap
      yield { array: arr.slice(), highlights: [i, j] };
    }
  }
  
  // Swap arr[i+1] and arr[high] (put the pivot in its correct position)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  // Visualize the final pivot placement
  yield { array: arr.slice(), highlights: [i + 1, high] };
  
  return i + 1; // Return the pivot index
}
