import React, { useState, useContext } from 'react';
import uniqid from 'uniqid';
import { QuestionDetailsContext } from '../context';

const QuestionMCQ = ( {submitOptions} )=> {

    const [ choiceList, setChoiceList ] = useState([]);
    const [ newChoice, setNewChoice ] = useState('');
    const [ rightChoiceId, setRightChoiceId ] = useState(null);
    const [ validationErrors, setValidationErrors ] = useState([]);
    const submitDetails = useContext(QuestionDetailsContext);

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
                options: choiceList,
                valid_answer: rightChoiceId
            }
            submitDetails(questionOptions);
        }
        
    }

    return (
        <div className="ui relaxed grid">
            <div className="row centered">
                <div className="fourteen wide column">
                    <p className="ui blue basic large label">Multiple choice question</p>
                    <button onClick={handleSaveOptions}
                        className="ui primary right floated right labeled icon button">
                        Save and continue
                        <i className="arrow circle right icon"></i>
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