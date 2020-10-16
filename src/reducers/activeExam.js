const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){
        case 'LOAD_ACTIVE_EXAM': {
            return action.payload;
        }
        case 'CLEAR_ACTIVE_EXAM': {
            return INITIAL_STATE;
        }
        default:
            return state;
    }
};