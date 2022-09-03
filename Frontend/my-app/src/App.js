import logo from "./logo.svg";
import "./App.css";
import "./screens/Practice";
import Practice from "./screens/Practice";
import React, { useState } from "react";
import Rank from "./screens/Rank";

function App() {
  let [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  let [correctAnswer, setCorrectAnswer] = useState(0);
  //allQuestionsAnsweredHandler will be used in PracticeFirstChild.js
  const allQuestionsAnsweredHandler = (index, length) => {
    //index is index of the 10 words array and length is the 10 words array's length
    if (index >= length) {
      //if index is bigger then all questions are answered
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
  };
  //correctAnswerHandler will be used in practiceFirstChild.js
  const correctAnswerHandler = (word, word2) => {
    if (word === word2) {
      //every correct answer take 10 points
      setCorrectAnswer((correctAnswer = correctAnswer + 10));
      console.log(correctAnswer);
    }
  };
  //tryAgainHandler will be used in Rank.js
  const tryAgainHandler = (e) => {
    e.preventDefault();
    setAllQuestionsAnswered(false);
    setCorrectAnswer(0);
  };
  if (allQuestionsAnswered) {
    return (
      <Rank correctAnswer={correctAnswer} tryAgain={tryAgainHandler}></Rank>
    );
  } else {
    return (
      <Practice
        onAllQuestionsAnswered={allQuestionsAnsweredHandler}
        onCorrectAnswer={correctAnswerHandler}
      ></Practice>
    );
  }
}

export default App;
