
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


export const clearExam = () =>{
    return {
        type: 'CLEAR_EXAM'
    };
};


export const loadExam = (existingExam) =>{
    return {
        type: 'LOAD_EXAM',
        payload: existingExam
    };
};