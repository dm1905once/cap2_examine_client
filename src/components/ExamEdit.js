import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { ExaminerContext } from "../context";
import examineApi from '../apis/examineApi';
import ExamHeader from './ExamHeader'
import ExamCrumbs from './ExamCrumbs'
import Question from './Question'

const ExamEdit = ( props )=> {
    const [ exam, setExam ] = useState({});
    const { examiner, examId, seq } = props.match.params;
    const { userInfo } = React.useContext(ExaminerContext);
    // const exam = useSelector(store => store.newExam);


    useEffect(()=>{
        // Retrieve exam details
        async function loadExam(){
            const exam = await examineApi.getEditableExam(examiner, examId);
            setExam(exam);
        };
        loadExam();
        if (!exam){
            if (userInfo.username === examiner) {
                return <Redirect to={ {pathname: `/orgs/${userInfo.username}/exams`}} />
            } else {
                return <Redirect to="/orgs" />
            }
        }
        console.log(exam);
    },[exam, examId, examiner, userInfo.username]);

    return ( 
        <div>
            {
            exam? 
                <div>
                    <ExamHeader examName={exam.exam_name} />
                    <ExamCrumbs questions={exam.questions} />
                    <Question nextSeq={seq} />
                </div>
            :
                <h1> Loading ....</h1>
            }
        </div>
    );
}

export default ExamEdit;