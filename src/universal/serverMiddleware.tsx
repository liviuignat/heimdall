import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createMemoryHistory} from 'react-router';
import {match} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from './helpers/createStore';
import {getRoutes} from './routes';
import ApiClient from './helpers/ApiClient';
import Html from './common/components/Html/Html';

const {ReduxAsyncConnect, loadOnServer} = require('redux-async-connect');

injectTapEventPlugin();

export function reactComponentMiddleware() {
  return (req, res, next) => {
    const client = new ApiClient(req, res);
    const location = req.originalUrl;
    const history = createMemoryHistory(location);
    const store = createStore(history, client);
    const routes = getRoutes(store);

    if (__DEVELOPMENT__) {
      webpackIsomorphicTools.refresh();
    }

    function hydrateOnClient() {
      const html = ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />);
      res.send(`<!doctype html>\n ${html}`);
    }

    match({ history, routes, location }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        return res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500);
        return hydrateOnClient();
      } else if (renderProps) {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
        const html = <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />;
        return res.status(200).send('<!doctype html>\n' + ReactDOM.renderToString(html));
      } else {
        return next();
      }
    });
  };
}
