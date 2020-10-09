import React from 'react';

const ExamList = ( {exam, handleBuyExam} )=> {
    return (
        <div className="ui card">
            <div className="image">
                <img src={exam.examiners.organizations.logo_url}/>
            </div>
            <div className="content">
                <a className="header">{exam.exam_name}</a>
                <div className="meta">
                    <span>{exam.examiners.organizations.name}</span>
                </div>
                <div className="description">{exam.exam_description}</div>
            </div>
            <div className="extra content">
                <div>
                    <i className="dollar icon"></i>{exam.exam_fee}
                </div>
            </div>
            <div className="ui blue animated attached button" onClick={handleBuyExam}>
                <div className="visible content">
                    <i className="pencil alternate icon"></i>Take exam
                </div>
                <div className="hidden content">
                    <i className="dollar alternate icon"></i>{exam.exam_fee}
                </div>
            </div>
        </div>
    )
}

export default ExamList;