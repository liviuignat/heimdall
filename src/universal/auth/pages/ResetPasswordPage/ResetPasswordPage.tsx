import * as React from 'react';
import * as Helmet from 'react-helmet';
import {FormattedLink, FormattedMessage, Paper} from 'universal/common/components';
import {reset} from 'redux-form';
import {resetUserPassword} from 'universal/auth/actions';
import ResetPasswordForm, {RESET_PASSWORD_FORM_NAME} from './ResetPasswordForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    isResetingPassword: auth.isResetingPassword,
    isResetPasswordSuccess: auth.isResetPasswordSuccess,
    resetPasswordError: auth.resetPasswordError,
  }),
  {
    reset,
    resetUserPassword,
  })
export default class ResetPasswordPage extends Component<any, any> {
  public static propTypes = {
    isResetingPassword: PropTypes.bool.isRequired,
    resetPasswordError: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    resetUserPassword: PropTypes.func.isRequired,
  };

  public async handleSubmit(data) {
    const {email} = data;

    if (email) {
      const response = await this.props.resetUserPassword(email);
      if (response && response.result) {
        this.props.reset(RESET_PASSWORD_FORM_NAME);
      }
    }
  }

  public render() {
    const css = require('./ResetPasswordPage.scss');
    const {
      isResetingPassword,
      isResetPasswordSuccess,
      resetPasswordError,
    } = this.props;
    const onSubmit = data => this.handleSubmit(data);

    const component = isResetPasswordSuccess ?
        <div className={css.SuccessMessage}>
          Yay! Check your email!
        </div> :
        <ResetPasswordForm
          isLoading={isResetingPassword}
          errorMessage={resetPasswordError}
          onSubmit={onSubmit}
        />;

    return (
      <Paper className={css.ResetPasswordPage}>
        <Helmet title="EverReal - reset password" />
        <h3><FormattedMessage id="ResetPasswordPage.page.title" /></h3>

        {component}

        <div className={css.Links_container}>
          <FormattedLink href="/login" className={css.Links_login}><FormattedMessage id="LoginPage.label.login" /></FormattedLink>
          <FormattedLink href="/register" className={css.Links_register}><FormattedMessage id="LoginPage.label.register" /></FormattedLink>
        </div>
      </Paper>
    );
  }
}
