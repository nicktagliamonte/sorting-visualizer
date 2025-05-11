export function drawBars(array, highlights = [], activeIndex = null) {
  const barsContainer = document.getElementById("bars");
  barsContainer.innerHTML = ""; // Clear existing bars

  const containerWidth = barsContainer.offsetWidth;
  const barWidth = Math.floor(containerWidth / array.length); // Dynamically calculate bar width

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth - 1}px`; 
    bar.style.margin = "0 1px"; // Add spacing between bars
    
    // Determine the appropriate color class
    if (index === activeIndex) {
      bar.className = "bar active";
    } else if (highlights && highlights.includes(index)) {
      bar.className = "bar comparison";
    } else {
      bar.className = "bar";
    }
    
    bar.style.display = "inline-block";
    bar.style.verticalAlign = "bottom";
    barsContainer.appendChild(bar);
  });
}
