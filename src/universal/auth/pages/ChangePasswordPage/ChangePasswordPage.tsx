import * as React from 'react';
import * as Helmet from 'react-helmet';
import {FormattedMessage, Paper, FormattedLink} from 'universal/common/components';
import {reset} from 'redux-form';
import {changeUserPassword} from 'universal/auth/actions';
import ChangePasswordForm, {CHANGE_PASSWORD_FORM_NAME} from './ChangePasswordForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    isChangingPassword: auth.isChangingPassword,
    isChangePasswordSuccess: auth.isChangePasswordSuccess,
    changePasswordError: auth.changePasswordError,
  }),
  {
    reset,
    changeUserPassword,
  })
export default class ChangePasswordPage extends Component<any, any> {
  public static propTypes = {
    isChangingPassword: PropTypes.bool.isRequired,
    changePasswordError: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    changeUserPassword: PropTypes.func.isRequired,
  };

  public async handleSubmit(data) {
    const {password} = data;
    const userId = this.props.params.userId;
    const resetPasswordId = this.props.params.resetPasswordId;

    if (password) {
      const response = await this.props.changeUserPassword(password, userId, resetPasswordId);
      if (response && response.result) {
        this.props.reset(CHANGE_PASSWORD_FORM_NAME);
      }
    }
  }

  public render() {
    const css = require('./ChangePasswordPage.scss');
    const {
      isChangingPassword,
      isChangePasswordSuccess,
      changePasswordError,
    } = this.props;
    const onSubmit = data => this.handleSubmit(data);

    const component = isChangePasswordSuccess ?
        <div className={css.SuccessMessage}>
          <p><FormattedMessage id="ChangePasswordPage.label.successMessage" /></p>
          <div className={css.Links_container}>
            <FormattedLink href="/login" className={css.Links_login}><FormattedMessage id="ChangePasswordPage.label.login" /></FormattedLink>
          </div>
        </div> :
        <ChangePasswordForm
          isLoading={isChangingPassword}
          errorMessage={changePasswordError}
          onSubmit={onSubmit}
        />;

    return (
      <Paper className={css.ChangePasswordPage}>
        <Helmet title="EverReal - change password" />
        <h3><FormattedMessage id="ChangePasswordPage.page.title" /></h3>

        {component}
      </Paper>
    );
  }
}
