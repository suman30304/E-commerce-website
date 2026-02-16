const countdownEl = document.getElementById("countdown");

let time = 4 * 24 * 60 * 60; // 4 days in seconds

// Get all number spans
const timeSpans = countdownEl.querySelectorAll("span");

setInterval(() => {

  let days = Math.floor(time / (24 * 3600));
  let hours = Math.floor((time % (24 * 3600)) / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  // Update ONLY numbers inside spans
  timeSpans[0].innerText = String(days).padStart(2, '0');
  timeSpans[1].innerText = String(hours).padStart(2, '0');
  timeSpans[2].innerText = String(minutes).padStart(2, '0');
  timeSpans[3].innerText = String(seconds).padStart(2, '0');

  time--;

}, 1000);

