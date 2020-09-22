import React from 'react';
import ExamCreate from './ExamCreate';

const ExamList = () => {
    return (
        <div className="ui container">
            <ExamCreate />
            {/* Add individual exam cards here */}
        </div>
    )
}

export default ExamList;