export function* patienceSort(arr) {
  const a = arr.slice();
  const n = a.length;
  
  // Create piles for sorting (each pile is a sorted stack)
  const piles = [];
  
  // Step 1: Distribution phase - place each card into a pile
  for (let i = 0; i < n; i++) {
    const card = a[i];
    
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
    
    // Visualize current state after each card placement
    yield { array: a.slice(), highlights: [i] };
  }
  
  // Step 2: Collection phase - merge the piles into the final sorted array
  let sortedIndex = 0;
  
  while (piles.some(pile => pile.length > 0)) {
    // Find the pile with the smallest top card
    let minPileIndex = -1;
    let minValue = Infinity;
    
    for (let i = 0; i < piles.length; i++) {
      if (piles[i].length > 0 && piles[i][piles[i].length - 1] < minValue) {
        minPileIndex = i;
        minValue = piles[i][piles[i].length - 1];
      }
    }
    
    if (minPileIndex !== -1) {
      // Take the smallest card and add it to the result
      a[sortedIndex] = piles[minPileIndex].pop();
      yield { array: a.slice(), highlights: [sortedIndex] };
      sortedIndex++;
    }
  }
  
  // Final state
  yield { array: a.slice(), highlights: [] };
}
