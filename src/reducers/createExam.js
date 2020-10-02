const INITIAL_STATE = {
    exam_id: null,
    exam_name: null,
    exam_owner: null,
    exam_pass_score: null,
    exam_fee: null,
    questions: []
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'CREATE_EXAM':
            return { 
                ...state, 
                exam_id: action.payload.exam_id,
                exam_name: action.payload.exam_name,
                exam_owner: action.payload.exam_owner,
                exam_pass_score: action.payload.exam_pass_score,
                exam_fee: action.payload.exam_fee
            };
        case 'ADD_QUESTION': {
            const updatedQuestions = [...state.questions, action.payload];
            return { ...state, questions: updatedQuestions};
        }
        default:
            return state;
    }
};