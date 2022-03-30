import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import errorReducer from './error'
import syllabusReducer from './syllabus'

const rootReducer = combineReducers({
    userReducer,
    errorReducer,
    syllabusReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
