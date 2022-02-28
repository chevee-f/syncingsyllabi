import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';
import authReducer from './auth';

const rootReducer = combineReducers({
    userReducer,
    authReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
