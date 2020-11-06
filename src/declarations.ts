import { Action } from 'redux';

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export interface Dictionary<T> {
  [key: string]: T;
}

export interface ReduxAction<T, K> extends Action<T> {
  payload?: K;
  error?: boolean;
}

export type RAction = ReduxAction<string, Dictionary<unknown>>;
export type EmptyAction = ReduxAction<string, undefined>;
