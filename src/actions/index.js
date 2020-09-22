
export const createNewExam = (examDetails) =>{
    return {
        type: 'CREATE_EXAM',
        payload: examDetails
    };
};

export const addNewQuestion = (newQuestion) =>{
    return {
        type: 'ADD_QUESTION',
        payload: newQuestion
    };
};
