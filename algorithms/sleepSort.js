export function* sleepSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Create a new array to hold sorted elements
  const sorted = [];
  
  // Highlight each element being "put to sleep"
  for (let i = 0; i < n; i++) {
    yield { array: a.slice(), highlights: [i] };
  }
  
  // Track which elements are "sleeping" vs "processed"
  const processed = new Array(n).fill(false);
  
  // Get the wake-up time for each element
  const wakeUpTimes = a.map(val => val * 20); // Scale by element value
  
  // Keep track of time
  let currentTime = 0;
  
  // Simulate the time passing - one frame at a time
  while (sorted.length < n) {
    currentTime += 5; // Advance time in small increments
    
    // Check if any elements should wake up at this time
    let wokeUp = false;
    
    for (let i = 0; i < n; i++) {
      if (!processed[i] && wakeUpTimes[i] <= currentTime) {
        // This element is waking up
        processed[i] = true;
        sorted.push(a[i]);
        wokeUp = true;
        
        // Create current visualization state
        const currentState = new Array(n);
        
        // Fill sorted elements first
        for (let j = 0; j < sorted.length; j++) {
          currentState[j] = sorted[j];
        }
        
        // Fill unsorted elements after
        let remainingIdx = sorted.length;
        for (let j = 0; j < n; j++) {
          if (!processed[j]) {
            currentState[remainingIdx++] = a[j];
          }
        }
        
        // Highlight the element that just woke up
        yield { array: currentState, highlights: [sorted.length - 1] };
        
        // Only wake up one element per time step for better visualization
        break;
      }
    }
    
    // If nothing woke up but we still have sleeping elements, show them
    if (!wokeUp && sorted.length < n && currentTime % 20 === 0) {
      const currentState = new Array(n);
      
      // Fill sorted elements first
      for (let j = 0; j < sorted.length; j++) {
        currentState[j] = sorted[j];
      }
      
      // Fill unsorted elements after
      let remainingIdx = sorted.length;
      for (let j = 0; j < n; j++) {
        if (!processed[j]) {
          currentState[remainingIdx++] = a[j];
        }
      }
      
      // Highlight the sleeping elements
      const highlights = [];
      for (let j = 0; j < n; j++) {
        if (!processed[j]) {
          highlights.push(sorted.length + highlights.length);
        }
      }
      
      yield { array: currentState, highlights };
    }
  }
  
  // Final state - show all elements sorted without highlighting
  yield { array: sorted, highlights: [] };
  
  return sorted;
}
