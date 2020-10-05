import React from 'react';
import ExamCreate from './ExamCreate';
import { useLocation  } from 'react-router-dom';

const ExamList = () => {
    const location = useLocation();
    const topMessage = location.state? location.state.topMessage : "Welcome!";

    return (
        <div className="ui container">
            {topMessage?<div className={`ui  message`}>{topMessage}</div>:''}
            <ExamCreate />
            {/* Add individual exam cards here */}
        </div>
    )
}

export default ExamList;