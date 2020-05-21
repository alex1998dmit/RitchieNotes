import { noteConstants } from '../constants';

const initState = {
    isLoading: false,
    items: [],
    selected: {
      title: '',
      tree: {
        children: [],
      },
    },
    err: null,
};

export default (state = initState, action) => {
  switch(action.type) {
    // get user items
    case noteConstants.GET_USER_ITEMS_REQUEST:
        return {
            ...state,
            isLoading: true,
        };
    case noteConstants.GET_USER_ITEMS_SUCCESS:
        return {
            ...state,
            items: action.payload,
        };
    case noteConstants.GET_USER_ITEMS_FAILURE:
        return {
            ...state,
            err: action.payload
        };
    // get tag items
    case noteConstants.GET_TAG_NOTES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case noteConstants.GET_TAG_NOTES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case noteConstants.GET_TAG_NOTES_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    // search by title
    case noteConstants.SEARCH_BY_TITLE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case noteConstants.SEARCH_BY_TITLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        findedItems: action.payload,
      };
    case noteConstants.SEARCH_BY_TITLE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    // get single note
    case noteConstants.GET_ITEM_REQUEST:
      return {
        ...state,
        isLoading: false,
      };
    case noteConstants.GET_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selected: action.payload,
      };
    case noteConstants.GET_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    // update note
    case noteConstants.UDPATE_NOTE_REQUEST:
      return {
        ...state,
        isLoading: false,
      };
    case noteConstants.UDPATE_NOTE_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        selected: { 
          ...state.selected,
          ...action.payload,
          // tags: action.payload.tags,
          // questions: action.payload.questions,
          // tree: action.payload.tree
        },
      };
    case noteConstants.UDPATE_NOTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      };
    // add child node
    case noteConstants.ADD_NODE_CHILD:
      return {
        ...state,
        selected: {
          ...state.selected,
          ...action.payload,
        },
      };
    // select tag
    case noteConstants.SELECT_ITEM:
      return {
        ...state,
        isLoading: false,
        select: state.items[action.payload]
      };
    default:
      return state;
  };
};
