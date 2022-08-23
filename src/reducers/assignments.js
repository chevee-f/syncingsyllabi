import { GET_ASSIGNMENTS_BY_USER } from '../actions/assignments';

const initialState = {
  assignments: [],
};

function assignmentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ASSIGNMENTS_BY_USER:
      return {...state, assignments: action.payload};
    case 'RESET':
      return {...state, assignments: []};
    default:
      return state;
  }
}
export default assignmentsReducer;