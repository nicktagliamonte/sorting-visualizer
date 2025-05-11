import { drawBars } from "./utils/drawBars.js";

// Algorithm configuration with all metadata in one place
const algorithmConfig = {
  // Regular sorts
  bubbleSort: {
    import: () => import("./algorithms/bubbleSort.js"),
    size: 64,
    info: "Simple comparison-based algorithm with O(n²) time complexity.",
    type: "regular"
  },
  selectionSort: {
    import: () => import("./algorithms/selectionSort.js"),
    size: 128,
    info: "Simple comparison-based algorithm with O(n²) time complexity in all cases.",
    type: "regular"
  },
  insertionSort: {
    import: () => import("./algorithms/insertionSort.js"),
    size: 64,
    info: "Efficient for small data sets with O(n²) average time complexity.",
    type: "regular"
  },
  cocktailShakerSort: {
    import: () => import("./algorithms/cocktailShakerSort.js"),
    size: 128,
    info: "Variation of bubble sort that sorts in both directions. Still O(n²) complexity.",
    type: "regular"
  },
  combSort: {
    import: () => import("./algorithms/combSort.js"),
    size: 128,
    info: "Improvement over bubble sort with O(n²/2ᵏ) average complexity.",
    type: "regular"
  },
  gnomeSort: {
    import: () => import("./algorithms/gnomeSort.js"),
    size: 128,
    info: "Simple sorting algorithm similar to insertion sort but moves elements back one at a time.",
    type: "regular"
  },
  oddEvenSort: {
    import: () => import("./algorithms/oddEvenSort.js"),
    size: 128,
    info: "Parallel version of bubble sort with O(n²) worst-case complexity.",
    type: "regular"
  },
  bitonicSort: {
    import: () => import("./algorithms/bitonicSort.js"),
    size: 256,
    info: "Parallel algorithm with O(log² n) complexity requiring array length to be a power of 2.",
    type: "regular"
  },
  timSort: {
    import: () => import("./algorithms/timSort.js"),
    size: 256,
    info: "Hybrid stable sorting algorithm derived from merge sort and insertion sort. O(n log n) complexity.",
    type: "regular"
  },
  mergeSort: {
    import: () => import("./algorithms/mergeSort.js"),
    size: 256,
    info: "Divide and conquer algorithm with O(n log n) complexity and stable sorting.",
    type: "regular"
  },
  quickSort: {
    import: () => import("./algorithms/quickSort.js"),
    size: 256,
    info: "Efficient divide and conquer with O(n log n) average case but O(n²) worst case.",
    type: "regular"
  },
  heapSort: {
    import: () => import("./algorithms/heapSort.js"),
    size: 256,
    info: "Comparison-based algorithm using binary heap data structure. O(n log n) complexity.",
    type: "regular"
  },
  shellSort: {
    import: () => import("./algorithms/shellSort.js"),
    size: 256,
    info: "Generalization of insertion sort that allows exchange of items far apart. O(n log² n) complexity.",
    type: "regular"
  },
  radixSort: {
    import: () => import("./algorithms/radixSort.js"),
    size: 256,
    info: "Non-comparative integer sorting algorithm with O(nk) complexity where k is the key size.",
    type: "regular"
  },
  countingSort: {
    import: () => import("./algorithms/countingSort.js"),
    size: 256,
    info: "Integer sorting algorithm with O(n+k) complexity where k is the range of input.",
    type: "regular"
  },
  bucketSort: {
    import: () => import("./algorithms/bucketSort.js"),
    size: 256,
    info: "Distribution sort that distributes elements into buckets then sorts each bucket.",
    type: "regular"
  },
  patienceSort: {
    import: () => import("./algorithms/patienceSort.js"),
    size: 256,
    info: "Card game-based sorting algorithm that builds piles like in the Patience (Solitaire) card game.",
    type: "regular"
  },
  flashSort: {
    import: () => import("./algorithms/flashSort.js"),
    size: 256,
    info: "Distribution sort with O(n) average complexity but requires O(n) extra space.",
    type: "regular"
  },
  
  // Joke sorts
  bogoSort: {
    import: () => import("./algorithms/bogoSort.js"),
    size: 6,
    info: "JOKE SORT: Randomly shuffles the array until it happens to be sorted. O(n × n!) complexity!",
    type: "joke"
  },
  bozoSort: {
    import: () => import("./algorithms/bozoSort.js"),
    size: 8,
    info: "JOKE SORT: Even worse than BogoSort - randomly swaps two elements at a time.",
    type: "joke"
  },
  stoogeSort: {
    import: () => import("./algorithms/stoogeSort.js"),
    size: 24,
    info: "JOKE SORT: Recursively sorts first 2/3, last 2/3, then first 2/3 again. O(n^(log 3/log 1.5)) complexity.",
    type: "joke"
  },
  sleepSort: {
    import: () => import("./algorithms/sleepSort.js"),
    size: 4,
    info: "JOKE SORT: Creates a separate 'thread' for each element and sleeps proportionally to its value.",
    type: "joke"
  },
  pancakeSort: {
    import: () => import("./algorithms/pancakeSort.js"),
    size: 32,
    info: "JOKE SORT: Sorts by repeatedly flipping elements like pancakes. O(n²) complexity.",
    type: "joke"
  },
  spaghettiSort: {
    import: () => import("./algorithms/spaghettiSort.js"),
    size: 64,
    info: "JOKE SORT: Physical visualization of counting sort using spaghetti of different lengths.",
    type: "joke"
  }
};

// Load all algorithms using dynamic imports
let algorithms = {};
let array = [];
let sortedArray = []; // Store the final sorted array for verification
let iterator = null;
let intervalId = null;
let selectedAlgorithm = "bubbleSort";
let sortingComplete = false;
let sortingSuccessful = false;
let isVerifying = false; // Flag to prevent array reset during verification

// Function to get query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    mode: params.get("mode") || "light", // Default to light mode
  };
}

// Apply the mode based on the query parameter
function applyMode(mode) {
  const body = document.body;
  if (mode === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
}

// Initialize with the default algorithm
async function initializeAlgorithms() {
  // Load the default algorithm initially
  const defaultModule = await algorithmConfig[selectedAlgorithm].import();
  algorithms[selectedAlgorithm] = defaultModule[selectedAlgorithm];
  
  // Load other algorithms on demand when selected
  const algorithmSelect = document.getElementById("algorithmSelect");
  
  // Get regular sorts, ensuring bubbleSort is first
  const regularSorts = Object.keys(algorithmConfig)
    .filter(key => algorithmConfig[key].type === "regular");
  
  // Move bubbleSort to the front of the array
  if (regularSorts.includes("bubbleSort")) {
    // Remove bubbleSort from its current position
    regularSorts.splice(regularSorts.indexOf("bubbleSort"), 1);
    // Add it to the beginning
    regularSorts.unshift("bubbleSort");
  }
  
  // Sort the remaining regular sorts (everything after bubbleSort)
  const sortedRegularSorts = ["bubbleSort", 
    ...regularSorts.filter(sort => sort !== "bubbleSort").sort()
  ];
    
  const jokeSorts = Object.keys(algorithmConfig)
    .filter(key => algorithmConfig[key].type === "joke")
    .sort();
    
  // Organize the dropdown with regular sorts first, then joke sorts
  algorithmSelect.innerHTML = "";
  
  // Add regular sorts
  const regularGroup = document.createElement("optgroup");
  regularGroup.label = "Regular Sorts";
  sortedRegularSorts.forEach(algo => {
    const option = document.createElement("option");
    option.value = algo;
    option.textContent = toTitleCase(algo);
    regularGroup.appendChild(option);
  });
  algorithmSelect.appendChild(regularGroup);
  
  // Add joke sorts
  const jokeGroup = document.createElement("optgroup");
  jokeGroup.label = "Joke Sorts";
  jokeSorts.forEach(algo => {
    const option = document.createElement("option");
    option.value = algo;
    option.textContent = toTitleCase(algo);
    option.className = "joke-sort";
    jokeGroup.appendChild(option);
  });
  algorithmSelect.appendChild(jokeGroup);
  
  // Set the default selected algorithm
  algorithmSelect.value = selectedAlgorithm;
}

function toTitleCase(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

async function getAlgorithmFunction() {
  // Load the algorithm if it hasn't been loaded yet
  if (!algorithms[selectedAlgorithm]) {
    try {
      const module = await algorithmConfig[selectedAlgorithm].import();
      algorithms[selectedAlgorithm] = module[selectedAlgorithm];
    } catch (error) {
      console.error(`Failed to load ${selectedAlgorithm}:`, error);
      return algorithms["bubbleSort"] || (() => []);
    }
  }
  return algorithms[selectedAlgorithm] || algorithms["bubbleSort"];
}

function resetArray(size) {
  // Don't reset if we're in the middle of verification
  if (isVerifying) return;
  
  const arrSize = size || algorithmConfig[selectedAlgorithm]?.size || 50;
  array = Array.from(
    { length: arrSize },
    () => Math.floor(Math.random() * 100) + 10
  );
  sortedArray = []; // Clear the sorted array
  drawBars(array);
  iterator = null;
}

// Helper function to check if array is sorted
function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i+1]) {
      return false;
    }
  }
  return true;
}

// Function to verify sorting with visualization
function* verifySorting(arr) {
  // Make a copy of the array to avoid any changes to the original
  const arrToVerify = [...arr];
  
  for (let i = 0; i < arrToVerify.length - 1; i++) {    
    // If out of order, we've found a failure
    if (arrToVerify[i] > arrToVerify[i+1]) {
      // Mark the failure point
      yield { array: arrToVerify, highlights: [i, i+1], active: null };
      return false;
    }
  }
  
  // Array is sorted - highlight all elements
  yield { array: arrToVerify, highlights: Array.from({length: arrToVerify.length}, (_, i) => i) };
  return true;
}

async function step() {
  if (!iterator) {
    const sortFunction = await getAlgorithmFunction();
    iterator = sortFunction([...array]); // Use a copy of the array
  }
  
  const { value, done } = iterator.next();
  
  if (!done && value) {
    if (typeof value.then === 'function') {
      // If value is a Promise (for parallel sorts)
      value.then((resolved) => {
        if (resolved && resolved.array) {
          drawBars(resolved.array, resolved.highlights, resolved.active);
          
          // Save the latest state
          if (resolved.array) {
            sortedArray = [...resolved.array];
          }
        }
        clearInterval(intervalId);
        intervalId = null;
      });
    } else {
      drawBars(value.array, value.highlights, value.active);
      
      // Save the latest state
      if (value.array) {
        sortedArray = [...value.array];
      }
    }
  } else {
    // Algorithm is done, verify the result
    clearInterval(intervalId);
    intervalId = null;
    
    // Begin verification process
    if (!sortingComplete && !isVerifying) {
      sortingComplete = true;
      isVerifying = true; // Set flag to prevent array reset
      
      // Start verification with the final sorted array
      const verificationIterator = verifySorting(sortedArray);
      
      // Run the verification with a slight delay for visualization
      const verificationInterval = setInterval(() => {
        const verificationStep = verificationIterator.next();
        
        if (!verificationStep.done) {
          // Show the verification progress
          const { value } = verificationStep;
          drawBars(value.array, value.highlights, value.active);
        } else {
          // Verification complete
          clearInterval(verificationInterval);
          sortingSuccessful = verificationStep.value;
          isVerifying = false; // Clear verification flag
          
          // Update UI based on sorting result
          document.getElementById("playPauseBtn").textContent = sortingSuccessful ? 
            "Reset & Play" : "Try Again";
          
          // Show success/failure message
          const resultMessage = document.getElementById("sortingResult");
          if (resultMessage) {
            if (sortingSuccessful) {
              resultMessage.textContent = "Sorting Successful! ✓";
              resultMessage.className = "success";
            } else {
              resultMessage.textContent = "Sorting Failed! ✗";
              resultMessage.className = "error";
            }
            resultMessage.style.display = "block";
          }
        }
      }, 50); // Slower speed for verification for better visibility
    }
  }
}

// Function to get current speed from slider
function getCurrentSpeed() {
  const speedSlider = document.getElementById("speedSlider");
  // Invert the slider value to get appropriate delay (low value = fast speed)
  return 121 - parseInt(speedSlider.value || 90); // Default to 90 if no value
}

// Event listeners
document.addEventListener("DOMContentLoaded", async () => {
  const { mode } = getQueryParams();
  applyMode(mode);

  await initializeAlgorithms();
  resetArray();
  
  document.getElementById("algorithmSelect").addEventListener("change", async (e) => {
    selectedAlgorithm = e.target.value;
    const size = algorithmConfig[selectedAlgorithm]?.size || 50;
    
    // Display algorithm info/disclaimer
    const infoElement = document.getElementById("algorithmInfo");
    if (infoElement) {
      infoElement.textContent = algorithmConfig[selectedAlgorithm]?.info || 
        "No information available for this algorithm.";
      
      // Add warning class for joke sorts
      if (algorithmConfig[selectedAlgorithm]?.type === "joke") {
        infoElement.className = "warning";
      } else {
        infoElement.className = "";
      }
    }
    
    resetArray(size);
  });
  
  document.getElementById("playPauseBtn").addEventListener("click", async () => {
    // Don't respond to clicks during verification
    if (isVerifying) return;
    
    // If sorting is complete, reset first then play again
    if (sortingComplete) {
      resetArray();
      sortingComplete = false;
      sortingSuccessful = false;
      // Hide the result message
      const resultMessage = document.getElementById("sortingResult");
      if (resultMessage) {
        resultMessage.style.display = "none";
      }
      document.getElementById("playPauseBtn").textContent = "Pause";
      
      // Initialize new iterator with the fresh array and start playing
      const sortFunction = await getAlgorithmFunction();
      iterator = sortFunction([...array]);
      
      // Use current slider value for speed
      intervalId = setInterval(step, getCurrentSpeed());
      return;
    }
    
    if (!iterator) {
      const sortFunction = await getAlgorithmFunction();
      iterator = sortFunction([...array]);
    }
    
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      document.getElementById("playPauseBtn").textContent = "Play";
    } else {
      // Use current slider value for speed
      intervalId = setInterval(step, getCurrentSpeed());
      document.getElementById("playPauseBtn").textContent = "Pause";
    }
  });
  
  document.getElementById("stepBtn").addEventListener("click", step);
  
  document.getElementById("resetBtn").addEventListener("click", () => {
    // Don't respond to clicks during verification
    if (isVerifying) return;
    
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById("playPauseBtn").textContent = "Play";
    sortingComplete = false;
    sortingSuccessful = false;
    resetArray();
    
    // Hide the result message
    const resultMessage = document.getElementById("sortingResult");
    if (resultMessage) {
      resultMessage.style.display = "none";
    }
  });
  
  // Speed control
  const speedSlider = document.getElementById("speedSlider");
  speedSlider.addEventListener("input", (e) => {
    if (intervalId) {
      clearInterval(intervalId);
      // Use current slider value
      const speed = 121 - parseInt(e.target.value);
      intervalId = setInterval(step, speed);
    }
  });
});

// Add styling for joke sorts in the dropdown
const style = document.createElement('style');
style.textContent = `
  .joke-sort {
    color: #c62828;
    font-style: italic;
  }
`;
document.head.appendChild(style);
