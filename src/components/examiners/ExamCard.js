import React from 'react';

const ExamCard = ( {examInfo, editExam, deleteExam}) =>{
    return (
        <div className="card">
            <div className="content">
                <div className="header">
                    {examInfo.exam_name}
                </div>
                <div className="meta">
                    {examInfo.exam_owner}
                </div>
                <div className="description">
                    {examInfo.exam_description}
                </div>
                <table className="ui small table">
                    <thead>
                        <tr>
                        <th>Passing Score</th>
                        <th>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{examInfo.exam_pass_score}</td>
                        <td>{examInfo.exam_fee}</td>
                        </tr>
                    </tbody>
                </table>



{/* 
                <div className="ui divided list">
                    <div className="item">
                        <i className="dollar sign icon"></i>
                        <div className="content">
                        <div className="header">Exam fee: </div>99.00
                        </div>
                    </div>
                    <div className="item">
                        <i className="percent icon"></i>
                        <div className="content">
                        <div className="header">Passing Score: </div>70
                        </div>
                    </div>
                </div>
 */}


{/* 
            <div className="ui horizontal statistics">
                <div className="ui violet statistic">
                    <div className="label">Passing Score</div>
                    <div className="value">70</div>
                </div>
                <div className="ui violet statistic">
                    <div className="label">Fee</div>
                    <div className="value"><i className="dollar sign icon"></i>80.99</div>
                </div>
            </div>
                 */}

            </div>
            <div className="extra content">
            <div className="ui two buttons" data-examid={examInfo.exam_id}>
                <div className="ui basic blue button" onClick={editExam}>
                    <i className="edit alternate icon"></i>Edit</div>
                <div className="ui basic red button" onClick={deleteExam}>
                    <i className="trash alternate icon"></i>Delete
                </div>
            </div>
            </div>
        </div>
    )
};

export default ExamCard;