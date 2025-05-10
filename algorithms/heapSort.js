export function* heapSort(arr) {
  // Create a copy of the array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Build max heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(a, n, i);
  }
  
  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [a[0], a[i]] = [a[i], a[0]];
    
    // Visualize the swap
    yield { array: a.slice(), highlights: [0, i] };
    
    // Call max heapify on the reduced heap
    yield* heapify(a, i, 0);
    
    // Show that we've placed one more element in its final position
    yield { array: a.slice(), highlights: [i] };
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function* heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // Visualize the comparison
  const highlights = [i];
  if (left < n) highlights.push(left);
  if (right < n) highlights.push(right);
  yield { array: arr.slice(), highlights };
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Visualize the swap
    yield { array: arr.slice(), highlights: [i, largest] };
    
    // Recursively heapify the affected sub-tree
    yield* heapify(arr, n, largest);
  }
}
