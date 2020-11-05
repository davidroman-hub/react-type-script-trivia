import React,{useState} from 'react';
import {fetchQuizQuestions} from './API';
// components
import QuestionCard from './components/QestionsCard';
//TYPES
import { QuestionState,Difficulty} from './API'

//Styles

import {GlobalStyles, Wrapper} from './App.styles';


const TOTAL_QUESTIONS = 10

export type AnswerObject = {
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
  const [userAnswers, setUserAnswers] = useState <AnswerObject[]>([]);
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
    if(!gameOver){
      // user Answers
      const answer = e.currentTarget.value;
      // check answer agains correct answer
      const correct = questions[number].correct_answer === answer; 
      // Add score if answer is correct
      if(correct) setScore(prev => prev + 1)
      // save answer in the array ofr user answers
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct,
        correctAnswer:questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1;
    if( nextQuestion === TOTAL_QUESTIONS){
      setGameover(true)
    } else{
      setNumber(nextQuestion)
    }
  }
  
  return(
    <>
    <GlobalStyles/>
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className='start' onClick={startTrivia}>
          Start
        </button>
      ): null}
      
      {!gameOver ? <p className='score'> Score: {score}</p> : null}
      {loading && <p>Loading Questions..</p>}
      {/* //in any case you dont put the props this will dont will work, you need to put all props */}
      {!loading && !gameOver && <QuestionCard
        
        questionNr={number + 1}
        totalQuestion= {TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number]: undefined}
        callback={checkAnswer}

      />}
      { !gameOver &&
        !loading && 
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS -1 ? (
          <button className='next'  onClick={ nextQuestion}>
          Next Question
        </button>
      ): null}
    </Wrapper>
    </>
  )
}
export default App;
