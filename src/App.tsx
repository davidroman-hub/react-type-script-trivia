import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import QuestionCard from './components/QestionsCard';
import { QuestionState, Difficulty, AnswerObject } from './declarations';
import {
  startTrivia,
  checkAnswer,
  TOTAL_QUESTIONS,
  nextQuestion,
} from './actions/App';

import { GlobalStyles, Wrapper } from './App.styles';

interface AppProps {
  loading?: boolean;
  questions?: QuestionState[];
  number?: number;
  userAnswers?: AnswerObject[];
  score?: number;
  gameOver?: boolean;
  startGame?: (amount: number, difficulty: Difficulty) => void;
  checkPlayerAnswer?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextAvailableQuestion?: () => void;
}

const App: React.FunctionComponent<AppProps> = ({
  loading,
  questions,
  number,
  userAnswers,
  score,
  gameOver,
  startGame,
  checkPlayerAnswer,
  nextAvailableQuestion,
}: AppProps) => (
  <>
    <GlobalStyles />
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver || (userAnswers && userAnswers.length === TOTAL_QUESTIONS) ? (
        <button
          className="start"
          onClick={() =>
            startGame && startGame(TOTAL_QUESTIONS, Difficulty.EASY)
          }
        >
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score"> Score: {score}</p> : null}
      {loading && <p>Loading Questions..</p>}
      {/* //in any case you dont put the props this will dont will work, you need to put all props */}
      {!loading &&
        !gameOver &&
        number !== undefined &&
        number !== null &&
        questions && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestion={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={
              checkPlayerAnswer as (
                e: React.MouseEvent<HTMLButtonElement>,
              ) => void
            }
          />
        )}
      {!gameOver &&
      !loading &&
      userAnswers &&
      number !== undefined &&
      number !== null &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextAvailableQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
  </>
);

const mapStateToProps = (state: any, ownProps: AppProps) => {
  return { ...ownProps, ...state.appReducer };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    startGame: (amount: number, difficulty: Difficulty) =>
      dispatch(startTrivia(amount, difficulty) as any),
    checkPlayerAnswer: (e: React.MouseEvent<HTMLButtonElement>) =>
      dispatch(checkAnswer(e) as any),
    nextAvailableQuestion: () => dispatch(nextQuestion() as any),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
