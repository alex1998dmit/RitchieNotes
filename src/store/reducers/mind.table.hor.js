const emptyBlock = {
  id: 0,
  title: '',
  description: '',
  children: [],
};

export default (state = { table: [], tableUIState: { isSelected: emptyBlock, isEditing: null } }, action) => {
  switch(action.type) {
    case 'SET_HOR_MIND_TABLE':
      return {...state, table: action.table };
    case 'UPDATE_HOR_MIND_TABLE_BLOCK':
      return { ...state, table: 
        state.map(row => 
          row.map(el => (el.id === action.id) ?  
            { ...el, ...action.block } :
            el)
          )
        };
    case 'REMOVE_HOR_MIND_TABLE_BLOCK':
        return state.map(row => row.filter(el => el.id !== action.id));
    case 'SET_STATUS_TO_HOR_MIND_TABLE_BLOCK':
      return {...state, tableUIState: { ...state.tableUIState, [action.status]: action.id } };
    case 'SET_SELECTED_HOR_MIND_TABLE_BLOCK':
      return {...state, tableUIState: { ...state.tableUIState, isSelected: action.block } };
    case 'RESET_UI_STATUS_AT_HOR_MIND_TABLE': 
      return {...state, tableUIState: { ...state.tableUIState, [action.status]: null } };
    case 'RESET_UI_STATUSES_AT_HOR_MIND_TABLE':
      return { ...state, tableUIState: { isSelected: emptyBlock, isEditing: null } };
    default:      
      return state;
  };
};
