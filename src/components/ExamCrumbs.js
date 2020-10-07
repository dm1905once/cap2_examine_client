import React from 'react';
import { Link } from 'react-router-dom';

const ExamCrumbs = ( { examOwner="", examId="", questions=[], operation="" } ) => {

    if (questions.length === 0 ){
        return <div><p className="ui horizontal large orange label">Add your first question!</p></div>
    }

    
    return (
        <div>
            Questions: {
                (operation === "edit")
                ?
                    <div className="ui circular olive labels">
                        {questions.map(q=>(
                            <Link to={`/orgs/${examOwner}/exams/${examId}/edit/${q.question_seq}`} 
                                className="ui label" 
                                key={q.question_seq}> 
                                    {q.question_seq}
                            </Link>
                        )
                    )}
                    </div>

                :   
                questions.map(q=>(
                    <div 
                        className="ui olive basic button" 
                        key={q.question_seq}> 
                            {q.question_seq}
                    </div>
                    )
                )
            }
        </div>
    )
}

export default ExamCrumbs;