import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import uniqid from 'uniqid';
import QuestionTypes from './QuestionTypes';
import QuestionMCQ from './QuestionMCQ';
import QuestionBIN from './QuestionBIN';
import QuestionFIB from './QuestionFIB';
import { QuestionDetailsContext } from '../../context';
import { addNewQuestion, replaceQuestion } from '../../actions';
import { AuthContext } from "../../context";

const Question = ( {nextSeq, operation} ) =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { userInfo } = React.useContext(AuthContext);
    const editExam = useSelector(store=> store.editExam);

    let INITIAL_QUESTION_STATE = {
        question_type: "",
        question_text: "",
        question_seq: nextSeq
    };

    const [ questionFields, setQuestionFields ] = useState(INITIAL_QUESTION_STATE);
    const [ showQuestionOptions, setShowQuestionOptions ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(()=>{
        if (operation==="edit" && Object.keys(editExam).length > 0 ){        
            const editQuestion = {
                question_id: editExam.questions[nextSeq-1].question_id,
                question_type: editExam.questions[nextSeq-1].question_type,
                question_text: editExam.questions[nextSeq-1].question_text,
                question_seq: editExam.questions[nextSeq-1].question_seq,
                valid_answer_id: editExam.questions[nextSeq-1].valid_answer_id,
                choices: editExam.questions[nextSeq-1].choices
            };
            setQuestionFields(editQuestion);
        }
    },[nextSeq, operation, editExam]);
    

    const handleQuestionText = (field, newValue) =>{
        setQuestionFields( {...questionFields, [field]: newValue });
        if (field === 'question_text') setValidationErrors([]);
    }


    useEffect(()=>{
        switch (questionFields.question_type) {
            case "MCQ": setShowQuestionOptions(
            <QuestionMCQ  choices={questionFields.choices} validChoice={questionFields.valid_answer_id} />) ; return;

            case "BIN": setShowQuestionOptions(
            <QuestionBIN choices={questionFields.choices} validChoice={questionFields.valid_answer_id}/>) ; return;
            
            case "FIB": setShowQuestionOptions(<QuestionFIB />) ; return;
            default: setShowQuestionOptions(null)
        }
    }, [questionFields] );


    const submitQuestion = (options) =>{

        // Question text validation
        const errorMessages = [];
        if (questionFields.question_text === '') errorMessages.push("Please enter a question");
        setValidationErrors(errorMessages);

        // Successful validation
        if (errorMessages.length === 0 ){
            const question = {
                question_id: uniqid.process('Q_'),
                ...questionFields,
                question_seq: parseInt(nextSeq),
                ...options
            }

            if (operation==="create"){
                dispatch(addNewQuestion(question));
                setQuestionFields(INITIAL_QUESTION_STATE);
                history.push(`/orgs/${userInfo.username}/exams/new`);
            } else if (operation==="edit"){
                dispatch(replaceQuestion(question));
            }
        }
    }


    return (
        <div className="ui centered grid">
            <div className="row"></div>
            <div className="row">
                <div className="four wide column">
                    <h3>Question Type</h3>
                    <QuestionTypes handleInput={handleQuestionText} selected={questionFields.question_type} />
                </div>
                <div className="ten wide column">
                    <h3>Question</h3>
                    <div className="ui form">
                        <div className="field">
                            <textarea rows="4" name="question_text" 
                            value={questionFields.question_text}
                            onChange={(event )=>handleQuestionText(event.target.name, event.target.value)}></textarea>
                        </div>
                        {
                            validationErrors.length > 0 ?
                            <div className="ui pointing red basic label">
                                {validationErrors.map((message, i)=><p key={i}>{message}</p>)}
                            </div>
                            :''
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="fourteen wide column">
                    <QuestionDetailsContext.Provider value={submitQuestion}>
                        {showQuestionOptions}
                        {/* <QuestionMCQ /> */}
                    </QuestionDetailsContext.Provider>
                </div>
            </div>


        </div>
    )
}

export default Question;