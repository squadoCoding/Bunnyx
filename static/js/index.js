/*
    ! => Section
    ? => decleration
    * => logic
*/

//! html elements
const listenBunnyxBtn = document.getElementById("listenBunnyx"); //? Bunnyx will listen to me by clicking this button
const stopListeningBunnyxBtn = document.getElementById("stopListeningBunnyx"); //? Bunnyx will stop listening to me after clicking this button

//! Giving my Bunnyx the ability to listen to me (speach recognition)
const ears = window.SpeachRecognition || window.webkitSpeechRecognition;
const bunnyxEars = new ears(); //? ears of Bunnyx

//* when I speak something
bunnyxEars.onstart = () => {
  console.log("Listening...");
};
//* when Bunnxy will listen my command I will give it to the command evectior function
bunnyxEars.onresult = (event) => {
  const current = event.resultIndex; //? index of our spoken text
  const command = event.results[current][0].transcript; //? command I have given
  console.log(command);
  bunnyxSpeak(command);
};
//* when I am not speaking any thing
bunnyxEars.onend = () => {
  console.log("stopped listening.");
};

//? functions to start and stop Listening of Bunnyx
const earsUp = () => {
  bunnyxEars.start();
};
const earsDown = () => {
  bunnyxEars.stop();
};

//* start or stop Bunnyx ears based on events
document.addEventListener("keydown", (e) => {
  //* Bunnyx will alse start listening on pressing 'B'
  if (e.key == "b" || e.key == "B") {
    earsUp();
  }
  //* Bunnyx will also stop listening on pressing 'S'
  else if (e.key == "s" || e.key == "S") {
    earsDown();
  }
});
listenBunnyxBtn.addEventListener("click", earsUp);
stopListeningBunnyxBtn.addEventListener("click", earsDown);

//! Adding speach to Bunnyx
//? Text to speach function
const bunnyxSpeak = (message, volume) => {
  const bunnyxSpeach = new SpeechSynthesisUtterance();
  const voices = speechSynthesis.getVoices();
  bunnyxSpeach.text = message;
  bunnyxSpeach.voice = voices[155];
  if (volume != null) {
    bunnyxSpeach.volume = volume;
  } else {
    bunnyxSpeach.volume = 1;
  }
  bunnyxSpeach.rate = 1.2;
  window.speechSynthesis.speak(bunnyxSpeach);
};
//* Setting voice to female at the firstTime
window.onload = () => {
  bunnyxSpeak(" ");
};
