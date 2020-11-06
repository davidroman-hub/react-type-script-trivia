import { createStore as reduxCreateStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const createStore = (): Store => {
  const store = reduxCreateStore(reducers, applyMiddleware(thunk));
  return store;
};
