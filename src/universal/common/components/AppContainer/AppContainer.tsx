import * as React from 'react';
import * as Helmet from 'react-helmet';
import {push as pushState} from 'react-router-redux';

const {connect} = require('react-redux');
const {asyncConnect} = require('redux-async-connect');
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const muiTheme = getMuiTheme({ });

@asyncConnect([{
  promise: ({store: {getState, dispatch}}) => Promise.resolve(),
}])
@connect(
  ({reduxAsyncConnect}) => ({
    reduxAsyncConnect,
  }),
  { })
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

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={css.AppContainer}>
          <Helmet />
          <div>
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
