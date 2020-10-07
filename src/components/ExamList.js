import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory  } from 'react-router-dom';
import { ExaminerContext } from "../context";
import examineApi from '../apis/examineApi';
import ExamCreate from './ExamCreate';
import ExamCard from './ExamCard';

const ExamList = () => {
    const location = useLocation();
    const history = useHistory();
    const { userInfo } = useContext(ExaminerContext);
    const [ examList, setExamList ] = useState([]);
    const [ refreshList, setRefreshList ] = useState(true);
    let topMessage = location.state? location.state.topMessage : '';

    
    useEffect(()=>{
        async function retrieveExamList(){
            const userExams = await examineApi.getExaminerExams(userInfo.username);
            setExamList(userExams);
            return userExams;
        };
        retrieveExamList();
        setRefreshList(false);
    },[userInfo.username, refreshList]);

    const handleDeleteExam = e =>{
        e.currentTarget.className += " loading";
        const examId = e.target.parentNode.getAttribute('data-examid');
        async function deleteExamById(examId){
            const examDeleted = await examineApi.deleteExam(userInfo.username, examId);
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

        setTimeout(()=>{
            history.push(`/orgs/${userInfo.username}/exams/${examId}/edit/1`);
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