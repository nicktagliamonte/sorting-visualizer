import { drawBars } from "./utils/drawBars.js";
import { bubbleSort } from "./algorithms/bubbleSort.js";
import { selectionSort } from "./algorithms/selectionSort.js";
import { flashSort } from "./algorithms/flashSort.js";

let array = [];
let iterator = null;
let intervalId = null;
let selectedAlgorithm = "bubbleSort";

const algorithmSizes = {
  bubbleSort: 64,
  selectionSort: 128,
  insertionSort: 64,
  cocktailShakerSort: 128,
  combSort: 128,
  gnomeSort: 128,
  oddEvenSort: 128,
  bitonicSort: 256,
  timSort: 256,
  bogoSort: 4,
  bozoSort: 4,
  stoogeSort: 8,
  sleepSort: 16,
  pancakeSort: 32,
  spaghettiSort: 32,
  mergeSort: 256,
  quickSort: 256,
  heapSort: 256,
  shellSort: 256,
  radixSort: 256,
  countingSort: 256,
  bucketSort: 256,
  bitonicMergeSort: 256,
  patienceSort: 256,
  flashSort: 256,
};

const algorithms = {
  bubbleSort,
  selectionSort,
  flashSort,
};

function getAlgorithmFunction() {
  return algorithms[selectedAlgorithm] || bubbleSort;
}

function resetArray(size) {
  const arrSize = size || algorithmSizes[selectedAlgorithm] || 50;
  array = Array.from(
    { length: arrSize },
    () => Math.floor(Math.random() * 100) + 10
  );
  drawBars(array);
  iterator = null;
}

function step() {
  if (!iterator) return;
  const { value, done } = iterator.next();
  if (!done && value) {
    drawBars(value.array, value.highlights);
  } else {
    clearInterval(intervalId);
    intervalId = null;
  }
}

document.getElementById("algorithmSelect").addEventListener("change", (e) => {
  selectedAlgorithm = e.target.value;
  const size = algorithmSizes[selectedAlgorithm] || 50; // Default size if not mapped
  resetArray(size);
});

document.getElementById("playPauseBtn").addEventListener("click", () => {
  if (!iterator) {
    iterator = getAlgorithmFunction()(array);
  }
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("playPauseBtn").textContent = "Play";
  } else {
    intervalId = setInterval(step, 10);
    document.getElementById("playPauseBtn").textContent = "Pause";
  }
});

document.getElementById("stepBtn").addEventListener("click", () => {
  if (!iterator) {
    iterator = getAlgorithmFunction()(array);
  }
  step();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  document.getElementById("playPauseBtn").textContent = "Play";
  resetArray();
});

// Add a slider for speed control
const speedSlider = document.getElementById("speedSlider");
speedSlider.addEventListener("input", (e) => {
  const speed = 121 - parseInt(e.target.value); // Invert the slider value
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = setInterval(step, speed);
  }
});

resetArray();
