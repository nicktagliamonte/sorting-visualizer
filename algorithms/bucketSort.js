export function* bucketSort(arr) {
  // Make a copy of the original array
  const a = arr.slice();
  const n = a.length;
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Find min and max values to determine bucket range
  let minValue = a[0];
  let maxValue = a[0];
  for (let i = 1; i < n; i++) {
    if (a[i] < minValue) minValue = a[i];
    if (a[i] > maxValue) maxValue = a[i];
    
    // Highlight current element being examined for min/max
    yield { array: a.slice(), highlights: [], active: i };
  }
  
  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(n)) || 1; // Square root is a good default
  const buckets = Array(bucketCount).fill().map(() => []);
  const bucketRange = (maxValue - minValue) / bucketCount || 1;
  
  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    // Calculate bucket index
    const bucketIndex = Math.min(
      Math.floor((a[i] - minValue) / bucketRange),
      bucketCount - 1
    );
    
    buckets[bucketIndex].push(a[i]);
    
    // Mark current element as active while being placed into bucket
    const tempArr = new Array(n).fill(null);
    let position = 0;
    
    // Highlight all elements in the bucket where current element is being placed
    const highlights = [];
    
    for (let j = 0; j < bucketCount; j++) {
      for (let k = 0; k < buckets[j].length; k++) {
        tempArr[position] = buckets[j][k];
        if (j === bucketIndex) {
          highlights.push(position);
        }
        position++;
      }
      // Leave some visual separation between buckets
      position = Math.min(position + 1, n - 1);
    }
    
    // Fill remaining positions
    while (position < n) {
      tempArr[position] = minValue;
      position++;
    }
    
    yield { array: tempArr, highlights: highlights, active: i };
  }
  
  // Sort each bucket (using insertion sort)
  for (let b = 0; b < bucketCount; b++) {
    const bucket = buckets[b];
    
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      
      while (j >= 0 && bucket[j] > key) {
        bucket[j + 1] = bucket[j];
        j--;
        
        // Update visual representation during bucket sorting
        const tempArr = new Array(n).fill(null);
        let position = 0;
        
        for (let k = 0; k < bucketCount; k++) {
          for (let m = 0; m < buckets[k].length; m++) {
            tempArr[position] = buckets[k][m];
            position++;
          }
          // Leave some visual separation between buckets
          position = Math.min(position + 1, n - 1);
        }
        
        // Calculate positions for visualization
        let bucketStartPos = 0;
        for (let k = 0; k < b; k++) {
          bucketStartPos += buckets[k].length + 1;
        }
        
        // Highlight the element being compared and mark the key as active
        const keyPos = bucketStartPos + i;
        const comparePos = bucketStartPos + j + 1;
        
        yield { array: tempArr, highlights: [comparePos], active: keyPos };
      }
      
      bucket[j + 1] = key;
    }
  }
  
  // Recombine the buckets back into the original array
  let index = 0;
  for (let b = 0; b < bucketCount; b++) {
    for (let i = 0; i < buckets[b].length; i++) {
      a[index] = buckets[b][i];
      
      // Mark current element as active when being placed back into final array
      yield { array: a.slice(), highlights: [], active: index };
      
      index++;
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
  return a;
}
