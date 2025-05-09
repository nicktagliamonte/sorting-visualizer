export function* patienceSort(arr) {
  const a = arr.slice();
  const n = a.length;
  if (n <= 1) return;

  // Step 1: Setup for Patience Sort
  const piles = [];
  let stepCount = 0;

  // Step 2: Build piles by binary search insertion
  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = piles.length - 1;
    while (left <= right) {
      const mid = (left + right) >> 1;
      if (piles[mid][piles[mid].length - 1] < a[i]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    if (left < piles.length) {
      piles[left].push(a[i]);
    } else {
      piles.push([a[i]]);
    }
    // Only yield at the end of pile building for visualization
    if (i === n - 1) {
      yield { array: a.slice(), highlights: [] };
    }
  }

  // Step 3: Reconstruct sorted array by extracting smallest elements from piles
  let result = [];
  let sortedIndex = 0;
  const heap = new MinHeap();
  // Insert first element of each pile into the heap
  for (let i = 0; i < piles.length; i++) {
    if (piles[i].length > 0) {
      heap.insert({ value: piles[i].pop(), pileIndex: i });
    }
  }

  // Prepare a visualization array to update in place
  const visualArray = new Array(n);

  // Step 4: Build the sorted result array by extracting from the heap
  while (heap.size() > 0) {
    const { value, pileIndex } = heap.extractMin();
    visualArray[sortedIndex] = value;
    result.push(value);
    if (piles[pileIndex].length > 0) {
      heap.insert({ value: piles[pileIndex].pop(), pileIndex });
    }
    // Yield every 32 steps or at the end
    if (++stepCount % 1024 === 0 || sortedIndex === n - 1) {
      yield {
        array: visualArray.slice(),
        highlights: [sortedIndex],
      };
    }
    sortedIndex++;
  }
}
