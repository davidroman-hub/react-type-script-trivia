import React,{useState} from 'react';
import {fetchQuizQuestions} from './API';
// components
import QuestionCard from './components/QestionsCard';
//TYPES
import { QuestionState,Difficulty} from './API'



const TOTAL_QUESTIONS = 10

type AnswerObject = {
  question: string,
  answer:string,
  correct:boolean,
  correctAnswer:string
}

const App = () => {
  
  const [loading, setLoading] = useState(false);
// to specify we gonna use QuestionState remember is a array of springs =>
  const [questions, setQuestions] = useState <QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [useAnswers, setUserAnswers] = useState <AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameover] = useState(true);

  // to consoling the response from API.ts
  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
  console.log(questions)

  const startTrivia = async () => {
    setLoading(true);
    setGameover(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions);
    // you can use try catch
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    
  }

  const nextQuestion = () => {
    //
  }
  
  return(
    <div className='App'>
      <h1>React Quiz</h1>
      {gameOver || useAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
          Start
        </button>
      ): null}
      
      {!gameOver ? <p className='score'> Score:</p> : null}
      {loading && <p>Loading Questions..</p>}
      {/* //in any case you dont put the props this will dont will work, you need to put all props */}
      {!loading && !gameOver && <QuestionCard
        
        questionNr={number + 1}
        totalQuestion= {TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={useAnswers ? useAnswers[number]: undefined}
        callback={checkAnswer}

      />}
      { !gameOver &&
        !loading && 
        useAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS -1 ? (
          <button className='next' onClick={ nextQuestion}>
          Next Question
        </button>
      ): null}
    </div>
  )
}
export default App;
