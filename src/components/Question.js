import React, { useState, useEffect } from 'react';
import QuestionTypes from './QuestionTypes';
import QuestionMCQ from './QuestionMCQ';
import QuestionBIN from './QuestionBIN';
import QuestionFIB from './QuestionFIB';
import { QuestionDetailsContext } from '../context';

const Question = () =>{

    const [ questionFields, setQuestionFields ] = useState(
        {
            question_type: "",
            question_text: ""
        }
    );

    const handleQuestionText = (field, newValue) =>{
        setQuestionFields( {...questionFields, [field]: newValue });
    }



    const [ showQuestionOptions, setShowQuestionOptions ] = useState(null);

    // useEffect(()=>{
    //     console.log(questionFields);
    // }, [questionFields] );

    


    useEffect(()=>{
        switch (questionFields.question_type) {
            case "MCQ": setShowQuestionOptions(<QuestionMCQ />) ; return;
            case "BIN": setShowQuestionOptions(<QuestionBIN />) ; return;
            case "FIB": setShowQuestionOptions(<QuestionFIB />) ; return;
            default: setShowQuestionOptions(null)
        }
    }, [questionFields.question_type] );


    // const receiveOptions = (options) =>{
    //     validateAndSubmitQuestion(options);
    // }

    const submitQuestion = (options) =>{
        // TODO Validate top question fields 
        const question = {
            question_id: "algo",
            ...questionFields,
            options
        }
        console.log(question);
        // TODO dispatch action 
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