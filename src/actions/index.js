export const addNewQuestion = (newQuestion) =>{
    return {
        type: 'ADD_QUESTION',
        payload: newQuestion
    };
};
