import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ExamCrumbs = ( { examOwner="", examId="", questions=[], operation="" } ) => {

    const params = useParams();
    const seq = params.seq;

    if (questions.length === 0 ){
        return <div><p className="ui horizontal large orange label">Add your first question!</p></div>
    }

    
    return (
        <div className="ui raised segment">
            {
                (operation === "edit")
                ?
                    <div>
                        {questions.map((q, i)=>(
                            <Link to={`/orgs/${examOwner}/exams/${examId}/edit/${q.question_seq}`} 
                                className={`ui ${(parseInt(seq) === i+1)? 'blue': 'green'} large circular label`}
                                key={q.question_seq}> 
                                    {q.question_seq}
                            </Link>
                        )
                    )}
                    </div>

                :   
                questions.map(q=>(
                    <div 
                        className="ui green circular label" 
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