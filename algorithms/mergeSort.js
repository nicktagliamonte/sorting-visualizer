export function* mergeSort(arr) {
  // Create a copy of the array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Start the recursive merge sort
  yield* mergeSortHelper(a, 0, n - 1);
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

function* mergeSortHelper(arr, left, right) {
  if (left < right) {
    // Find the middle point
    const mid = Math.floor((left + right) / 2);
    
    // Visualize the division with active element at the midpoint
    const leftHighlights = [];
    for (let i = left; i < mid; i++) leftHighlights.push(i);
    yield { array: arr.slice(), highlights: leftHighlights, active: mid };
    
    // Sort first half
    yield* mergeSortHelper(arr, left, mid);
    
    // Visualize second half with active element at the midpoint
    const rightHighlights = [];
    for (let i = mid + 1; i <= right; i++) rightHighlights.push(i);
    yield { array: arr.slice(), highlights: rightHighlights, active: mid };
    
    // Sort second half
    yield* mergeSortHelper(arr, mid + 1, right);
    
    // Merge the sorted halves
    yield* merge(arr, left, mid, right);
  }
}

function* merge(arr, left, mid, right) {
  // Create temporary arrays
  const leftSize = mid - left + 1;
  const rightSize = right - mid;
  
  const leftArray = new Array(leftSize);
  const rightArray = new Array(rightSize);
  
  // Copy data to temporary arrays
  for (let i = 0; i < leftSize; i++) {
    leftArray[i] = arr[left + i];
  }
  for (let i = 0; i < rightSize; i++) {
    rightArray[i] = arr[mid + 1 + i];
  }
  
  // Merge the temporary arrays back into arr[left...right]
  let i = 0;  // Initial index of first subarray
  let j = 0;  // Initial index of second subarray
  let k = left;  // Initial index of merged subarray
  
  while (i < leftSize && j < rightSize) {
    // Compare elements from both arrays - highlight both elements being compared
    yield { array: arr.slice(), highlights: [left + i, mid + 1 + j], active: k };
    
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    
    // Highlight the position where element was placed as active
    yield { array: arr.slice(), highlights: [], active: k };
    k++;
  }
  
  // Copy the remaining elements of leftArray, if any
  while (i < leftSize) {
    arr[k] = leftArray[i];
    // Highlight position being filled
    yield { array: arr.slice(), highlights: [], active: k };
    i++;
    k++;
  }
  
  // Copy the remaining elements of rightArray, if any
  while (j < rightSize) {
    arr[k] = rightArray[j];
    // Highlight position being filled
    yield { array: arr.slice(), highlights: [], active: k };
    j++;
    k++;
  }
}
