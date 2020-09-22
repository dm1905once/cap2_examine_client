import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import uniqid from 'uniqid';
import QuestionTypes from './QuestionTypes';
import QuestionMCQ from './QuestionMCQ';
import QuestionBIN from './QuestionBIN';
import QuestionFIB from './QuestionFIB';
import { QuestionDetailsContext } from '../context';
import { addNewQuestion } from '../actions';

const Question = () =>{

    const INITIAL_QUESTION_STATE = {
            question_type: "",
            question_text: "",
            question_seq: 1
        };
    const dispatch = useDispatch();

    const [ questionFields, setQuestionFields ] = useState(INITIAL_QUESTION_STATE);
    const [ showQuestionOptions, setShowQuestionOptions ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState([]);

    const handleQuestionText = (field, newValue) =>{
        setQuestionFields( {...questionFields, [field]: newValue });

        if (field === 'question_text') setValidationErrors([]);
    }


    useEffect(()=>{
        switch (questionFields.question_type) {
            case "MCQ": setShowQuestionOptions(<QuestionMCQ />) ; return;
            case "BIN": setShowQuestionOptions(<QuestionBIN />) ; return;
            case "FIB": setShowQuestionOptions(<QuestionFIB />) ; return;
            default: setShowQuestionOptions(null)
        }
    }, [questionFields.question_type] );


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
                ...options
            }
            setQuestionFields(INITIAL_QUESTION_STATE);
            dispatch(addNewQuestion(question));
        }
    }


    return (
        <div className="ui centered grid">
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