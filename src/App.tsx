import React,{useState} from 'react';
import {fetchQuizQuestions} from './API';
// components
import QuestionCard from './components/QestionsCard';
//TYPES
import {Difficulty} from './API'

const TOTAL_QUESTIONS = 10

const App =() => {
  
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [useAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

  // to consoling the response from API.ts
  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))


  const startTrivia = async () => {
//
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    
  }

  const nextQuestion = () => {
    //
  }
  
  return(
    <div className='App'>
      <h1>React Quiz</h1>
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      <p className='score'> Score:</p>
      <p>Loading Questions..</p>
      {/* //in any case you dont put the props this will dont will work, you need to put all props */}
      {/* <QuestionCard
        questionNr={number + 1}
        totalQuestion= {TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={useAnswers ? useAnswers[number]: undefined}
        callback={checkAnswer}

      /> */}
      <button className='next' onClick={ nextQuestion}>
        Next Question
      </button>
    </div>
  )
}
export default App;
