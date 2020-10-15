import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import examineApi from '../../apis/examineApi';

const TakeExam = () =>{
    const { appId } = useParams();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ isValidExam, setIsValidExam ] = useState(false);
    const [ examInStore, setExamInStore ] = useState(false);
    const [ currentQuestion, setCurrentQuestion ] = useState(1);

    useEffect(()=>{
        async function preValidateExam(){
            const applicantEmail = userInfo.email;
            const validExamId = await examineApi.validateApplication({appId, applicantEmail});
            if (validExamId) {
                setIsValidExam(true);
                const activeExam = await examineApi.applyExam(validExamId);
                if (activeExam) {
                    // Load exam into store
                    setExamInStore(true);
                }
            }
        };
        if (isApplicantAuth) {
            preValidateExam();
        } else {

        }
    },[]);

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