import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import reducer from './../reducer';
const {clientMiddleware} = require('er-common-components/lib/redux/clientMiddleware');

export function createStore(history, client, data = {}) {
  const middleware = [clientMiddleware(client), routerMiddleware(history)];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const globalWindow: any = window as any;
    const {persistState} = require('redux-devtools');
    const DevTools = require('./../common/components/DevTools/DevTools').default;
    finalCreateStore = compose<any, any, any, any>(
      applyMiddleware(...middleware),
      globalWindow.devToolsExtension ? globalWindow.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && (module as any).hot) {
    (module as any).hot.accept('./../reducer', () => store.replaceReducer(require('./../reducer')));
  }

  return store;
}
