export function* bogoSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // For sanity, limit the maximum number of shuffles
  const MAX_SHUFFLES = 100;
  let shuffleCount = 0;
  
  // Continue until the array is sorted or we reach the maximum shuffles
  while (!isSorted(a) && shuffleCount < MAX_SHUFFLES) {
    // Shuffle the entire array
    shuffle(a);
    shuffleCount++;
    
    // Select a random element as active, the rest as highlights
    const activeIndex = Math.floor(Math.random() * n);
    const highlights = [];
    for (let i = 0; i < n; i++) {
      if (i !== activeIndex) highlights.push(i);
    }
    
    // Yield the new state with random active element to visualize the chaos
    yield { array: a.slice(), highlights, active: activeIndex };
    
    // If we're about to hit the limit, add a message in the array
    if (shuffleCount === MAX_SHUFFLES - 1) {
      // Signal that we're giving up by making all values the same
      const message = Array(n).fill(50); // A visible but neutral height
      yield { array: message, highlights, active: activeIndex };
      
      // Then restore the last shuffled state
      yield { array: a.slice(), highlights: [] };
    }
  }
  
  // Final state - no highlights
  yield { array: a.slice(), highlights: [] };
  
  return a;
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check if the array is sorted
function isSorted(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
