import React, { useEffect, useState } from 'react';
import axios from "axios"
import { formatTime } from '../../utils';

const End = ({ results, data, onReset, onAnswersCheck, time,libraryId,step,candidat }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if(result.a === data[index].answer) {
        correct++;
      }
    });
    async function postData(){
      console.log(candidat)
      if(step===3 && candidat)
      await axios.post("http://localhost:5000/candidature_libraryPost",{candidatureId:candidat,libraryId,score:Math.floor((correct / data.length) * 100)+"%"})
    }
    postData()
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          <p><strong>Your time:</strong> {formatTime(time)}</p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
          <button className="button is-success" onClick={onReset}>Try again</button>
        </div>
      </div>
    </div>
  );
}

export default End;