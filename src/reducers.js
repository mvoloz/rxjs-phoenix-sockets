import { combineReducers } from 'redux';
import { pingReducer } from './ping';
import { socketReducer } from './components/socker/reducers';


export const rootReducer = combineReducers({
  pingReducer,
  socketReducer
});

export default rootReducer;
