import React, { useState } from 'react';
import uniqid from 'uniqid';

const QuestionMCQ = ()=> {

    const [ choiceList, setChoiceList ] = useState([]);
    const [ newChoice, setNewChoice ] = useState('');
    const [ rightChoiceId, setRightChoiceId ] = useState('');

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
            return (
                <tr className="positive" key={choice.choiceId} >
                    <td><i className="check large green icon"></i></td>
                    <td>{choice.choice}</td>
                    <td className="right aligned">
                        <div className="ui circular basic white icon button" 
                            data-tooltip="Remove choice"
                            onClick={()=>removeChoice(choice.choiceId)}
                        ><i className="close red icon"></i>
                        </div>
                    </td>
                </tr>
            )
        } else {
            return (
                <tr className="negative" key={choice.choiceId}>
                    <td>
                        <div className="ui fitted checkbox">
                            <input type="checkbox" onClick={()=>setRightChoiceId(choice.choiceId)} /> <label></label>
                        </div>
                    </td>
                    <td>{choice.choice}</td>
                    <td className="right aligned">
                        <div className="ui circular basic white icon button" 
                                data-tooltip="Remove choice"
                                onClick={()=>removeChoice(choice.choiceId)}
                        ><i className="close red icon"></i>
                        </div>
                    </td>
                </tr>
            )
        }
    }

    return (
        <div className="ui relaxed grid">
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
                    <h4>Current choices</h4>

                    <table className="ui table">
                        <thead>
                            <tr>
                                <th>Right?</th>
                                <th>Choice</th>
                                <th className="right aligned">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {choiceList.map(choiceItem =>displayChoiceRow(choiceItem))}
                        </tbody>
                    </table>
                </div>
                <div className="one wide column"></div>
            </div>
        </div>
    )
}

export default QuestionMCQ;