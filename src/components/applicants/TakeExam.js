import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import examineApi from '../../apis/examineApi';
import { storeActiveExam, initializeResponses } from '../../actions';

const TakeExam = () =>{
    const dispatch = useDispatch();
    const { appId } = useParams();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ isValidExam, setIsValidExam ] = useState(false);
    const [ examInStore, setExamInStore ] = useState(false);
    const [ currentQuestion, setCurrentQuestion ] = useState(1);
    // const [ validExamId, setValidExamId ] = useState(null);

    useEffect(()=>{
        async function validateAndGetExam(){
            const applicant_email = userInfo.email;
            const application_id = appId;
            const { validExamId } = await examineApi.validateApplication({application_id, applicant_email});
            if (validExamId){
                setIsValidExam(true);
                const activeExam = await examineApi.applyExam(validExamId);
                if (activeExam) {
                    dispatch(storeActiveExam(activeExam.exam));
                    dispatch(initializeResponses(validExamId));
                    setExamInStore(true);
                }
            }
        };
        if (isApplicantAuth && userInfo && appId) {
            validateAndGetExam();
        }
    },[appId, isApplicantAuth, userInfo]);

    return (
        <div>
            {(isApplicantAuth && isValidExam) ? (
                <div>
                    <h1>Question navigator</h1>
                    <ShowQuestion examReady={examInStore} currentQuestion={currentQuestion} />
                    <h1>Question footer</h1>
                </div>
            ) : <h3>Invalid exam request. Make sure you are logged in and the exam ID is valid</h3>
            }
        </div>
    )
};

function ShowQuestion( {examReady, currentQuestion} ){
    if (examReady){
        return <h3>Showing questions here. Current question is: {currentQuestion}</h3>
    } else {
        return <h3>Retrieving Exam...</h3>
    }
}

export default TakeExam;