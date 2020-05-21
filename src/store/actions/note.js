import to from 'await-to-js';
import axios from 'axios';
import { noteConstants } from '../constants';
import { axiosConfigs } from '../../utils/configs';
import { updateNode, addChildNode } from '../../services/tree.handles';

const getUserItems = () => {
  const request = () => {
    return {
      type: noteConstants.GET_USER_ITEMS_REQUEST,
    };
  };
  const success = items => {
    return {
      type: noteConstants.GET_USER_ITEMS_SUCCESS,
      payload: items,
    };
  };
  const failure = err => {
    return {
      type: noteConstants.GET_USER_ITEMS_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    const [err, resp] = await to(axios.get(
      `${axiosConfigs.host}/notes`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
    ));
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    const { items } =resp.data;
    dispatch(success(items));
    return items;
  };
};

const getTagNotes = tagId => {
  const request = () => {
    return {
      type: noteConstants.GET_TAG_NOTES_REQUEST
    };
  };
  const success = items => {
    return {
      type: noteConstants.GET_TAG_NOTES_SUCCESS,
      payload: items,
    };
  };
  const failure = err => {
    return {
      type: noteConstants.GET_TAG_NOTES_FAILURE,
      payload: err,
    };
  };

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
    console.log(resp);
    dispatch(success(resp.data.items));
    return resp.data.items;
  };
};

const searchUserNotesByTitle = (data) => {
  const request = () => {
    return {
      type: noteConstants.SEARCH_BY_TITLE_REQUEST
    };
  };
const success = items => {
    return {
      type: noteConstants.SEARCH_BY_TITLE_SUCCESS,
      payload: items,
    };
  };
  const failure = err => {
    return {
      type: noteConstants.SEARCH_BY_TITLE_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    dispatch(success([{ title: 'New One' }, { title: 'New Thrir' }, { title: 'Something' }]));
    return [];
  };
};

const getItem = noteId => {
  const request = () => {
    return {
      type: noteConstants.GET_ITEM_REQUEST
    };
  };
  const success = item => {
    return {
      type: noteConstants.GET_ITEM_SUCCESS,
      payload: item,
    };
  };
  const failure = err => {
    return {
      type: noteConstants.GET_ITEM_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    const [err, resp] = await to(axios.get(
      `${axiosConfigs.host}/notes/${noteId}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
    ));
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    dispatch(success(resp.data.item));
    return resp.data.item;
  };
}

// update
const updateItemNode = (note, nodeId, item) => {
  const updatedTree = updateNode(nodeId, item, note.tree);
  return updateItem(note._id, { ...note, tree: updatedTree });
};

const updateItem = (noteId, data) => {
  const request = () => {
    return {
      type: noteConstants.UDPATE_NOTE_REQUEST
    };
  };
  const success = updatedItem => {
    return {
      type: noteConstants.UDPATE_NOTE_SUCCESS,
      payload: updatedItem,
    };
  };
  const failure = err => {
    return {
      type: noteConstants.UDPATE_NOTE_FAILURE,
      payload: err,
    };
  };

  return async dispatch => {
    dispatch(request());
    const [err, resp] = await to(axios.put(
      `${axiosConfigs.host}/notes/${noteId}`,
      { ...data },
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
    ));
    if (err) {
      dispatch(failure(err));
      throw err;
    }
    console.log(resp.data.item);
    dispatch(success(resp.data.item));
    return resp.data.item;
  };
};

// create node child
const addNodeChild = (note, nodeId, node) => {
  const updatedTree = addChildNode(nodeId, node, note.tree);
  console.log(updatedTree);
  return {
    type: noteConstants.ADD_NODE_CHILD,
    payload: {...note, tree: updatedTree },
  };
};

export default {
  getUserItems,
  getTagNotes,
  searchUserNotesByTitle,
  getItem,
  updateItem: updateItemNode,
  addNodeChild,
};
