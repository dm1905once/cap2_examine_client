import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
// import { ExaminerContext } from "../context";   Not used?
import { loadExam } from '../actions';
import examineApi from '../apis/examineApi';
import ExamHeader from './ExamHeader'
import ExamCrumbs from './ExamCrumbs'
import Question from './Question'

const ExamEdit = ()=> {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const [ exam, setExam ] = useState({});
    const { examiner, examId, seq } = params;
    // const { userInfo } = React.useContext(ExaminerContext);  Not used?


    useEffect(()=>{
        // Retrieve exam details
        async function retrieveExam(){
            console.log("Entre qui");
            const exam = await examineApi.getEditableExam(examiner, examId);
            if (exam === null ) {
                history.push("/orgs");
            } else {
                setExam(exam);
                dispatch(loadExam(exam));
            }
        };
        if (Object.keys(exam).length === 0 ){
            retrieveExam();
        }
    },[exam, examiner, examId, dispatch, history]);

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