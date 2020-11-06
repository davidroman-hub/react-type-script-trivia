import { AnswerObject, QuestionState, ReduxAction } from '../declarations';
import {
  ADD_ANSWER,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  GAME_OVER,
  INCREASE_SCORE,
  MOVE_TO_NEXT_QUESTION,
} from '../actions/App';

export interface State {
  questions: QuestionState[];
  loading: boolean;
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
  errorMessage?: string | null;
}

const initialState: State = {
  questions: [],
  loading: false,
  number: 0,
  userAnswers: [],
  score: 0,
  gameOver: true,
};

export const reducer = (
  state: State = initialState,
  action: ReduxAction<string, unknown>,
): State => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return { ...state, loading: true, gameOver: false };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload as QuestionState[],
        score: 0,
        userAnswers: [],
        number: 0,
      };
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        gameOver: true,
        errorMessage: action.payload as string,
      };
    case INCREASE_SCORE:
      return { ...state, score: state.score + 1 };
    case ADD_ANSWER:
      return {
        ...state,
        userAnswers: [...state.userAnswers, action.payload as AnswerObject],
      };
    case GAME_OVER:
      return initialState;
    case MOVE_TO_NEXT_QUESTION:
      return { ...state, number: state.number + 1 };
    default:
      return state;
  }
};
