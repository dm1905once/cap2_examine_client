
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

export const storeActiveExam = (activeExam) =>{
    return {
        type: 'LOAD_ACTIVE_EXAM',
        payload: activeExam
    };
};

export const clearActiveExam = () =>{
    return {
        type: 'CLEAR_ACTIVE_EXAM'
    };
};

export const initializeResponses = (examId) =>{
    return {
        type: 'INITIALIZE_SUBMISSION',
        payload: {exam_id: examId}
    };
};

export const addResponse = (questionId, selectedChoiceId) =>{
    return {
        type: 'ADD_RESPONSE',
        payload: {
            question_id: questionId,
            selected_choice_id: selectedChoiceId
        }
    };
};

export const resetResponses = () =>{
    return {
        type: 'RESET_SUBMISSION'
    };
};