import { combineReducers } from 'redux';
import { socketReducer } from './components/socker/reducers';


export const rootReducer = combineReducers({
  socketReducer
});

export default rootReducer;
