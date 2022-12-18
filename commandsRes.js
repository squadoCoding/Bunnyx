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
    .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim(); // command sent by frontend. we are first converting the command to lower case and ten we are just removing all the puntuations from string
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
        let wasAbleToAnswer = false;
        // looping through all the keys of conversation training to compare with the user command
        for (let cmd in conversationTraining.converssation) {
          if (userCmd.includes("search youtube for")) {
            wasAbleToAnswer = true;

            let searchTerm = userCmd;
            searchTerm = searchTerm
              .slice(
                searchTerm.indexOf("search youtube for"),
                searchTerm.length
              )
              .split("");
            searchTerm.splice(
              searchTerm.join("").indexOf("search youtube for"),
              19
            );
            searchTerm = searchTerm.join("");
            res.json({
              ans: `Searching for ${searchTerm}`,
              isCommand: true,
              question: false,
              cmdType: "openWebsite",
              url: `https://youtube.com/search?q=${searchTerm
                .split(" ")
                .join("+")}`,
            });
            break;
          } else if (userCmd.includes("search for")) {
            wasAbleToAnswer = true;

            let searchTerm = userCmd;
            searchTerm = searchTerm
              .slice(searchTerm.indexOf("search for"), searchTerm.length)
              .split("");
            searchTerm.splice(searchTerm.join("").indexOf("search for"), 11);
            searchTerm = searchTerm.join("");
            res.json({
              ans: `Searching for ${searchTerm}`,
              isCommand: true,
              question: false,
              cmdType: "openWebsite",
              url: `https://google.com/search?q=${searchTerm
                .split(" ")
                .join("+")}`,
            });
            break;
          } else if (userCmd.includes(cmd) || userCmd == cmd) {
            // if there are multiple amswers of the question then we can give answer randomly from an array of ansewers for that particular question
            if (
              conversationTraining.converssation[cmd].rand &&
              !conversationTraining.converssation[cmd].isCommand && // if the current command is not a command on which some action should be taken
              !conversationTraining.converssation[cmd].question
            ) {
              wasAbleToAnswer = true;

              let randIndex = Number.parseInt(
                Math.random() *
                  conversationTraining.converssation[cmd].message.length
              );
              if (
                conversationTraining.converssation[cmd].giveInitialStatus !=
                null
              ) {
                res.json({
                  ans: conversationTraining.converssation[cmd].message[
                    randIndex
                  ],
                  isCommand: false,
                  question: false,
                });
              } else {
                res.json({
                  ans: conversationTraining.converssation[cmd].message[
                    randIndex
                  ],
                  isCommand: false,
                  question: false,
                });
              }
              break;
            }
            // if there are not multiple answers available for the same question, current index is not containing a question for the user and user has not asked a question to answer which we will need to take an action linke opening a particular link or application
            else if (
              !conversationTraining.converssation[cmd].rand &&
              !conversationTraining.converssation[cmd].isCommand && // if the current command is not a command on which some action should be taken
              !conversationTraining.converssation[cmd].question
            ) {
              wasAbleToAnswer = true;
              res.json({
                ans: conversationTraining.converssation[cmd].message,
                isCommand: false,
                question: false,
              });
              break;
            }
            // if user question is a command and it has multiple answers to give
            else if (
              conversationTraining.converssation[cmd].rand &&
              conversationTraining.converssation[cmd].isCommand && // if the current command is a command on which some action should be taken
              !conversationTraining.converssation[cmd].question
            ) {
              wasAbleToAnswer = true;
              let randIndex = Number.parseInt(
                Math.random() *
                  conversationTraining.converssation[cmd].message.length
              );
              if (
                conversationTraining.converssation[cmd].cmdType == "openWebsite"
              ) {
                res.json({
                  ans: conversationTraining.converssation[cmd].message[
                    randIndex
                  ],
                  isCommand: true,
                  question: false,
                  cmdType: "openWebsite",
                  url: conversationTraining.converssation[cmd].url,
                });
              } else if (
                conversationTraining.converssation[cmd].cmdType ==
                "speechRecOff"
              ) {
                res.json({
                  ans: conversationTraining.converssation[cmd].message[
                    randIndex
                  ],
                  isCommand: true,
                  question: false,
                  cmdType: "speechRecOff",
                });
              }
              break;
            }
          }
          i++;
        }
        if (!wasAbleToAnswer) {
          res.json({
            ans: "",
            isCommand: false,
            question: false,
          });
        }
      }
    }
  );
});

module.exports = router;
