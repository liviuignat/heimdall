import * as React from 'react';
import * as Helmet from 'react-helmet';
import {FormattedMessage, Paper} from 'universal/common/components';
import {reset} from 'redux-form';
import {resetUserPassword} from 'universal/auth/actions';
import ResetPasswordForm, {RESET_PASSWORD_FORM_NAME} from './ResetPasswordForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    isResetingPassword: auth.isResetingPassword,
    resetPasswordError: auth.resetPasswordError,
  }),
  {
    reset,
    resetUserPassword,
  })
export default class ResetPasswordPage extends React.Component<any, any> {
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
      resetPasswordError,
    } = this.props;
    const onSubmit = data => this.handleSubmit(data);

    return (
      <Paper className={css.ResetPasswordPage}>
        <Helmet title="EverReal - reset password" />
        <h3><FormattedMessage id="ResetPasswordPage.page.title" /></h3>

        <ResetPasswordForm
          isLoading={isResetingPassword}
          errorMessage={resetPasswordError}
          onSubmit={onSubmit}
        />
      </Paper>
    );
  }
}
