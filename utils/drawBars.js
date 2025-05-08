export function drawBars(array, highlights = []) {
  const barsContainer = document.getElementById("bars");
  barsContainer.innerHTML = ""; // Clear existing bars

  const containerWidth = barsContainer.offsetWidth;
  const barWidth = Math.floor(containerWidth / array.length); // Dynamically calculate bar width

  array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth - 1}px`; 
    bar.style.margin = "0 1px"; // Add spacing between bars
    bar.style.backgroundColor = highlights.includes(index) ? "red" : "blue";
    bar.style.display = "inline-block";
    bar.style.verticalAlign = "bottom";
    barsContainer.appendChild(bar);
  });
}
