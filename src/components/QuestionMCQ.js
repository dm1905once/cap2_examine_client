import React, { useState } from 'react';
import uniqid from 'uniqid';

const QuestionMCQ = ( {submitOptions} )=> {

    const [ choiceList, setChoiceList ] = useState([]);
    const [ newChoice, setNewChoice ] = useState('');
    const [ rightChoiceId, setRightChoiceId ] = useState('');

      /*  To be sent to State...
    
    choiceList returns this:
    0: {choiceId: "kfake82a", choice: "uno"}
    1: {choiceId: "kfakeadu", choice: "dos"}

    rightChoiceId returns:
    "kfake82a"
    */

    const addChoice = () =>{
        setChoiceList([...choiceList, {
            choiceId: uniqid.process(),
            choice: newChoice
        }]);
        setNewChoice('');
    }

    const removeChoice = choiceId =>{
        setChoiceList(choiceList.filter(choice=> choice.choiceId !== choiceId ))
    }

    const displayChoiceRow = (choice) =>{
        if (choice.choiceId === rightChoiceId) {
            return <td><i className="check large green icon"></i></td>
        } else {
            return (
                <td>
                    <div className="ui fitted checkbox">
                        <input type="checkbox" onClick={()=>setRightChoiceId(choice.choiceId)} /> <label></label>
                    </div>
                </td>
            )
        }
    }

    const handleSaveOptions = () =>{
        // TODO Validate input
        const questionOptions = {
            options: [choiceList],
            valid_answer: rightChoiceId
        }

        submitOptions(questionOptions);
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
                        <button className="ui icon basic button" 
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
                                <tr className={choiceItem.choiceId === rightChoiceId? "positive" : "negative"} key={choiceItem.choiceId} >
                                    {displayChoiceRow(choiceItem)}
                                    <td>{choiceItem.choice}</td>
                                    <td className="right aligned">
                                        <div className="ui circular basic white icon button" 
                                            data-tooltip="Remove choice"
                                            onClick={()=>removeChoice(choiceItem.choiceId)}
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