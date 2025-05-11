export function* timSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Define the minimum run size
  // TimSort works better with runs of 32-64 elements
  const MIN_RUN = 32;
  
  // Step 1: Sort individual subarrays of size MIN_RUN using insertion sort
  for (let start = 0; start < n; start += MIN_RUN) {
    // Calculate end of run (either MIN_RUN or end of array)
    const end = Math.min(start + MIN_RUN - 1, n - 1);
    
    // Highlight the current run
    const runHighlights = [];
    for (let i = start + 1; i <= end; i++) {
      runHighlights.push(i);
    }
    yield { array: a.slice(), highlights: runHighlights, active: start };
    
    // Insertion sort for this run
    yield* insertionSortRun(a, start, end);
  }
  
  // Step 2: Merge sorted runs
  // Size of the runs to be merged increases by powers of 2
  for (let size = MIN_RUN; size < n; size = size * 2) {
    // Pick starting points of merges (at size intervals)
    for (let left = 0; left < n; left += size * 2) {
      // Calculate mid and right
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + size * 2 - 1, n - 1);
      
      // Highlight the subarrays being merged
      const leftHighlights = [];
      const rightHighlights = [];
      
      for (let i = left; i <= mid; i++) {
        leftHighlights.push(i);
      }
      
      for (let i = mid + 1; i <= right; i++) {
        rightHighlights.push(i);
      }
      
      // Show both subarrays with the midpoint as active
      yield { array: a.slice(), highlights: [...leftHighlights, ...rightHighlights], active: mid };
      
      // Merge subarrays from left to mid and mid+1 to right
      if (mid < right) {
        yield* merge(a, left, mid, right);
      }
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// Helper function for insertion sort on a segment of the array
function* insertionSortRun(a, start, end) {
  for (let i = start + 1; i <= end; i++) {
    const key = a[i];
    let j = i - 1;
    
    // Mark key as active
    yield { array: a.slice(), highlights: [], active: i };
    
    // Move elements greater than key to one position ahead
    while (j >= start && a[j] > key) {
      a[j + 1] = a[j];
      // Highlight the position being changed, key position as active
      yield { array: a.slice(), highlights: [j], active: i };
      j--;
    }
    
    a[j + 1] = key;
    // Highlight the position where the key is inserted
    yield { array: a.slice(), highlights: [], active: j + 1 };
  }
}

// Helper function to merge two subarrays
function* merge(a, left, mid, right) {
  // Calculate sizes of two subarrays to be merged
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temporary arrays
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);
  
  // Copy data to temporary arrays
  for (let i = 0; i < n1; i++) {
    leftArray[i] = a[left + i];
  }
  for (let j = 0; j < n2; j++) {
    rightArray[j] = a[mid + 1 + j];
  }
  
  // Merge the temporary arrays back
  let i = 0, j = 0, k = left;
  
  while (i < n1 && j < n2) {
    // Highlight elements being compared
    yield { array: a.slice(), highlights: [left + i, mid + 1 + j], active: k };
    
    if (leftArray[i] <= rightArray[j]) {
      a[k] = leftArray[i];
      i++;
    } else {
      a[k] = rightArray[j];
      j++;
    }
    
    // Highlight the current position being filled
    yield { array: a.slice(), highlights: [], active: k };
    k++;
  }
  
  // Copy remaining elements of leftArray (if any)
  while (i < n1) {
    a[k] = leftArray[i];
    yield { array: a.slice(), highlights: [], active: k };
    i++;
    k++;
  }
  
  // Copy remaining elements of rightArray (if any)
  while (j < n2) {
    a[k] = rightArray[j];
    yield { array: a.slice(), highlights: [], active: k };
    j++;
    k++;
  }
}
