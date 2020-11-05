import React from 'react'

//types
import {AnswerObject} from '../App';



type PropsQuiz = {
    question:string;
    answers:string[];
    // callback: any;
    callback:(e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer:AnswerObject | undefined;
    questionNr:number;
    totalQuestion:number
}

// wen have to specify its a functional component with React.FC and inside <> use props that we declared before
const QestionsCard: React.FC<PropsQuiz> = ({
    question, 
    answers, 
    callback,
    userAnswer,
    questionNr,
    totalQuestion
    }) => {

    return (
        <div>
            <p className='number'>
                Question:{questionNr} / {totalQuestion}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                                {/* //=> to convert on boulean  = '  !!  ' */}
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QestionsCard
