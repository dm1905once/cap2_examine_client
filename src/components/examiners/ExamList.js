import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory  } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context";
import { loadExam } from '../../actions';
import orgApi from '../../apis/orgApi';
import ExamCreate from './ExamCreate';
import ExamCard from './ExamCard';

const ExamList = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { examinerInfo } = useContext(AuthContext);
    const [ examList, setExamList ] = useState([]);
    const [ refreshList, setRefreshList ] = useState(true);
    // let topMessage = location.state? location.state.topMessage : '';
    const [ topMessage, setTopMessage ] = useState(location.state? location.state.topMessage:'');

    
    useEffect(()=>{
        async function retrieveExamList(){
            try {
                const userExams = await orgApi.getExaminerExams(examinerInfo.username);
                setExamList(userExams);
                return userExams;

            } catch(e){
                setTopMessage("Unable to retrieve the list of available exams");
            };
        };
        if (examinerInfo.username){
            retrieveExamList();
            setRefreshList(false);
        }
    },[examinerInfo.username, refreshList]);

    const handleDeleteExam = e =>{
        e.currentTarget.className += " loading";
        const examId = e.target.parentNode.getAttribute('data-examid');
        async function deleteExamById(examId){
            const examDeleted = await orgApi.deleteExam(examinerInfo.username, examId);
            return examDeleted;
        }
        deleteExamById(examId);
        setTimeout(()=>{
            setRefreshList(true);
        }, 5000);
    };

    const handleEditExam = e =>{
        e.currentTarget.className += " loading";
        const examId = e.target.parentNode.getAttribute('data-examid');

        async function retrieveExam(){
            const exam = await orgApi.getEditableExam(examinerInfo.username, examId);
            if (exam === null ) {
                history.push("/orgs");
            } else {
                dispatch(loadExam(exam));
            }
        };
        retrieveExam();

        setTimeout(()=>{
            history.push(`/orgs/${examinerInfo.username}/exams/${examId}/edit/1`);
        }, 5000);
    };

    return (
        <div className="ui container">
            {topMessage?<div className={`ui  message`}>{topMessage}</div>:''}

            <h2 className="ui block header">
                <i className="file outline icon"></i>
                <div className="content">Create a new Exam</div>
            </h2>
            <ExamCreate />

            <h2 className="ui block header">
                <i className="copy outline icon"></i>
                <div className="content">Your exams</div>
            </h2>
            {
                examList.length === 0
                ?   <h2 className="ui blue header">You have not yet created an exam</h2>
                :   
                    <div className="ui cards">
                        {examList.map(exam=> <ExamCard 
                            key={exam.exam_id} 
                            examInfo={exam}
                            deleteExam={handleDeleteExam}
                            editExam={handleEditExam} />)}
                    </div>
            }
        </div>
    )
}

export default ExamList;