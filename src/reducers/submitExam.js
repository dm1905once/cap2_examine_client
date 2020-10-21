const INITIAL_STATE = {
    responses: []
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'INITIALIZE_SUBMISSION': {
            return {
                ...state, 
                exam_id: action.payload.exam_id
            };
        }
        case 'ADD_RESPONSE': {
            const updatedResponses = state.responses.filter(response =>{
                if (response.question_id !== action.payload.question_id){
                    return response;
                } 
            });
            updatedResponses.push(action.payload);
            return { ...state, responses: updatedResponses};
        }
        case 'RESET_SUBMISSION': {
            return INITIAL_STATE;
        }
        default:
            return state;
    }
};