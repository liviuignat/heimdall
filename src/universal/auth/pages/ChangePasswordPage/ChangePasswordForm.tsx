import * as React from 'react';
import {reduxForm} from 'redux-form';
import {ErrorMessage, FormattedMessage, FormTextField, RaisedButton} from 'universal/common/components';
const {required, repeatPasswordValidation, minLength} = require('er-common-components/lib/helpers/validation');

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
            validate={[required, minLength(6)]}
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
            validate={[repeatPasswordValidation('password')]}
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
