import * as React from 'react';
import {reduxForm} from 'redux-form';
import {ErrorMessage, FormattedMessage, FormTextField, RaisedButton} from 'universal/common/components';
const {required, email} = require('er-common-components/lib/helpers/validation');

export const RESET_PASSWORD_FORM_NAME = 'RESET_PASSWORD_FORM_NAME';

@reduxForm({
  form: RESET_PASSWORD_FORM_NAME,
})
export default class ResetPasswordForm extends React.Component<any, any> {
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
            ref="email"
            fullWidth
            name="email"
            hintText={<FormattedMessage id="App.email" />}
            floatingLabelText={<FormattedMessage id="App.email" />}
            disabled={isLoading}
            validate={[required, email]}
          />
        </div>

        <RaisedButton
          disabled={isLoading}
          fullWidth
          type="submit"
          backgroundColor="#FD7400"
          labelColor="white"
          label={<FormattedMessage id="ResetPasswordPage.page.submit.button" />}
        />

        {errorMessage && <ErrorMessage><FormattedMessage id={errorMessage} /></ErrorMessage>}
      </form>
    );
  }
}
