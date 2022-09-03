import React, { useEffect, useState } from "react";

const PracticeFirstChild = (props) => {
  let [currentWord, setcurrentWord] = useState();
  let [currentIndex, setcurrentIndex] = useState(0);
  let [answerTaken, setAnswerTaken] = useState(false);
  let [rightAnswer, setrightAnswer] = useState(false);

  const buttonHandler = (e) => {
    let wordType = e.target.id;
    if (wordType === currentWord.pos) {
      setrightAnswer(true);
      //down here it counts the total score
      props.onCorrectAnswer(wordType, currentWord.pos);
    } else {
      setrightAnswer(false);
    }
    setAnswerTaken(true);
  };
  const nextButtonHandler = () => {
    setcurrentIndex(++currentIndex);
    //down here it checks if all answers are checked
    props.onAllQuestionsAnswered(currentIndex, props.item.length);
  };
  //everytime current index of the array of words change page will rerender
  useEffect(() => {
    if (currentIndex < props.item.length) {
      setcurrentWord(props.item[currentIndex]);
      setAnswerTaken(false);
    } else {
      console.log("You have answered all.");
    }
  }, [currentIndex]);
  if (props.item.length === 0) {
    return <h1>No words loaded..</h1>;
  } else {
    return (
      <React.Fragment>
        {/*here it checks if there is a current word and if there is then it will show it on the page*/}
        {currentWord && <h2>{currentWord.word}</h2>}
        <button id="noun" onClick={buttonHandler}>
          Noun
        </button>
        <button id="verb" onClick={buttonHandler}>
          Verb
        </button>
        <button id="adverb" onClick={buttonHandler}>
          Adverb
        </button>
        <button id="adjective" onClick={buttonHandler}>
          Adjective
        </button>
        {/* down here it only shows the 'next word' button if student clicked on the answer */}
        {answerTaken && (
          <button id="nextWord" onClick={nextButtonHandler}>
            Next Word
          </button>
        )}
        {answerTaken && (
          <div>
            {rightAnswer
              ? "your answer is correct"
              : "your answer is incorrect"}
            <div>progress reached is {((currentIndex + 1) / 10) * 100} %</div>
          </div>
        )}
      </React.Fragment>
    );
  }
};

export default PracticeFirstChild;
