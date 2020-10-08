import React, { useContext } from 'react';
import { useHistory  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ExaminerContext } from "../context";
import { clearNewExam, clearEditExam } from '../actions';
import examineApi from '../apis/examineApi';


const ExamHeader = ( {examName, operation} ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useContext(ExaminerContext);

    // Retrieve a different store depending on the operation: create or edit
    const newExam = useSelector(store=> (operation === "edit")? store.editExam: store.newExam);

    const submitExam = async() =>{
        let redirectMessage = '';

        if (operation === "edit"){
            const newExamId = await examineApi.editExamQuestions(newExam);
            if (newExamId){
                dispatch(clearEditExam());
                redirectMessage = 'The exam has been updated sucessfully';
            } else {
                redirectMessage = 'An error occurred while attempting to submit the exam.';
            }
        } else if (operation === "create"){
            if (newExam.questions.length>0){
                const newExamId = await examineApi.createExam(newExam);
                if (newExamId){
                    dispatch(clearNewExam());
                    redirectMessage = 'The exam has been added sucessfully';
                } else {
                    redirectMessage = 'An error occurred while attempting to submit the exam.';
                }
            } else {
                redirectMessage = 'The exam you submitted did not have any questions';
            };
        }


        history.push(
            {
                pathname: `/orgs/${userInfo.username}/exams`, 
                state: {topMessage: redirectMessage }
            }
        )
    }

    return (
        <div>
            <div className="ui raised horizontal segments">
                <div className="ui segment">
                    <h2 className="ui header">
                        <i className="file alternate blue icon"></i>
                        <div className="content">{examName}</div>
                    </h2>
                </div>
                <div className="ui right aligned segment">
                    <p>Add new questions</p>
                </div>
            </div>
            <div className="ui grid">
                <div className="four column row">
                    <div className="right floated column">
                    <button className="ui right floated green large button"
                            onClick={submitExam}>Finish and Submit Exam
                        </button>
                    </div>
                </div>
            </div>
            <h4 className="ui horizontal divider header">
                Exam questions
            </h4>
        </div>
    )
}

export default ExamHeader;