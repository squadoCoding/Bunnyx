const hContainer = document.getElementById("hours");
const mContainer = document.getElementById("minutes");
const openClockBtn = document.getElementById("openClock");
const closeClockBtn = document.getElementById("closeClock");
const clock = document.getElementById("clock");
const openAlarms = document.getElementById("openAlarms");
const alarmsContainer = document.getElementById("alarms");

const alarms = [];

let time = new Date();

hContainer.innerText =
  time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
mContainer.innerText = time.getMinutes();
mContainer.innerText += time.getHours() > 12 ? "pm" : "am";

setInterval(() => {
  time = new Date();

  hContainer.innerText =
    time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
  mContainer.innerText = time.getMinutes();
  mContainer.innerText += time.getHours() > 12 ? "pm" : "am";
}, 1000);

const handleAlarms = () => {};

openClockBtn.addEventListener("click", () => {
  mic.classList.add("openClock");
});
closeClockBtn.addEventListener("click", () => {
  mic.classList.remove("openClock");
});
openAlarms.addEventListener("click", () => {
  if (alarmsContainer.classList.contains("invisible")) {
    alarmsContainer.classList.remove("invisible");
    handleAlarms();
  } else {
    alarmsContainer.classList.add("invisible");
  }
});
