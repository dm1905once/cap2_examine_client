import React, { useContext } from 'react';
import { useHistory  } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { ExaminerContext } from "../context";
import { clearExam } from '../actions';
import examineApi from '../apis/examineApi';


const ExamHeader = ( {examName} ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userInfo } = useContext(ExaminerContext);
    const newExam = useSelector(store=> store.newExam);

    const submitExam = async() =>{
        let redirectMessage = '';
        console.log("This is the contents of the exam ", newExam);
        if (newExam.questions.length>0){
            const newExamId = await examineApi.createExam(newExam);
            if (newExamId){
                dispatch(clearExam());
                redirectMessage = 'The exam has been created sucessfully';
            } else {
                redirectMessage = 'An error occurred while attempting to submit the exam.';
            }
        } else {
            redirectMessage = 'The exam you submitted did not have any questions';
        };

        history.push(
            {
                pathname: `/orgs/${userInfo}/exams`, 
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
            <h4 className="ui horizontal divider header">
                Exam questions
            </h4>
            <button className="ui right floated green large button"
                onClick={submitExam}>Finish and Submit Exam</button>
        </div>
    )
}

export default ExamHeader;