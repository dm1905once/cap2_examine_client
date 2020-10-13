import React from 'react';
import uniqid from 'uniqid';

const ExamList = ( {exam, handleBuyExam} )=> {
    return (
        <div className="ui card">
            <div className="image">
                <img src={exam.examiners.organizations.logo_url} alt="org_logo"/>
            </div>
            <div className="content">
                <div className="header">{exam.exam_name}</div>
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
            <div className="ui blue animated attached button" onClick={e => handleBuyExam(e, exam.exam_id, uniqid.process('A_'))}>
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