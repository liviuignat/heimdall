import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createMemoryHistory} from 'react-router';
import {match} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'universal/helpers/createStore';
import {getRoutes} from 'universal/routes';
import ApiClient from 'universal/helpers/ApiClient';
import Html from 'universal/common/components/Html/Html';

const {ReduxAsyncConnect, loadOnServer} = require('redux-connect');
const {IntlProvider} = require('er-common-components/lib/translations');

injectTapEventPlugin();

export function reactComponentMiddleware() {
  return (req, res, next) => {
    const location: string = req.originalUrl;

    if (location && location.startsWith('/dialog')) {
      return next();
    }

    if (location && location.startsWith('/api')) {
      return next();
    }

    const requestLanguage = req.getLanguage();
    const client = new ApiClient(req, res, requestLanguage);
    const history = createMemoryHistory(location);
    const store = createStore(history, client);
    const routes = getRoutes();

    if (__DEVELOPMENT__) {
      webpackIsomorphicTools.refresh();
    }

    function hydrateOnClient() {
      const html = ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} language={requestLanguage} />);
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
        loadOnServer(Object.assign({}, renderProps, {store, helpers: {client}}))
          .then(() => {
            req.setLanguage({language: (renderProps.params as any).language});
            const language = req.getLanguage();
            const languageMessages = req.getTranslation({language});
            const component = (
              <Provider store={store} key="provider">
                <IntlProvider locale={language} messages={languageMessages}>
                  <ReduxAsyncConnect {...renderProps} />
                </IntlProvider>
              </Provider>
            );
            const html = <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} language={language} />;
            return res.status(200).send('<!doctype html>\n' + ReactDOM.renderToString(html));
          });
      } else {
        return next();
      }
    });
  };
}
