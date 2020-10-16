import { combineReducers } from 'redux';
import createExam from './createExam';
import editExam from './editExam';
import activeExam from './activeExam';
import submitExam from './submitExam';

export default combineReducers({
    newExam: createExam,
    editExam: editExam,
    activeExam: activeExam,
    submitExam: submitExam
});