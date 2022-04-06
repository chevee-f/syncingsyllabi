import { GET_GOAL_BY_USER, ADD_GOAL, GET_GOAL_DETAIL } from './../actions/goal';

const initialState = {
  goals: [],
};

function goalReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GOAL_BY_USER:
      return {...state, goals: action.payload};
    case GET_GOAL_DETAIL:
      return {...state, goals: action.payload};
    case ADD_GOAL:
      return {...state, goals: action.payload};
    default:
      return state;
  }
}
export default goalReducer;