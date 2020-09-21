import { combineReducers } from 'redux';
import createExam from './createExam';

export default combineReducers({
    newExam: createExam
});