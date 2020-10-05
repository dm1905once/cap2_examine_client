import React, { useEffect } from 'react';
import { useLocation  } from 'react-router-dom';
import ExamCreate from './ExamCreate';
import ExamCard from './ExamCard';

const ExamList = () => {
    const location = useLocation();
    const topMessage = location.state? location.state.topMessage : '';

    useEffect(()=>{
        console.log("Retrieve exams here");
    },[]);

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
            <div className="ui cards">
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            <ExamCard />
            </div>
        </div>
    )
}

export default ExamList;