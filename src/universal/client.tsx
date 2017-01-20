import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createHistory} from 'history';
import {Router, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {createStore} from 'universal/helpers/createStore';
import ApiClient from 'universal/helpers/ApiClient';
import {getRoutes} from 'universal/routes';

injectTapEventPlugin();

const {ReduxAsyncConnect} = require('redux-connect');

const client = new ApiClient();
const initialStoreData = (window as any).__data;
const browserHistory = useRouterHistory(createHistory)({basename: `/`});

const store = createStore(browserHistory, client, initialStoreData);
const history = syncHistoryWithStore(browserHistory, store);
const destinationElement = document.getElementById('content');

const filter = item => !item.deferred;
const renderer: any = (props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={filter} />;
let component = (
  <Router
    render={renderer}
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

if (__DEVTOOLS__) {
  const DevTools = require('universal/common/components/DevTools/DevTools').default;
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
