const countdownEl = document.getElementById("countdown");

let time = 4 * 24 * 60 * 60; // 4 days in seconds

setInterval(() => {
  let days = Math.floor(time / (24 * 3600));
  let hours = Math.floor((time % (24 * 3600)) / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  countdownEl.innerText =
    `${days} Days ${hours} Hour ${minutes} Min ${seconds} Sec`;

  time--;
}, 1000);
