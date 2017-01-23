import * as React from 'react';
import {reduxForm} from 'redux-form';
import {FormTextField, RaisedButton} from 'universal/common/components';
const {required, email, minLength, repeatPasswordValidation} = require('er-common-components/lib/helpers/validation');

export const REGISTER_FORM_NAME = 'REGISTER_FORM_NAME';

@reduxForm({
  form: REGISTER_FORM_NAME,
})
export default class RegisterForm extends React.Component<any, any> {
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
            hintText="Email"
            floatingLabelText="Email"
            disabled={isLoading}
            validate={[required, email]}
          />
        </div>

        <div>
          <FormTextField
            withRef
            ref="password"
            fullWidth
            disabled={isLoading}
            name="password"
            type="password"
            hintText="Password"
            floatingLabelText="Password"
            validate={[required, minLength(6)]}
          />
        </div>

        <div>
          <FormTextField
            withRef
            ref="repeatPassword"
            fullWidth
            disabled={isLoading}
            name="repeatPassword"
            type="password"
            hintText="Repeat password"
            floatingLabelText="Repeat password"
            validate={[repeatPasswordValidation('password')]}
          />
        </div>

        <RaisedButton
          disabled={isLoading}
          fullWidth
          type="submit"
          backgroundColor="#FD7400"
          labelColor="white"
          label="Sign Up"
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    );
  }
}
