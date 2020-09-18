import React, { useState } from 'react';

const QuestionMCQ = ()=> {

    const [ choiceList, setChoiceList ] = useState([
        {
            "choiceId": "asdfhklj",
            "choice": "ddd"
        },
        {
            "choiceId": "poihdfgl",
            "choice": "eee"
        },
        {
            "choiceId": "asdfdfgl",
            "choice": "ggg"
        }
    ]);

    const [ rightChoiceId, setRightChoiceId ] = useState(null);

    const displayChoiceRow = (choice) =>{
        if (choice.choiceId === rightChoiceId) {
            return (
                <tr className="positive" key={choice.choiceId} >
                    <td><i className="check large green icon"></i></td>
                    <td>{choice.choice}</td>
                    <td className="right aligned">
                        <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                            <i className="close red icon"></i>
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
                        <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                            <i className="close red icon"></i>
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
                        <input type="text" placeholder="Enter one choice at a time"/>
                        <button className="ui icon basic button" data-tooltip="Add choice">
                            <i className="arrow circle right big blue link icon"></i>
                        </button>
                    </div>
                    {/* <div className="field">
                        <div className="ui checkbox">
                            <input type="checkbox" tabIndex="0"/>
                            <label>Check if this is the right choice</label>
                        </div>
                    </div> */}
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
                            


{/*                             
                            <tr className="negative">
                                <td className="">
                                    <div class="ui fitted checkbox">
                                        <input type="checkbox"/> <label></label>
                                    </div>
                                </td>
                                <td>Initial commit</td>
                                    <td className="right aligned">
                                        <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                                            <i className="close red icon"></i>
                                        </div>
                                    </td>
                            </tr>
                            <tr className="negative">
                                <td className="">
                                    <div class="ui fitted checkbox">
                                        <input type="checkbox"/> <label></label>
                                    </div>
                                </td>
                                <td>Initial commit</td>
                                    <td className="right aligned">
                                        <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                                            <i className="close red icon"></i>
                                        </div>
                                    </td>
                            </tr> */}
                        </tbody>
                    </table>

{/*                    
                    <div className="ui middle aligned divided list">
                        {choiceList.map(choiceItem =>{
                            return (
                                <div className="item" key={choiceItem.choiceId} >
                                    <div className="right floated content">                    
                                        <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                                            <i className="close red icon"></i>
                                        </div>
                                    </div>
                                    <div className="ui left floated compact segment">
                                        <div className="ui fitted checkbox">
                                            <input type="checkbox"/>
                                        </div>
                                    </div>
                                    <div className="content" data-key={choiceItem.choiceId}>{choiceItem.choice}</div>
                                </div>
                            )
                        })}
 
                        <div className="item">
                            <div className="right floated content">                    
                                <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                                    <i className="close red icon"></i>
                                </div>
                            </div>
                            <div className="content">Algo</div>
                        </div>
                        <div className="item">
                            <div className="right floated content">
                                <div className="ui circular basic white icon button" data-tooltip="Remove choice">
                                    <i className="close red icon"></i>
                                </div>
                            </div>
                            <div className="content">
                                <i className="check large green icon"></i>
                            </div>
                        </div> */}
                    {/* </div> */}


                </div>
                <div className="one wide column"></div>
            </div>
        </div>
    )
}

export default QuestionMCQ;