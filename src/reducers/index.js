import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import errorReducer from './error'

const rootReducer = combineReducers({
    userReducer,
    errorReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
