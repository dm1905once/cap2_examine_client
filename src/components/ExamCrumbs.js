import React from 'react';

const ExamCrumbs = ( {questions} ) => {

    if (questions.length === 0 ){
        return <div><p class="ui horizontal large orange label">Add your first question!</p></div>
    }
    return (
    <div>Questions: {questions.map(q=><div class="ui olive circular label">{q.question_seq}</div>)}</div>
    )
}

export default ExamCrumbs;