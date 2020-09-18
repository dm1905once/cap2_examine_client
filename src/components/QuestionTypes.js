import React from 'react';

const QuestionTypes = ( {handleInput, selected} ) =>{
    const highlightColor = "blue";
    const questionTypeOptions = [
        {
            optionType : "MCQ",
            optionText : "Multiple Choice",
            optionImage: "tasks large icon"
        },
        {
            optionType : "BIN",
            optionText : "True / False",
            optionImage: "adjust large icon"
        },
        {
            optionType : "FIB",
            optionText : "Fill in the blanks",
            optionImage: "window minimize outline large icon"
        }
    ]
    return(
        <div className="ui middle aligned selection large list">
            {questionTypeOptions.map((option) => 
                <div className="item" 
                     key={option.optionType}
                     onClick={()=>handleInput("question_type", option.optionType)}>
                    <i className={`${option.optionImage} ${(option.optionType === selected)? highlightColor: ""}`}></i>
                    <div className="content">
                        <div className={`ui basic label ${(option.optionType === selected)? highlightColor: ""}`}>{option.optionText}</div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default QuestionTypes;