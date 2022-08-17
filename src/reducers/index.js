import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import errorReducer from './error'
import syllabusReducer from './syllabus'
import goalReducer from './goal'
import assignmentsReducer from './assignments'
import ocrReducer from './ocr'
import notificationReducer from './notification'

const rootReducer = combineReducers({
    userReducer,
    errorReducer,
    syllabusReducer,
    goalReducer,
    assignmentsReducer,
    ocrReducer,
    notificationReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
