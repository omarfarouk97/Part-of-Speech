import React, { useEffect, useState } from "react";

const Rank = (props) => {
  let [rank, setRank] = useState();
  //send post request only once when page is rendered for the first time
  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:3000/rank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: props.correctAnswer }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setRank(responseData.data.rank);
    };
    sendRequest();
  }, []);
  return (
    <React.Fragment>
      <h2>Your rank is : {rank}</h2>
      <div>
        <button onClick={props.tryAgain}>Try Again</button>
      </div>
    </React.Fragment>
  );
};

export default Rank;
