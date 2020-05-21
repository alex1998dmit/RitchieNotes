import { tagConstants } from '../constants';

const DEFAULT_STATE = {
  err: '',
  isLoading: false,
  items: [],
  selected: { _id: 0, title: null },
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    // tags list
    case tagConstants.GET_TAGS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case tagConstants.GET_TAGS_LIST_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case tagConstants.GET_TAGS_LIST_FAILURE:
      return {
        ...state,
        err: action.payload,
        isLoading: false,
      };
    // create tag
    case tagConstants.ADD_TAG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case tagConstants.ADD_TAG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: [ ...state.items.slice(0, action.payload.index), action.payload.item, ...state.items.slice(action.payload.index) ],
      }
    case tagConstants.ADD_TAG_FAILURE:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
      }
    // update tag
    case tagConstants.UPDATE_TAG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case tagConstants.UPDATE_TAG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: state.items.map((item, index) => {
          if (index !== action.payload.index) {
            return item
          }  
          return {
            ...item,
            ...action.payload.item
          }
        }),
      };
      case tagConstants.UPDATE_TAG_FAILURE:
        return {
          ...state,
          isLoading: false,
          err: action.payload,
        };
    // remove tag
    case tagConstants.REMOVE_TAG_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case tagConstants.REMOVE_TAG_SUCCESS:
      return {
        ...state,
        isLoading: true,
        items: [
          ...state.items.slice(0, action.payload), ...state.items.slice(action.payload + 1)
        ],
      };
      case tagConstants.REMOVE_TAG_FAILURE:
        return {
          ...state,
          isLoading: false,
          err: action.payload,
        };
    // select tag
    case tagConstants.SELECT_TAG:
      return {
        ...state,
        selected: state.items[action.payload],
      }
    case tagConstants.RESET_SELECT_TAG:
      return {
        ...state,
        selected: {
          id: 0,
          title: '',
        },
      };
    // get items by note id
    case tagConstants.GET_ITEMS_BY_NOTE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case tagConstants.GET_ITEMS_BY_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        items: action.payload,
      };
      case tagConstants.GET_ITEMS_BY_NOTE_FAILURE:
        return {
          ...state,
          isLoading: false,
          err: action.payload,
        };
    // notes
    case tagConstants.GET_TAG_NODES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  };
};
