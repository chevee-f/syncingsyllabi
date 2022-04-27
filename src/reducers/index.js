import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import errorReducer from './error'
import syllabusReducer from './syllabus'
import goalReducer from './goal'
import assignmentsReducer from './assignments'

const rootReducer = combineReducers({
    userReducer,
    errorReducer,
    syllabusReducer,
    goalReducer,
    assignmentsReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
