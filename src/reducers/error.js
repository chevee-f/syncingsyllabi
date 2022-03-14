
function errorReducer(errors = [], action) {
    switch (action.type){
        case 'HAS_ERROR':
            return action.payload;
        case 'CLEAR_ERROR':
            return action.payload;
        default:
            return errors;
    }
}
export default errorReducer;