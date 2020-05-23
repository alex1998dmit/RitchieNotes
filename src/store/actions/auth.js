import axios from 'axios';
import to from 'await-to-js';
import { axiosConfigs } from '../../utils/configs';
import { authConstants } from '../constants';

const setTokenToLocalStorage = token => {
  localStorage.setItem('token', token);
};

const setUserCredsToStorage = data => {
  localStorage.setItem('user',  JSON.stringify(data));
};

const signUp = data => {
  const request = () => {
    return {
      type: authConstants.SIGN_UP_REQUEST
    };
  };
  const success = token => {
    return {
      type: authConstants.SIGN_UP_SUCCESS,
      payload: token,
    }
  };
  const failure = err => {
    return {
      type: authConstants.SIGN_UP_FAILURE,
      err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const [err, resp] = await to(
      axios.post(`${axiosConfigs.host}/auth/signup`, data)
    );
  if (err) {
      dispatch(failure(err));
      throw err;
    }
    setTokenToLocalStorage(resp.data.token);
    dispatch(success(resp.data.token));
    return resp.data.token;
  };
};

const signIn = data => {
  const request = () => {
    return {
      type: authConstants.SIGN_UP_REQUEST
    };
  };
  const success = token => {
    return {
      type: authConstants.SIGN_IN_SUCCESS,
      payload: token,
    }
  };
  const failure = err => {
    return {
      type: authConstants.SIGN_UP_FAILURE,
      err,
    }
  }
  return async dispatch => {
    dispatch(request());
    const [err, resp] = await to(
      axios.post(`${axiosConfigs.host}/auth/signin`, data)
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    setTokenToLocalStorage(resp.data.token);
    dispatch(success(resp.data.token));
    return resp.data.token;
  }
}

const aboutUser = token => {
  const request = () => {
    return {
      type: authConstants.ABOUT_USER_REQUEST
    };
  };
  const success = user => {
    return {
      type: authConstants.ABOUT_USER_SUCCESS,
      payload: user,
    }
  };
  const failure = err => {
    return {
      type: authConstants.ABOUT_USER_FAILRE,
      err,
    }
  };

  return async dispatch => {
    dispatch(request());
    console.log('strat');
    const [err, resp] = await to(axios.get(
      `${axiosConfigs.host}/auth/about`,{
        headers: {
          Authorization: token,
        }
      })
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    const user = resp.data.user;
    setUserCredsToStorage(user);
    dispatch(success(user));
    console.log(user);
    return user;
  };
};

const updateUser = data => {
  const request = () => {
    return {
      type: authConstants.ABOUT_USER_REQUEST
    };
  };
  const success = user => {
    return {
      type: authConstants.ABOUT_USER_SUCCESS,
      payload: user,
    }
  };
  const failure = err => {
    return {
      type: authConstants.ABOUT_USER_FAILRE,
      err,
    }
  };

  return dispatch => {
    dispatch(request());
    
  };
};

export default {
  signUp,
  signIn,
  aboutUser,
};
