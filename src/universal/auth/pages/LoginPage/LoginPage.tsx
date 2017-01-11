import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Paper} from 'universal/common/components';
import {reset} from 'redux-form';
import {loginUserAction} from 'universal/auth/actions';
import LoginForm, {LOGIN_FORM_NAME} from './LoginForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    isLoggingIn: auth.isLoggingIn,
    loginError: auth.loginError,
  }),
  {
    reset,
    loginUserAction,
  })
export default class LoginPage extends Component<any, any> {
  public static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    loginUserAction: PropTypes.func.isRequired,
  };

  public async handleSubmit(data) {
    const {email, password} = data;
    const response = await this.props.loginUserAction(email, password);
    if (response && response.result) {
      this.props.reset(LOGIN_FORM_NAME);
    }
  }

  public render() {
    const css = require('./LoginPage.scss');
    const {
      isLoggingIn,
      loginError,
    } = this.props;

    return (
      <Paper className={css.LoginPage}>
        <Helmet title="EverReal - Log in" />
        <h3>Login Page</h3>

        <LoginForm
          isLoading={isLoggingIn}
          errorMessage={loginError}
          onSubmit={data => this.handleSubmit(data)}/>
      </Paper>
    );
  }
}
