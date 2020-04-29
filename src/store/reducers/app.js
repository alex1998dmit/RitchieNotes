import { appConstants } from '../constants';

const initState = {
  isLoading: false,
  authState: appConstants.GUEST,
};

export default (state = initState, action) => {
  switch (action.type) {
    // is loading app
    case appConstants.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };     
    // app is loaded
    case appConstants.IS_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    // change auth state
    case appConstants.CHANGE:
      return {
        ...state,
        authState: action.payload,
      };
    default:
      return state;
  };
};
