import React from 'react';

const ExamCreate = () => {
    return (
        <>
        <div className="ui relaxed grid">
            <div className="row">
                <div className="eight wide column">
                    <div class="ui fluid action input">
                        <input type="text" placeholder="Enter exam name and click Create"/>
                        <div class="ui blue button">Create</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExamCreate;