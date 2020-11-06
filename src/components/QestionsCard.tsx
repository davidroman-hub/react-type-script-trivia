import React from 'react';
import { AnswerObject } from '../declarations';

import { Wrapper, ButtonWrapper } from '../Button.styles';

type PropsQuiz = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer?: AnswerObject;
  questionNr: number;
  totalQuestion: number;
};

// wen have to specify its a functional component with React.FC and inside <> use props that we declared before
const QestionsCard: React.FC<PropsQuiz> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
}: PropsQuiz) => (
  <Wrapper>
    <p className="number">
      Question: {questionNr} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          {/* //=> to convert on boulean  = '  !!  ' */}
          <button disabled={!!userAnswer} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QestionsCard;
