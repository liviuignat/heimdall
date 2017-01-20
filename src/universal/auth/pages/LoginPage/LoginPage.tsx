import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Paper} from 'universal/common/components';
import {loginUserAction} from 'universal/auth/actions';
import LoginForm, {LOGIN_FORM_NAME} from './LoginForm';
const {connect} = require('react-redux');
const md5 = require('blueimp-md5');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    username: auth.username,
    encodedPassword: auth.encodedPassword,
    isLoggingIn: auth.isLoggingIn,
    loginError: auth.loginError,
  }),
  {
    loginUserAction,
  })
export default class LoginPage extends Component<any, any> {
  public static propTypes = {
    username: PropTypes.string.isRequired,
    encodedPassword: PropTypes.string.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired,
    loginUserAction: PropTypes.func.isRequired,
  };

  public componentDidUpdate(prevProps, prevState) {
    const {username, encodedPassword} = this.props;
    if (username && encodedPassword && username !== prevProps.username && encodedPassword !== prevProps.encodedPassword) {
      (this.refs as any).form.submit();
    }
  }

  public handleSubmit(data) {
    const {email, password} = data;
    const response = this.props.loginUserAction(email, password);
  }

  public render() {
    const css = require('./LoginPage.scss');
    const {
      isLoggingIn,
      loginError,
      username,
      encodedPassword,
    } = this.props;
    const onSubmit = data => this.handleSubmit(data);

    return (
      <Paper className={css.LoginPage}>
        <Helmet title="EverReal - Log in" />
        <h3>Login Page</h3>

        <LoginForm
          isLoading={isLoggingIn}
          errorMessage={loginError}
          onSubmit={onSubmit}
        />

        <form ref="form" style={{display: 'none'}} action="/login" method="post">
          <input name="username" value={username} />
          <input name="password" type="password" value={encodedPassword} />
        </form>
      </Paper>
    );
  }
}
