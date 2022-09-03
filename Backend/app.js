const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const testData = JSON.parse(fs.readFileSync("./TestData.json"));

const pickRandomWrods = function (testData) {
  //copy original array to wordslist array
  let wordsList = testData.wordList.slice(0);
  //loop to remove 5 Objects from wordsList array
  while (wordsList.length > 10) {
    //get the random index of object(word) that should be removed
    let index = Math.floor(Math.random() * wordsList.length);
    //get the type of this word in variable wordType
    let wordType = wordsList[index].pos;
    let count = 0;
    //loop to count how many words of this chosen type exists in wordsList
    for (let j = 0; j < wordsList.length; j++) {
      if (wordsList[j].pos == wordType) {
        count++;
      }
    }
    //if there is more than one word of this type then the word is removed
    if (count > 1) {
      wordsList.splice(index, 1);
    }
  }
  return wordsList;
};

app.get("/words", (req, res) => {
  res.status(200).json({
    status: "success",
    data: { words: pickRandomWrods(testData) },
  });
});
app.post("/rank", (req, res, next) => {
  const { score } = req.body;
  //copy the array of scores
  const scoresListCopy = [...testData.scoresList];
  //get a new array that has all scores lower than student's score
  const scoreCount = scoresListCopy.filter((current) => {
    if (score > current) return current ? current : "0";
  });
  //calculate the rank by dividing amount of lower scores with total amount of scores
  const rank = Number(
    (scoreCount.length / scoresListCopy.length) * 100
  ).toFixed(2);
  if (rank >= 0) {
    res.status(200).json({
      status: "success",
      data: { rank },
    });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
