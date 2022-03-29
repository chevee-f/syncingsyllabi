import { GET_USER, GET_USER_BY_EMAIL, UPDATE_USER } from './../actions/user';

const initialState = {
  user: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.payload};
    case GET_USER_BY_EMAIL:
      return {...state, user: action.payload};
    case UPDATE_USER:
      return {...state, user: action.payload};
    default:
      return state;
  }
}
export default userReducer;