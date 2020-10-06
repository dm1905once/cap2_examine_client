import { combineReducers } from 'redux';
import createExam from './createExam';
import editExam from './editExam';

export default combineReducers({
    newExam: createExam,
    editExam: editExam
});