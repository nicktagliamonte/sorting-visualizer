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
    
    // Mark root as active and the placement position as comparison
    yield { array: a.slice(), highlights: [i], active: 0 };
    
    // Call max heapify on the reduced heap
    yield* heapify(a, i, 0);
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// To heapify a subtree rooted with node i
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
  
  // Mark current node as active and its children as comparison elements
  const highlights = [];
  if (left < n) highlights.push(left);
  if (right < n) highlights.push(right);
  yield { array: arr.slice(), highlights, active: i };
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Visualize the swap with active and comparison elements
    yield { array: arr.slice(), highlights: [i], active: largest };
    
    // Recursively heapify the affected sub-tree
    yield* heapify(arr, n, largest);
  }
}
