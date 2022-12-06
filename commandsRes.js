const express = require("express");
const fs = require("fs");

const router = express.Router();

// render home page
router.get("/", (req, res) => {
  res.render("Bunnyx");
});

// Handeling all the commands
router.get("/giveCmd", (req, res) => {
  const userCmd = req.headers.mycommand
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " "); // command sent by frontend. we are first converting the command to lower case and ten we are just removing all the puntuations from string
  // loading the json file which contains the commands and answers
  fs.readFile(
    `${__dirname}/data/conversation.json`,
    "utf8",
    (err, conversationTraining) => {
      if (err) {
        console.log(err);
      } else {
        conversationTraining = JSON.parse(conversationTraining); // parsing json file
        let i = 0;
        // looping through all the keys of conversation training to compare with the user command
        for (let cmd in conversationTraining.converssation) {
          if (userCmd.includes(cmd)) {
            // if there are multiple amswers of the question then we can give answer randomly from an array of ansewers for that particular question
            if (
              conversationTraining.converssation[cmd].rand &&
              !conversationTraining.converssation[cmd].isCommand && // if the current command is not a command on which some action should be taken
              !conversationTraining.converssation[cmd].question
            ) {
              let randIndex = Number.parseInt(
                Math.random() *
                  conversationTraining.converssation[cmd].message.length
              );
              res.json({
                ans: conversationTraining.converssation[cmd].message[randIndex],
                isCommand: false,
                question: false,
              });
              break;
            }
          }
          i++;
        }
      }
    }
  );
});

module.exports = router;
