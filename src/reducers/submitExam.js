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
            const newResponses = state.responses;
            newResponses.push(action.payload.newResponse)
            return {
                ...state, 
                newResponses
            };
        }
        default:
            return state;
    }
};