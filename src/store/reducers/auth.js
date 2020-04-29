import { authConstants } from '../constants';

const DEFAULT_STATE = {
  token: localStorage.getItem('token') || null,
  err: '',
  user: JSON.parse(localStorage.getItem('user')) || {},
  isLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    // sign up
    case authConstants.SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      }
    case authConstants.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    // sign in
    case authConstants.SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      }
    case authConstants.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    // about user
    case authConstants.ABOUT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.ABOUT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    case authConstants.ABOUT_USER_FAILRE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    default:
      return state;
  };
};
