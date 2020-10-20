import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addResponse } from '../../actions';

const ShowQuestion = ( {examReady, currentQuestion, activeExam, handlePrev, handleNext} ) =>{
    const dispatch = useDispatch();
    const submitExam = useSelector(store=> store.submitExam);

    if (examReady){
        function handleSelectedChoice(e){
            dispatch(addResponse(activeExam.questions[currentQuestion-1].question_id, e.target.value));
        }

    return (
        <div>
            <h3>Select the choice that best answers the question:</h3>
            <div className="ui blue raised padded segment">{activeExam.questions[currentQuestion-1].question_text}</div>
            <div className="ui grid">
                <div className="ui row">
                    <div className="ui twelve wide column">
                        <div className="ui form" onChange={handleSelectedChoice}>
                            <div className="grouped fields">
                            <label htmlFor="choices">Select one choice:</label>
                                {activeExam.questions[currentQuestion-1].choices.map(ch=>
                                    <div className="field" key={ch.choice_id}>
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="choices" tabIndex="0" value={ch.choice_id}/>
                                            <label>{ch.choice_text}</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="ui four wide column">
                    <button 
                        onClick={handlePrev}
                        className={'ui labeled icon gray button ' + (currentQuestion===1?'disabled':'')}>
                        <i className="left arrow icon"></i>Previous
                    </button>
                    <button 
                        onClick={handleNext}
                        className={'ui right labeled icon blue button ' + (currentQuestion===activeExam.questions.length?'disabled':'')}>
                        <i className="right arrow icon"></i>Next
                    </button>
                    </div>
                </div>
                <div className="ui row">
                    <button className="fluid ui button">Finish and Submit Exam</button>
                </div>
            </div>
        </div>
    )
    } else {
        return <h3>Retrieving Exam...</h3>
    }
};

export default ShowQuestion;