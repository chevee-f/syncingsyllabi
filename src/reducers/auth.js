import { SIGN_IN, SIGN_OUT } from './../actions/auth';

  const initialLoginState = {
    isLoading: true,
    userToken: null
  }

  function authReducer(state = initialLoginState, action) {
    switch (action.type) {
      case SIGN_IN:
        return {
            ...state, 
            auth: action.payload
        };
      case SIGN_OUT:
        return {
            ...state, 
            auth: null
        };
      default:
        return state;
    }
  }
  export default authReducer;
