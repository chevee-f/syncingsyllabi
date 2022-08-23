
const initialState = {
    error: [],
  };

function errorReducer(state = initialState, action) {
    switch (action.type){
        case 'HAS_ERROR':
            return {...state, error: action.payload};
        case 'CLEAR_ERROR':
            return {...state, error: action.payload};
        case 'RESET':
            return {...state, error: []};
        default:
            return state;
    }
}
export default errorReducer;