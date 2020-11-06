import { combineReducers } from 'redux';
import { reducer as appReducer, State as AppState } from './App';

export interface State {
  appReducer: AppState;
}

export default combineReducers({
  appReducer,
});
