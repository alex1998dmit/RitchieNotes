import to from 'await-to-js';
import axios from 'axios';
import { tagConstants } from '../constants';
import { axiosConfigs } from '../../utils/configs';

const getTags = () => {
  const request = () => {
    return {
      type: tagConstants.GET_TAGS_LIST_REQUEST
    };
  };
  const success = items => {
    return {
      type: tagConstants.GET_TAGS_LIST_SUCCESS,
      payload: items,
    }
  };
  const failure = err => {
    return {
      type: tagConstants.GET_TAGS_LIST_FAILURE,
      payload: err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    console.log(token);
    const [err, resp] = await to(
      axios.get(`${axiosConfigs.host}/tags`, { headers: {
        Authorization: token,
      }})
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(resp.data.items));
    return resp.data.items;
  };
};

const getNotes = tagId => {
  const request = () => {
    return {
      type: tagConstants.GET_TAG_NODES_REQUEST
    };
  };
  const success = items => {
    return {
      type: tagConstants.GET_TAG_NODES_SUCCESS,
      payload: items,
    }
  };
  const failure = err => {
    return {
      type: tagConstants.GET_TAG_NODES_FAILURE,
      payload: err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    const [err, resp] = await to(
      axios.get(`${axiosConfigs.host}/tags/${tagId}/notes`, { headers: {
        Authorization: token,
      }})
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(resp.data.items));
    return resp.data.items;
  };  
};

const addTag = data => {
  const request = () => {
    return {
      type: tagConstants.ADD_TAG_REQUEST
    };
  };
  const success = (item) => {
    console.log({ item: data, index: 0 })
    return {
      type: tagConstants.ADD_TAG_SUCCESS,
      payload: { item, index: 0 },
    }
  };
  const failure = err => {
    return {
      type: tagConstants.ADD_TAG_FAILURE,
      payload: err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    const [err, resp] = await to(
      axios.post(`${axiosConfigs.host}/tags`, data, { headers: {
        Authorization: token,
      }})
    );
    console.log(resp, err);
    if (err) {
      console.log(err);
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(resp.data.item));
    return resp.data.item;
  };
};

const updateTag = (index, tagId, data) => {
  const request = () => {
    return {
      type: tagConstants.UPDATE_TAG_REQUEST
    };
  };
  const success = () => {
    return {
      type: tagConstants.UPDATE_TAG_SUCCESS,
      payload: { index, item: data },
    }
  };
  const failure = err => {
    return {
      type: tagConstants.UPDATE_TAG_FAILURE,
      payload: err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    const [err, resp] = await to(
      axios.put(`${axiosConfigs.host}/tags/${tagId}`, data, { headers: {
        Authorization: token,
      }})
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(resp.data.item));
    return resp.data.item;
  };
};

const removeTag = (index, tagId) => {
  const request = () => {
    return {
      type: tagConstants.REMOVE_TAG_REQUEST
    };
  };
  const success = () => {
    return {
      type: tagConstants.REMOVE_TAG_SUCCESS,
      payload: index,
    }
  };
  const failure = err => {
    return {
      type: tagConstants.REMOVE_TAG_FAILURE,
      payload: err,
    }
  }

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    console.log(tagId);
    const [err, resp] = await to(
      axios.delete(`${axiosConfigs.host}/tags/${tagId}`, { headers: {
        Authorization: token,
      }})
    );
    if (err) {
      console.log(err);
      dispatch(failure(err));
      throw err;
    }
    dispatch(success());
    return resp.data.item;
  };
};

// get items by note id
const getItemsByNote = noteId => {
  const request = () => {
    return {
      type: tagConstants.GET_ITEMS_BY_NOTE_REQUEST
    };
  };
  const success = items => {
    return {
      type: tagConstants.GET_ITEMS_BY_NOTE_SUCCESS,
      payload: items,
    };
  };
  const failure = err => {
    return {
      type: tagConstants.GET_ITEMS_BY_NOTE_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    const token = localStorage.getItem('token');
    const [err, resp] = await to(
      axios.get(`${axiosConfigs.host}/notes/${noteId}/tags`, { headers: {
        Authorization: token,
      }})
    );
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    console.log(resp);
    dispatch(success(resp.data.items));
    return resp.data.items;
  };
};

const selectTag = index => {
  return {
    type: tagConstants.SELECT_TAG,
    payload: index,
  }
}

const resetSelectTag = () => {
  return {
    type: tagConstants.RESET_SELECT_TAG,
  }
}

export default {
  getTags,
  getNotes,
  addTag,
  selectTag,
  resetSelectTag,
  updateTag,
  removeTag,
  getItemsByNote,
};