import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect  } from 'react-router-dom';
import ExamHeader from './ExamHeader'
import Question from './Question'


const ExamEdit = () => {

    const exam = useSelector(store => store.newExam);

    if (!exam.exam_id){
        return <Redirect to="/exams" />
    } else {
        return (
            <div>
                <ExamHeader examName={exam.exam_name} />
                <Question />
            </div>
        );
    };
}

export default ExamEdit;