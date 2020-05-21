import { combineReducers } from 'redux';
import appReducer from './app';
import noteTreeReducer from './note.tree';
import mindTableHorReducer from './mind.table.hor';
import authReducer from './auth';
import tagReducer from './tag';
import notesReducer from './note';

const rootReducer = combineReducers({
  app: appReducer,
  noteTree: noteTreeReducer,
  mindTableHorizantal: mindTableHorReducer,
  auth: authReducer,
  tag: tagReducer,
  note: notesReducer,
});

export default rootReducer;
