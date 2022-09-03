import React, { useEffect, useState } from "react";

import PracticeFirstChild from "./PracticeFirstChild";
const Practice = (props) => {
  const [loadedwords, setloadedwords] = useState();

  //using useEffect hook to get the list of 10 words only one time at first time the page renders.
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3000/words");
      const responseData = await response.json();
      setloadedwords(responseData.data.words);
    };
    sendRequest();
  }, []);
  return (
    loadedwords && (
      <PracticeFirstChild
        item={loadedwords}
        onAllQuestionsAnswered={props.onAllQuestionsAnswered}
        onCorrectAnswer={props.onCorrectAnswer}
      ></PracticeFirstChild>
    )
  );
};

export default Practice;
