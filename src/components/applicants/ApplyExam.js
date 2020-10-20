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
                    <h1>{activeExam.exam_name}</h1>
                    <ShowCrumbs 
                        examReady={examInStore} 
                        currentQuestion={currentQuestion} 
                        activeExam={activeExam}/>
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

        function handleSelectedChoice(e){
            console.log(e.target.value);
        }
    return (
        <div>
            <h3>Select the choice that best answers the question:</h3>
            <div className="ui blue raised padded segment">{activeExam.questions[currentQuestion-1].question_text}</div>
            <div className="ui grid">
                <div className="ui row">
                    <div className="ui twelve wide column">
                        <div className="ui form" onChange={handleSelectedChoice}>
                            <div className="grouped fields">
                            <label htmlFor="fruit">Select one choice:</label>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="fruit" tabIndex="0" value="algo"/>
                                        <label>Apples</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="fruit" tabIndex="0" value="nada" />
                                        <label>Oranges</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui four wide column">
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
                </div>
                <div className="ui row">
                    <button className="fluid ui button">Finish and Submit Exam</button>
                </div>
            </div>
        </div>
    )
    } else {
        return <h3>Retrieving Exam...</h3>
    }
}

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