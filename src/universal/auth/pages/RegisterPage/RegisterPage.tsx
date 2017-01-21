import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Paper} from 'universal/common/components';
import {registerUserAction} from 'universal/auth/actions';
import RegisterForm, {REGISTER_FORM_NAME} from './RegisterForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    username: auth.username,
    encodedPassword: auth.encodedPassword,
    isRegistering: auth.isRegistering,
    registerError: auth.registerError,
  }),
  {
    registerUserAction,
  })
export default class RegisterPage extends Component<any, any> {
  public static propTypes = {
    username: PropTypes.string.isRequired,
    encodedPassword: PropTypes.string.isRequired,
    isRegistering: PropTypes.bool.isRequired,
    registerError: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    registerUserAction: PropTypes.func.isRequired,
  };

  public componentDidUpdate(prevProps, prevState) {
    const {username, encodedPassword} = this.props;
    if (username && encodedPassword && username !== prevProps.username && encodedPassword !== prevProps.encodedPassword) {
      (this.refs as any).form.submit();
    }
  }

  public async handleSubmit(data) {
    const response = await this.props.registerUserAction(data);
  }

  public render() {
    const css = require('./RegisterPage.scss');
    const {
      isRegistering,
      registerError,
      username,
      encodedPassword,
    } = this.props;
    const onSubmit = data => this.handleSubmit(data);

    return (
      <Paper className={css.RegisterPage}>
        <Helmet title="EverReal - Register" />

        <h3>Sign up to EverReal</h3>

        <RegisterForm
          isLoading={isRegistering}
          errorMessage={registerError}
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
