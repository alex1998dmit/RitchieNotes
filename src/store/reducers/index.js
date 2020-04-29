import { combineReducers } from 'redux';
import appReducer from './app';
import noteTreeReducer from './note.tree';
import mindTableHorReducer from './mind.table.hor';
import authReducer from './auth';

const rootReducer = combineReducers({
  app: appReducer,
  noteTree: noteTreeReducer,
  mindTableHorizantal: mindTableHorReducer,
  auth: authReducer,
});

export default rootReducer;
