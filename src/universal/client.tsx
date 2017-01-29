import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {createHistory} from 'history';
import {useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createStore} from 'universal/helpers/createStore';
import ApiClient from 'universal/helpers/ApiClient';
import ClientApp from 'universal/ClientApp';
import {AppContainer} from 'react-hot-loader';
const {initLocaleData} = require('er-common-components/lib/translations');

injectTapEventPlugin();
initLocaleData();

const {language = '', messages = []} = (window as any).__locale;
const initialStoreData = (window as any).__data;
const browserHistory = useRouterHistory(createHistory)({basename: `/${language}`});
const client = new ApiClient(null, null, language);
const store = createStore(browserHistory, client, initialStoreData);
const history = syncHistoryWithStore(browserHistory, store);
const destinationElement = document.getElementById('content');
const props = {client, history, store, language, messages};

ReactDOM.render(<AppContainer><ClientApp {...props} /></AppContainer>, destinationElement);

if (__DEVELOPMENT__ && (module as any).hot) {
  (module as any).hot.accept('universal/ClientApp', () => {
    const ClientAppReloded: any = require('universal/ClientApp').default;
    ReactDOM.render(<AppContainer><ClientAppReloded {...props} /></AppContainer>, destinationElement);
  });
}

if (process.env.NODE_ENV !== 'production') {
  (window as any).React = React; // enable debugger

  if (!destinationElement || !destinationElement.firstChild || !destinationElement.firstChild.attributes || !destinationElement.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
