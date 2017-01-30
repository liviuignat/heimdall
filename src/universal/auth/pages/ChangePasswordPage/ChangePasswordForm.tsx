import * as React from 'react';
import {reduxForm} from 'redux-form';
import {ErrorMessage, FormattedMessage, FormTextField, RaisedButton} from 'universal/common/components';
const {required, repeatPasswordValidation} = require('er-common-components/lib/helpers/validation');

export const CHANGE_PASSWORD_FORM_NAME = 'CHANGE_PASSWORD_FORM_NAME';

@reduxForm({
  form: CHANGE_PASSWORD_FORM_NAME,
})
export default class ChangePasswordForm extends React.Component<any, any> {
  public static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    isLoading: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
  };

  public render() {
    const {
      isLoading,
      errorMessage,
      handleSubmit,
    } = this.props;

    // TODO: Add validation that makes sure both password fields have the same value (repeatPasswordValidation?)
    // TODO: Add password rules
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <FormTextField
            withRef
            ref="password"
            fullWidth
            disabled={isLoading}
            name="password"
            type="password"
            hintText={<FormattedMessage id="App.password" />}
            floatingLabelText={<FormattedMessage id="App.password" />}
            validate={[required, repeatPasswordValidation]}
          />
        </div>

        <div>
          <FormTextField
            withRef
            ref="retypepassword"
            fullWidth
            disabled={isLoading}
            name="retypepassword"
            type="password"
            hintText={<FormattedMessage id="App.retypepassword" />}
            floatingLabelText={<FormattedMessage id="App.retypepassword" />}
            validate={[required, repeatPasswordValidation]}
          />
        </div>

        <RaisedButton
          disabled={isLoading}
          fullWidth
          type="submit"
          backgroundColor="#FD7400"
          labelColor="white"
          label={<FormattedMessage id="ChangePasswordPage.page.submit.button" />}
        />

        {errorMessage && <ErrorMessage><FormattedMessage id={errorMessage} /></ErrorMessage>}
      </form>
    );
  }
}
