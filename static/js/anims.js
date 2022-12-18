const main = document.querySelector("main");
const mic = document.getElementById("mic");

setInterval(() => {
  if (
    !main.classList.contains("speaking") &&
    !main.classList.contains("shutDown")
  ) {
    main.classList.add("blink");
    setTimeout(() => {
      main.classList.remove("blink");
    }, 1000);
  }
}, 5000);
