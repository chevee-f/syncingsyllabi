import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user';

const rootReducer = combineReducers({
    userReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
