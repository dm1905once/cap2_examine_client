import React from 'react';


const ExamHeader = ( {examName} ) => {
    return (
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

    )
}

export default ExamHeader;