import React from 'react'

type PropsQuiz = {
    question:string;
    answers:string[];
    callback: any;
    userAnswer:any;
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
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QestionsCard
