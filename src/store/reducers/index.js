import { combineReducers } from 'redux';
import noteTreeReducer from './note.tree';
import mindTableHorReducer from './mind.table.hor';

const rootReducer = combineReducers({
  noteTreeReducer,
  mindTableHorReducer,
});

export default rootReducer;
