import * as React from 'react';
import {Router} from 'react-router';
import {getRoutes} from 'universal/routes';
import {Provider} from 'react-redux';
const {ReduxAsyncConnect} = require('redux-connect');
const {IntlProvider} = require('er-common-components/lib/translations');
const {Component, PropTypes} = React;

export default class ClientApp extends Component<any, any> {
  public static propTypes = {
    client: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    language: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
  };

  public render() {
    const {
      client,
      history,
      store,
      language,
      messages,
    } = this.props;

    const filter = item => !item.deferred;
    const render: any = props => <ReduxAsyncConnect {...props} helpers={{client}} filter={filter} />;
    let component = (
      <Router
        render={render}
        history={history}
      >
        {getRoutes()}
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

    return (
      <Provider store={store} key="provider">
        <IntlProvider locale={language} messages={messages}>
          {component}
        </IntlProvider>
      </Provider>
    );
  }
}
