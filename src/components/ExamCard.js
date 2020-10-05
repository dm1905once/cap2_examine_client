import React from 'react';

const ExamCard = () =>{
    return (
        <div className="card">
            <div className="content">
                {/* <img className="right floated mini ui image" src="/images/avatar/large/elliot.jpg"/> */}
                <div className="header">
                    Elliot Fu
                </div>
                <div className="meta">
                    Friends of Veronika
                </div>
                <div className="description">
                    Elliot requested permission to view your contact details
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
                        <td>70</td>
                        <td>80.99</td>
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
            <div className="ui two buttons">
                <div className="ui basic green button"><i className="edit alternate icon"></i>Edit</div>
                <div className="ui basic red button"><i className="trash alternate icon"></i>Delete</div>
            </div>
            </div>
        </div>
    )
};

export default ExamCard;