import React from 'react';

const ExamCrumbs = ( {questions} ) => {

    if (questions.length === 0 ){
        return <div><p className="ui horizontal large orange label">Add your first question!</p></div>
    }
    return (
    <div>Questions: {questions.map(q=><div key={q.question_seq} className="ui olive circular label">{q.question_seq}</div>)}</div>
    )
}

export default ExamCrumbs;