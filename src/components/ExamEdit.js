import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect  } from 'react-router-dom';
import ExamHeader from './ExamHeader'
import ExamCrumbs from './ExamCrumbs'
import Question from './Question'


const ExamEdit = () => {

    const exam = useSelector(store => store.newExam);

    if (!exam.exam_id){
        return <Redirect to="/exams" />
    } else {
        return (
            <div>
                <ExamHeader examName={exam.exam_name} />
                <ExamCrumbs questions={exam.questions} />
                <Question nextSeq={exam.questions.length + 1} />
            </div>
        );
    };
}

export default ExamEdit;