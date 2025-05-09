export function* gnomeSort(arr) {
  const a = arr.slice();
  let index = 0;

  while (index < a.length) {
    // If we are at the start or element is in correct order, move forward
    if (index === 0 || a[index - 1] <= a[index]) {
      index++;
    } else {
      // Swap the elements if they are out of order
      [a[index - 1], a[index]] = [a[index], a[index - 1]];
      index--; // Move back to previous element
    }

    // Yield array state for visualization
    yield { array: a.slice(), highlights: [index - 1, index] };
  }
}
