import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context";
import appApi from '../../apis/appApi';
import { storeActiveExam, initializeResponses } from '../../actions';
import ShowQuestion from './ShowQuestion'

const ApplyExam = () =>{
    const dispatch = useDispatch();
    const { appId } = useParams();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ isValidExam, setIsValidExam ] = useState(false);
    const [ examInStore, setExamInStore ] = useState(false);
    const [ currentQuestion, setCurrentQuestion ] = useState(1);
    const activeExam = useSelector(store=> store.activeExam);

    useEffect(()=>{
        async function validateAndGetExam(){
            const applicant_email = userInfo.email;
            const application_id = appId;
            const { validExamId } = await appApi.validateApplication({application_id, applicant_email});
            if (validExamId){
                setIsValidExam(true);
                const activeExam = await appApi.applyExam(validExamId);
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
    },[appId, isApplicantAuth, userInfo, dispatch]);

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
                    <h1>{activeExam.exam_name}</h1>
                    <ShowCrumbs 
                        examReady={examInStore} 
                        currentQuestion={currentQuestion} 
                        activeExam={activeExam}/>
                    <ShowQuestion 
                        examReady={examInStore} 
                        application_id={appId}
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

function ShowCrumbs( {examReady, currentQuestion, activeExam} ){
    if (examReady){
        return (
            <div className="ui secondary segment">
                {activeExam.questions.map((q,i)=>
                    <div 
                        className={`ui ${(parseInt(currentQuestion) === i+1)? 'green': 'gray'} circular label`}
                        key={i+i}>{i+1}
                    </div>)
                }
            </div>
        );
    }else {
        return <h3>Retrieving Questions...</h3>
    }
}

export default ApplyExam;