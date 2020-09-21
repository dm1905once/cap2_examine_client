const INITIAL_STATE = {
    exam_id: null,
    exam_name: null,
    exam_owner: null,
    questions: []
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'CREATE_EXAM':
            return { ...state, isSignedIn: false, userId: null};
        case 'ADD_QUESTION': {
            const updatedQuestions = [...state.questions, action.payload];
            return { ...state, questions: updatedQuestions};
        }
        default:
            return state;
    }
};