import { GET_GOAL_BY_USER, ADD_GOAL, GET_GOAL_DETAIL, GET_GOAL_BY_USER_SORT_BY } from './../actions/goal';

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
    case GET_GOAL_BY_USER_SORT_BY:
      return {...state, goals: action.payload};
    default:
      return state;
  }
}
export default goalReducer;