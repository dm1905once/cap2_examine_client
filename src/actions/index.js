
export const initializeNewExam = (examDetails) =>{
    return {
        type: 'INITIALIZE_EXAM',
        payload: examDetails
    };
};

export const addNewQuestion = (newQuestion) =>{
    return {
        type: 'ADD_QUESTION',
        payload: newQuestion
    };
};

export const replaceQuestion = (question) =>{
    return {
        type: 'REPLACE_QUESTION',
        payload: question
    };
};


export const clearNewExam = () =>{
    return {
        type: 'CLEAR_NEW_EXAM'
    };
};

export const clearEditExam = () =>{
    return {
        type: 'CLEAR_EDIT_EXAM'
    };
};


export const loadExam = (existingExam) =>{
    return {
        type: 'LOAD_EXAM',
        payload: existingExam
    };
};