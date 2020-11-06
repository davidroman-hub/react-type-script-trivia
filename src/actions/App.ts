import { Dispatch } from '@reduxjs/toolkit';
import {
  AnswerObject,
  Difficulty,
  EmptyAction,
  Question,
  ReduxAction,
} from '../declarations';
import { shuffleArray } from '../utils';

export const TOTAL_QUESTIONS = 10;

export const FETCH_QUESTIONS_REQUEST = 'APP_FETCH_QUESTIONS_REQUEST';
export const FETCH_QUESTIONS_SUCCESS = 'APP_FETCH_QUESTIONS_SUCCESS';
export const FETCH_QUESTIONS_FAILURE = 'APP_FETCH_QUESTIONS_FAILURE';

export const ADD_ANSWER = 'APP_ADD_ANSWER';
export const INCREASE_SCORE = 'APP_INCREASE_SCORE';
export const GAME_OVER = 'APP_GAME_OVER';
export const MOVE_TO_NEXT_QUESTION = 'APP_MOVE_TO_NEXT_QUESTION';

export const fetchQuestionRequest = (): EmptyAction => ({
  type: FETCH_QUESTIONS_REQUEST,
});

export const fetchQuestionSuccess = (
  payload: unknown[],
): ReduxAction<string, unknown[]> => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload,
});

export const fetchQuestionFailure = (
  message: string,
): ReduxAction<string, string> => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: message,
  error: true,
});

export const startTrivia = (amount: number, difficulty: Difficulty) => async (
  dispatch: Dispatch,
): Promise<void> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;

  try {
    dispatch(fetchQuestionRequest());
    const data = await (await fetch(endpoint)).json();
    const payload = data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
    dispatch(fetchQuestionSuccess(payload));
  } catch (err) {
    dispatch(fetchQuestionFailure(err.message));
  }
};

export const addAnswer = (
  payload: AnswerObject,
): ReduxAction<string, AnswerObject> => ({
  type: ADD_ANSWER,
  payload,
});

export const increaseScore = (): EmptyAction => ({
  type: INCREASE_SCORE,
});

export const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => async (
  dispatch: Dispatch,
  getState: any,
): Promise<void> => {
  const { appReducer } = getState();
  const { gameOver, questions, number } = appReducer;

  if (!gameOver) {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;

    if (correct) {
      dispatch(increaseScore());
    }

    const answerObject = {
      question: questions[number].question,
      answer: answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };

    dispatch(addAnswer(answerObject));
  }
};

export const gameOver = (): EmptyAction => ({
  type: GAME_OVER,
});

export const moveToNextQuestion = (): EmptyAction => ({
  type: MOVE_TO_NEXT_QUESTION,
});

export const nextQuestion = () => async (
  dispatch: Dispatch,
  getState: any,
): Promise<void> => {
  const { appReducer } = getState();
  const { number } = appReducer;
  const nextQuestion = number + 1;

  if (nextQuestion === TOTAL_QUESTIONS) {
    dispatch(gameOver());
  } else {
    dispatch(moveToNextQuestion());
  }
};
