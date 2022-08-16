import { ADD_NOTIFICATION_TOKEN, GET_USER_NOTIFICATION } from './../actions/notification';

const initialState = {
  notification: [],
};

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION_TOKEN:
      return {...state, notification: action.payload};
    case GET_USER_NOTIFICATION:
      return {...state, notification: action.payload};
    default:
      return state;
  }
}
export default notificationReducer;