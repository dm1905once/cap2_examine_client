import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import { QuestionDetailsContext } from '../../context';

const QuestionMCQ = ( { choices=[], validChoice=null } )=> {

    const [ choiceList, setChoiceList ] = useState([]);
    const [ newChoice, setNewChoice ] = useState('');
    const [ rightChoiceId, setRightChoiceId ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const submitDetails = useContext(QuestionDetailsContext);
    // const [ editFieldsLoaded, setEditFieldsLoaded ] = useState(false);
    const [ questionSaved, setQuestionSaved ] = useState(false);

    useEffect(() =>{
        setRightChoiceId(validChoice);
        setTimeout(()=>{
            setQuestionSaved(false);
        }, 5000);
    },[validChoice]);

    useEffect(() =>{
        // Pre-load choices if they came from parent component (edit question)
        if (choices.length > 0){
            setChoiceList(choices);
            // setEditFieldsLoaded(true);
        }
    }, [choices]);

    const addChoice = () =>{
        setValidationErrors([]);

        setChoiceList([...choiceList, {
            choice_id: uniqid.process(),
            choice_text: newChoice
        }]);
        setNewChoice('');
    }

    const removeChoice = choiceId =>{
        setChoiceList(choiceList.filter(choice=> choice.choice_id !== choiceId ))
    }

    const displayChoiceRow = (choice) =>{
        if (choice.choice_id === rightChoiceId) {
            return <td><i className="check large green icon"></i></td>
        } else {
            return (
                <td>
                    <div className="ui fitted checkbox">
                        <input type="checkbox" onClick={()=>setRightChoiceId(choice.choice_id)} /> <label></label>
                    </div>
                </td>
            )
        }
    }


    const handleSaveOptions = () =>{
        // Choice list Validations
        const errorMessages = [];
        if (choiceList.length < 2) errorMessages.push("Please enter at least 2 choices");
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
                    <h2 className="ui blue  large header">Multiple choice question</h2>
                </div>
                <div className="right aligned six wide column">
                    {questionSaved?<div className="ui right green label">Saved!</div>:""}
                </div>
                <div className="right floated three wide column">
                    <button onClick={handleSaveOptions}
                        className="ui icon button">Save
                        <i className="save blue circle right icon"></i>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="one wide column"></div>
                <div className="six wide column">
                    <h4>Add choices</h4>
                    <div className="ui fluid large icon input">
                        <input type="text" 
                                placeholder="Enter one choice at a time"
                                value={newChoice}
                                onChange={(e)=>setNewChoice(e.target.value)}/>
                        <button className={`ui icon basic ${newChoice.length === 0? 'disabled' : ''} button`}
                                data-tooltip="Add choice"
                                onClick={addChoice}
                                >
                            <i className="arrow circle right big blue link icon"></i>
                        </button>
                    </div>
                </div>

                <div className="two wide column"></div>

                <div className="six wide column">
                    <h4>Current choices. Select the choice that is correct.</h4>
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
                                <th className="right aligned">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {choiceList.map(choiceItem => (
                                <tr className={choiceItem.choice_id === rightChoiceId? "positive" : "negative"} key={choiceItem.choice_id} >
                                    {displayChoiceRow(choiceItem)}
                                    <td>{choiceItem.choice_text}</td>
                                    <td className="right aligned">
                                        <div className="ui circular basic white icon button" 
                                            data-tooltip="Remove choice"
                                            onClick={()=>removeChoice(choiceItem.choice_id)}
                                        ><i className="close red icon"></i>
                                        </div>
                                    </td>
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
export default QuestionMCQ;