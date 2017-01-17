import * as React from 'react';
import * as Helmet from 'react-helmet';
import {push as pushState} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {getDefaultMuiTheme} from 'theme/materialTheme';
import {getAppMetadata} from 'appMetadata';
import AppHeader from 'universal/common/components/AppHeader/AppHeader';
import AppFooter from 'universal/common/components/AppFooter/AppFooter';
const {connect} = require('react-redux');
const {asyncConnect} = require('redux-connect');

@asyncConnect([{
  promise: ({store: {getState, dispatch}}) => Promise.resolve(),
}])
@connect(
  ({reduxAsyncConnect}) => ({
    reduxAsyncConnect,
  }), { })
export default class AppContainer extends React.Component<any, any> {
  public static propTypes = {
    children: React.PropTypes.object.isRequired,
    reduxAsyncConnect: React.PropTypes.object.isRequired,
  };

  public static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  public render() {
    const css = require('./AppContainer.scss');
    const {children, reduxAsyncConnect} = this.props;
    const muiTheme = getMuiTheme(getDefaultMuiTheme());
    const appMetadata = getAppMetadata();

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={css.AppContainer}>
          <Helmet {...appMetadata} />
          
          <AppHeader />
          {children}
          <AppFooter />
        </div>
      </MuiThemeProvider>
    );
  }
}
