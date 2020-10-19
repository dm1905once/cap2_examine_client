import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import examineApi from '../../apis/examineApi';
import { storeActiveExam, initializeResponses } from '../../actions';

const ApplyExam = () =>{
    const dispatch = useDispatch();
    const { appId } = useParams();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ isValidExam, setIsValidExam ] = useState(false);
    const [ examInStore, setExamInStore ] = useState(false);
    const [ currentQuestion, setCurrentQuestion ] = useState(1);
    const activeExam = useSelector(store=> store.activeExam);
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

    const handlePrev = () =>{
        setCurrentQuestion(currentQuestion-1);
    }

    const handleNext = () =>{
        setCurrentQuestion(currentQuestion+1);
    }

    return (
        <div>
            {(isApplicantAuth && isValidExam) ? (
                <div>
                    <h1>Question navigator</h1>
                    <ShowQuestion 
                        examReady={examInStore} 
                        currentQuestion={currentQuestion} 
                        activeExam={activeExam}
                        handlePrev={handlePrev}
                        handleNext={handleNext}/>
                </div>
            ) : <h3>Invalid exam request. Make sure you are logged in and the exam ID is valid</h3>
            }
        </div>
    )
};

function ShowQuestion( {examReady, currentQuestion, activeExam, handlePrev, handleNext} ){
    if (examReady){
    return (
        <div>
            <p>Showing questions here. Total # questions: {activeExam.questions.length} Current question is: {currentQuestion}</p>
            <button 
                onClick={handlePrev}
                className={'ui labeled icon gray button ' + (currentQuestion===1?'disabled':'')}>
                <i className="left arrow icon"></i>Previous
            </button>
            <button 
                onClick={handleNext}
                className={'ui right labeled icon blue button ' + (currentQuestion===activeExam.questions.length?'disabled':'')}>
                <i className="right arrow icon"></i>Next
            </button>
        </div>
    )
    } else {
        return <h3>Retrieving Exam...</h3>
    }
}

export default ApplyExam;