import * as React from 'react';
import * as Helmet from 'react-helmet';
import {FormattedLink, FormattedMessage, Paper} from 'universal/common/components';
import {registerUserAction} from 'universal/auth/actions';
import RegisterForm from './RegisterForm';
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
    registerUserAction: PropTypes.func.isRequired,
  };

  public componentDidUpdate(prevProps, prevState) {
    const {username, encodedPassword} = this.props;
    if (username && encodedPassword && username !== prevProps.username && encodedPassword !== prevProps.encodedPassword) {
      (this.refs as any).form.submit();
    }
  }

  public async handleSubmit(data: IUser) {
    if (data && data.email) {
      await this.props.registerUserAction(data);
    }
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

        <h3><FormattedMessage id="RegisterPage.page.title" /></h3>

        <RegisterForm
          isLoading={isRegistering}
          errorMessage={registerError}
          onSubmit={onSubmit}
        />

        <div className={css.Links_container}>
          <FormattedLink href="/login" className={css.Links_login}><FormattedMessage id="LoginPage.label.login" /></FormattedLink>
          <FormattedLink href="/resetpassword" className={css.Links_resetPassword}><FormattedMessage id="LoginPage.label.reset.password" /></FormattedLink>
        </div>

        <form ref="form" style={{display: 'none'}} action="/login" method="post">
          <input name="username" value={username} />
          <input name="password" type="password" value={encodedPassword} />
        </form>
      </Paper>
    );
  }
}
