import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';

export function createStore(history, client, data = {}) {
  const middleware = [];
  const finalCreateStore = applyMiddleware(...middleware)(_createStore);;
  const store = finalCreateStore(reducer, data);
  return store;
}
