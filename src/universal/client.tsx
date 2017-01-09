import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createStore} from './createStore';
import {getRoutes} from './routes';

injectTapEventPlugin();

const {ReduxAsyncConnect} = require('redux-async-connect');

const client = null;
const initialData = (window as any).__data;
const store = createStore(null, client, initialData);
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

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  destinationElement);
