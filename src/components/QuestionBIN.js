import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import { QuestionDetailsContext } from '../context';

const binaryOptions = {
        "TRUE_FALSE" : [
            {choice_id: uniqid.process(),choice_text: "True"},
            {choice_id: uniqid.process(),choice_text: "False"}
        ],
        "YES_NO" : [
            {choice_id: uniqid.process(),choice_text: "Yes"},
            {choice_id: uniqid.process(),choice_text: "No"}
        ],
        "ZERO_ONE" : [
            {choice_id: uniqid.process(),choice_text: "0"},
            {choice_id: uniqid.process(),choice_text: "1"}
        ]
    };


const QuestionBIN = ( { choices=[], validChoice=null } )=> {
    
    const [ choiceList, setChoiceList ] = useState([]);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const submitDetails = useContext(QuestionDetailsContext);
    const [ rightChoiceId, setRightChoiceId ] = useState(validChoice);
    const [ selectedType, setSelectedType ] = useState('TRUE_FALSE');
    const [ editFieldsLoaded, setEditFieldsLoaded ] = useState(false);
    const [ questionSaved, setQuestionSaved ] = useState(false);

    useEffect(() =>{
        // Update these values only after they have been pre-populated the first time (edit question)
        if (!editFieldsLoaded){
            setChoiceList(binaryOptions[selectedType]);
            setRightChoiceId(validChoice);
        }
    }, [selectedType, editFieldsLoaded, validChoice])
    
    useEffect(() =>{
        // Pre-load choices if they came from parent component (edit question)
        if (choices.length > 0){
            const true_false = choices.some(v => v.choice_text === "True");
            const yes_no = choices.some(v => v.choice_text === "Yes");
            const zero_one = choices.some(v => v.choice_text === "0");
            if (true_false) setSelectedType('TRUE_FALSE');
            if (yes_no) setSelectedType('YES_NO');
            if (zero_one) setSelectedType('ZERO_ONE');
            setChoiceList(choices);
            setEditFieldsLoaded(true);
        }
    }, [choices]);

   
    const selectRightChoice = (choiceId) =>{
        setRightChoiceId(choiceId);
        setValidationErrors([]);
    }


    const displayChoiceRow = (choice) =>{
        if (choice.choice_id === rightChoiceId) {
            return <td><i className="check large green icon"></i></td>
        } else {
            return (
                <td>
                    <div className="ui fitted checkbox">
                        <input type="checkbox" onClick={()=>selectRightChoice(choice.choice_id)} /> <label></label>
                    </div>
                </td>
            )
        }
    }

    const handleSaveOptions = () =>{
        // Choice list Validations
        const errorMessages = [];
        if (!rightChoiceId) errorMessages.push("Please determine the correct choice");
        setValidationErrors(errorMessages);

        // Successful validation
        if (errorMessages.length === 0 ){
            const questionOptions = {
                choices: choiceList,
                valid_answer_id: rightChoiceId
            }
            submitDetails(questionOptions);
            setQuestionSaved(true);
        }
    }


    return (
        <div className="ui relaxed grid">
            <div className="row centered">
                <div className="seven wide column">
                    <p className="ui blue basic large label">Binary question (True/False)</p>
                </div>
                <div className="seven wide column">
                        <button onClick={()=>alert("To be implemented")} className="ui basic red button">
                            <i className="trash icon"></i> Delete
                        </button>
                        {questionSaved
                        ?
                            <div className="ui positive basic right floated right labeled icon button">
                                Question Saved
                                <i className="check right icon"></i>
                            </div>
                        :
                            <button onClick={handleSaveOptions}
                                className="ui primary right floated right labeled icon button">
                                Save Question
                                <i className="arrow circle right icon"></i>
                            </button>
                        }
                    
                </div>
            </div>
            <div className="row">
                <div className="one wide column"></div>
                <div className="six wide column">
                    <h4>Alternate choices:</h4>
                    <div className="ui form">
                        <div className="grouped fields">
                        <div className="field" onClick={() => {setSelectedType('TRUE_FALSE')}}>
                                <div className="ui radio checkbox ">
                                    <input type="radio" 
                                    readOnly
                                    checked={(selectedType === "TRUE_FALSE")? true: false}
                                    tabIndex="0" 
                                    className="hidden"/>
                                    <label>True/False</label>
                                </div>
                            </div>
                            <div className="field" onClick={() => {setSelectedType('YES_NO')}}>
                                <div className="ui radio checkbox ">
                                    <input type="radio" 
                                        readOnly
                                        checked={(selectedType === "YES_NO")? true: false}
                                        tabIndex="0" 
                                        className="hidden"/>
                                    <label>Yes/No</label>
                                </div>
                            </div>
                            <div className="field" onClick={() => {setSelectedType('ZERO_ONE')}}>
                                <div className="ui radio checkbox">
                                    <input type="radio" 
                                        readOnly
                                        checked={(selectedType === "ZERO_ONE")? true: false}
                                        tabIndex="0" 
                                        className="hidden"/>
                                    <label>0/1</label>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>

                <div className="two wide column"></div>

                <div className="six wide column">
                    <h4>Select the choice that is correct</h4>
                    {
                        validationErrors.length > 0 ?
                        <div className="ui pointing below red basic label">
                            {validationErrors.map((message, i)=><p key={i}>{message}</p>)}
                        </div>
                        :''
                    }

                    <table className="ui table">
                        <thead>
                            <tr>
                                <th>Correct?</th>
                                <th>Choice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {choiceList.map(choiceItem => (
                                <tr className={choiceItem.choice_id === rightChoiceId? "positive" : "negative"} key={choiceItem.choice_id} >
                                    {displayChoiceRow(choiceItem)}
                                    <td>{choiceItem.choice_text}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="one wide column"></div>
            </div>
        </div>
    )
}
export default QuestionBIN;