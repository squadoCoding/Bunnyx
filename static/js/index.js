/*
    ! => Section
    ? => decleration
    * => logic
*/
// I have already declared main which is that <main> tag of our html in anims.js
//! html elements

//! Giving my Bunnyx the ability to listen to me (speach recognition)
const ears = window.SpeachRecognition || window.webkitSpeechRecognition;
const bunnyxEars = new ears(); //? ears of Bunnyx

bunnyxEars.continuous = true;

let stopRec = false; // if this variable will be true then only we will stop the voice recognition actually

//* when I speak something
bunnyxEars.onstart = () => {};
//* when Bunnxy will listen my command I will give it to the command evectior function
bunnyxEars.onresult = (event) => {
  const current = event.resultIndex; //? index of our spoken text
  const command = event.results[current][0].transcript; //? command I have given
  console.log(command);

  //* sending request to server to get the answer
  const ans = fetch(`/giveCmd`, {
    headers: {
      myCommand: command,
    },
  });
  ans
    .then((ansJson) => {
      return ansJson.json();
    })
    .then((finalAns) => {
      if (!finalAns.isCommand) {
        bunnyxSpeak(finalAns.ans);
      } else if (finalAns.isCommand) {
        if (finalAns.cmdType == "openWebsite") {
          bunnyxSpeak(finalAns.ans);
          window.open(finalAns.url);
        } else if (finalAns.cmdType == "speechRecOff") {
          bunnyxSpeak(finalAns.ans, true); //* this will is down the ears of bunnyx
          main.classList.add("shutDown");
        }
      }
    });
};
//* when I am not speaking any thing
bunnyxEars.onend = () => {
  if (!stopRec) {
    setTimeout(() => {
      earsUp();
    }, 500);
  }
};

//? functions to start and stop Listening of Bunnyx
const earsUp = () => {
  setTimeout(() => {
    bunnyxEars.start();
  }, 2000);
  stopRec = false;
  if (!mic.classList.contains("speakingMic")) {
    mic.classList.add("speakingMic");
  }
  main.classList.remove("shutDown");
};
const earsDown = (dontRemSpeakingMicClass) => {
  bunnyxEars.stop();
  if (!dontRemSpeakingMicClass) {
    mic.classList.remove("speakingMic");
  }
};

//* start or stop Bunnyx ears based on events
document.addEventListener("keydown", (e) => {
  //* Bunnyx will alse start listening on pressing 'B'
  if (e.key == "b" || e.key == "B") {
    earsUp();
  }
  //* Bunnyx will also stop listening on pressing 'S'
  else if (e.key == "s" || e.key == "S") {
    stopRec = true;
    earsDown();
  }
});
mic.addEventListener("click", () => {
  if (mic.classList.contains("speakingMic")) {
    stopRec = true;
    earsDown();
  } else {
    earsUp();
  }
});

//! Adding speach to Bunnyx
//? Text to speach function
const bunnyxSpeak = (message, shutDownAfterThis) => {
  const bunnyxSpeach = new SpeechSynthesisUtterance();
  const voices = speechSynthesis.getVoices();
  bunnyxSpeach.text = message;
  bunnyxSpeach.voice = voices[155];
  bunnyxSpeach.volume = 1;
  bunnyxSpeach.rate = 1.2;
  window.speechSynthesis.speak(bunnyxSpeach);

  //* stop bunnyx's listening when it's speaking
  if (shutDownAfterThis == true) {
    stopRec = true;
  }
  earsDown(true); //* down ears and don't remove the speaking mic class from mic
  //* if we have passed true for shutDownAfterThis variable it means that we want bunnyx just to speak this text and stop listening.
  main.classList.add("speaking");
  setTimeout(() => {
    main.classList.remove("speaking");
  }, message.split(" ").length * 400);
  let checkIsSpeakingOrNot = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(checkIsSpeakingOrNot);
      main.classList.remove("speaking");
      try {
        if (!shutDownAfterThis) {
          earsUp();
        } else {
          earsDown();
        }
        console.log("shutdown:", shutDownAfterThis);
      } catch (err) {
        // do nothing on error;
      }
    }
  }, 10);
};
//* Setting voice to female at the firstTime
window.onload = () => {
  bunnyxSpeak(" ");
};
