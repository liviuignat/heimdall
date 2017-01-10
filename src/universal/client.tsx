import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createHistory} from 'history';
import {Router, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createStore} from './helpers/createStore';
import ApiClient from './helpers/ApiClient';
import {getRoutes} from './routes';

injectTapEventPlugin();

const {ReduxAsyncConnect} = require('redux-async-connect');

const client = new ApiClient();
const initialStoreData = (window as any).__data;
const browserHistory = useRouterHistory(createHistory)({basename: `/`});

const store = createStore(browserHistory, client, initialStoreData);
const history = syncHistoryWithStore(browserHistory, store);
const destinationElement = document.getElementById('content');

const renderer: any = (props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />;
let component = (
  <Router
    render={renderer}
    history={history}>
    {getRoutes(store)}
  </Router>
);

if (__DEVTOOLS__) {
  const DevTools = require('./common/components/DevTools/DevTools').default;
  component = (
    <div>
      {component}
      <DevTools />
    </div>
  );
}


ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  destinationElement);
