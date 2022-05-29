import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from "axios"
import Start from '../../components/quiz/Start';
import Question from '../../components/quiz/Question';
import End from '../../components/quiz/End';
import Modal from '../../components/quiz/Modal';

let interval;

const App = (props) => {
const [questions, setQuestions] = useState([])
let libraryId ="6a6df272-7f7d-444e-b52b-4c2e48c08d13" 
useEffect(()=>{
  
  async function fetchData(){
  
    const response= await axios.get("http://localhost:5000/libraryGet/"+libraryId)
    const library = response.data
    // console.log(library)
    setQuestions(library.questions.map((quest) =>{
      
      return {
        question:quest.question,
        choices:quest.choix.map(ch => ch.ajouter),
        answer:quest.choix.length>0?quest.choix.filter(cho => cho.reponse)[0]?quest.choix.filter(cho => cho.reponse)[0].ajouter:"":""
      }
    }))
    console.log(response)
    // console.log({question:library.questions, choices:library.questions.choix,answer:library.question.choix.filter(cho => cho.reponse)[0].ajouter})
  }
  fetchData()

},[])

useEffect(()=>{
    console.log(props.candidat)
},[props.candidat])
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  console.log(activeQuestion)
  console.log(answers)
  
  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (
    <div className="App" >
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && <Question 
        data={questions[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={questions.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={questions}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
        step={step}
        libraryId={libraryId}
        candidat = {props.candidat}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        data={questions}
      />}
    </div>
  );
}

export default App;
