import React from 'react';


const ExamHeader = () => {
    return (
        <div className="ui centered grid">

            <div className="fluid row">
                <div className="eight wide column">
                    
                        <h2 className="ui header">
                            <i class="file alternate blue icon"></i>
                            <div class="content">Exam name here</div>
                        </h2>
                </div>
                <div className="six wide column">
                        <div class="ui  basic  label">
                            Owner
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ExamHeader;