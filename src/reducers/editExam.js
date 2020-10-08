const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'LOAD_EXAM': {
            return action.payload;
        }
        case 'REPLACE_QUESTION': {
            const updatedQuestions = state.questions.map(question =>{
                if (question.question_id !== action.payload.question_id){
                    return question;
                } else {
                    return {
                        ...question,
                        ...action.payload
                    }
                }
            });
            return { ...state, questions: updatedQuestions};
        }
        case 'CLEAR_EDIT_EXAM': {
            return INITIAL_STATE;
        }
        default:
            return state;
    }
};