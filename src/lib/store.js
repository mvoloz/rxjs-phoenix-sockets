import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { rootEpic }  from '../epics';
import { createEpicMiddleware } from 'redux-observable';



const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  rootReducer,

/*  applyMiddleware(epicMiddleware)
  compose(
    applyMiddleware(epicMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )*/
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

export { store };
