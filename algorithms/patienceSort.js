export function* patienceSort(arr) {
  const a = arr.slice();
  const n = a.length;
  
  // Create piles for sorting (each pile is a sorted stack)
  const piles = [];
  
  // Initial state
  yield { array: a.slice(), highlights: [] };
  
  // Create a stable visualization array that will be updated
  // This prevents flickering by maintaining consistent heights
  const visualArray = a.slice();
  
  // Step 1: Distribution phase - place each card into a pile
  for (let i = 0; i < n; i++) {
    const card = a[i];
    
    // Mark the current card as active without changing the array
    yield { array: visualArray, highlights: [], active: i };
    
    // Find the leftmost pile whose top card is greater than the current card
    let pileIndex = -1;
    
    for (let j = 0; j < piles.length; j++) {
      if (piles[j][piles[j].length - 1] > card) {
        pileIndex = j;
        break;
      }
    }
    
    // If no suitable pile found, create a new one
    if (pileIndex === -1) {
      piles.push([card]);
    } else {
      // Place the card on this pile
      piles[pileIndex].push(card);
    }
    
    // Instead of completely replacing the visualization,
    // gently update the existing array to show pile structure
    updateVisualizationArray(visualArray, piles);
    
    // Highlight the pile where the card was placed
    const highlights = pileIndex !== -1 
      ? [pileIndex] 
      : [piles.length - 1]; // New pile
    
    yield { array: visualArray.slice(), highlights, active: i };
  }
  
  // Step 2: Collection phase - merge the piles into the final sorted array
  const result = new Array(n);
  let sortedIndex = 0;
  
  // Create a smooth transition to collection phase
  yield { array: visualArray.slice(), highlights: [], active: null };
  
  while (piles.some(pile => pile.length > 0)) {
    // Find the pile with the smallest top card
    let minPileIndex = -1;
    let minValue = Infinity;
    
    for (let i = 0; i < piles.length; i++) {
      if (piles[i].length > 0) {
        const topCard = piles[i][piles[i].length - 1];
        if (topCard < minValue) {
          minPileIndex = i;
          minValue = topCard;
        }
      }
    }
    
    if (minPileIndex !== -1) {
      // Take the smallest card from its pile
      const smallestCard = piles[minPileIndex].pop();
      result[sortedIndex] = smallestCard;
      
      // Gently update the visualization array
      updateVisualizationArray(visualArray, piles);
      
      // Add the collected cards to the visualization
      for (let i = 0; i <= sortedIndex; i++) {
        visualArray[i] = result[i];
      }
      
      // Highlight the pile where the card came from and mark the position in result as active
      yield { array: visualArray.slice(), highlights: [minPileIndex], active: sortedIndex };
      
      sortedIndex++;
    }
  }
  
  // Final state - show the fully sorted array with a smooth transition
  const sortedArray = result.filter(val => val !== undefined);
  // Pad with remaining values from the original array to maintain stability
  for (let i = sortedArray.length; i < n; i++) {
    sortedArray.push(visualArray[i]);
  }
  
  // Final sorted state
  yield { array: sortedArray, highlights: [] };
  
  return sortedArray;
}

// Helper function to update the visualization array without completely replacing it
function updateVisualizationArray(visualArray, piles) {
  // This function updates the existing array rather than creating a new one
  // to minimize visual disruption and flickering
  
  // First, flatten the piles into a single array
  const flattenedPiles = [];
  for (const pile of piles) {
    for (const card of pile) {
      flattenedPiles.push(card);
    }
  }
  
  // Then update the visualization array, preserving heights where possible
  for (let i = 0; i < visualArray.length; i++) {
    if (i < flattenedPiles.length) {
      visualArray[i] = flattenedPiles[i];
    }
    // Leave the rest of the array as is to avoid sudden changes
  }
}
