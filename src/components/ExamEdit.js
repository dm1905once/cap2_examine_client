import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import ExamHeader from './ExamHeader'
import ExamCrumbs from './ExamCrumbs'
import Question from './Question'

const ExamEdit = ()=> {
    const params = useParams();
    const exam = useSelector(store=> store.editExam);
    const { seq } = params;

    return ( 
        <div>
            {
            exam? 
                <div>
                    <ExamHeader examName={exam.exam_name} operation="edit" />
                    <ExamCrumbs examOwner={exam.exam_owner} examId={exam.exam_id} questions={exam.questions}  operation="edit" />
                    <Question nextSeq={seq} operation="edit"/>
                </div>
            :
                <h1> Loading ....</h1>
            }
        </div>
    );
}

export default ExamEdit;