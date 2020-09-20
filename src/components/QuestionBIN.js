import React, { useState, useEffect, useContext } from 'react';
import uniqid from 'uniqid';
import { QuestionDetailsContext } from '../context';

const binaryOptions = {
        "TRUE_FALSE" : [
            {choiceId: uniqid.process(),choice: "True"},
            {choiceId: uniqid.process(),choice: "False"}
        ],
        "YES_NO" : [
            {choiceId: uniqid.process(),choice: "Yes"},
            {choiceId: uniqid.process(),choice: "No"}
        ],
        "ZERO_ONE" : [
            {choiceId: uniqid.process(),choice: 0},
            {choiceId: uniqid.process(),choice: 1}
        ]
    };


const QuestionBIN = ()=> {

    const [ choiceList, setChoiceList ] = useState([]);
    const [ rightChoiceId, setRightChoiceId ] = useState(null);
    const [ selectedType, setSelectedType ] = useState('TRUE_FALSE');
    const submitDetails = useContext(QuestionDetailsContext);


    /*  To be sent to State...
    
    choiceList returns this:
    0: {choiceId: "kfajv190", choice: "Yes"}
    1: {choiceId: "kfajv191", choice: "No"}

    rightChoiceId returns:
    "kfajv191"
    */


    useEffect(() =>{
        setChoiceList(binaryOptions[selectedType]);
        setRightChoiceId(null)
    }, [selectedType])


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

        submitDetails(questionOptions);
    }


    return (
        <div className="ui relaxed grid">
            <div className="row centered">
                <div className="fourteen wide column">
                    <p className="ui blue basic large label">Binary question (True/False)</p>
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

                    <table className="ui table">
                        <thead>
                            <tr>
                                <th>Correct?</th>
                                <th>Choice</th>
                            </tr>
                        </thead>
                        <tbody>
                            {choiceList.map(choiceItem => (
                                <tr className={choiceItem.choiceId === rightChoiceId? "positive" : "negative"} key={choiceItem.choiceId} >
                                    {displayChoiceRow(choiceItem)}
                                    <td>{choiceItem.choice}</td>
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