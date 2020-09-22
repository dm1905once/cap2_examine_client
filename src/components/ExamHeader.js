import React from 'react';


const ExamHeader = () => {
    return (
        <div class="ui raised horizontal segments">
            <div class="ui segment">
                <h2 className="ui header">
                    <i class="file alternate blue icon"></i>
                    <div class="content">Exam name here</div>
                </h2>
            </div>
            <div class="ui right aligned segment">
                <p>Owner</p>
            </div>
        </div>

    )
}

export default ExamHeader;