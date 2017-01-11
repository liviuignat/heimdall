import * as React from 'react';
import {Field, reduxForm} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import {RaisedButton} from 'universal/common/components';
const validation = require('er-common-components/lib/helpers/validation');

export const LOGIN_FORM_NAME = 'LOGIN_FORM_NAME';

@reduxForm({
  form: LOGIN_FORM_NAME,
})
export default class LoginForm extends React.Component<any, any> {
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
    const required = value => (validation.required(value) || {}).text;
    const email = value => (validation.email(value) || {}).text;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            fullWidth
            name="email"
            ref="email" withRef
            component={TextField}
            hintText="Email"
            floatingLabelText="Email"
            disabled={isLoading}
            validate={[required, email]}
          />
        </div>

        <div>
          <Field
            fullWidth
            disabled={isLoading}
            name="password"
            ref="password" withRef
            type="password"
            component={TextField}
            hintText="Password"
            floatingLabelText="Password"
            validate={[required]}
          />
        </div>

        <RaisedButton
          disabled={isLoading}
          fullWidth
          type="submit"
          backgroundColor="#FD7400"
          labelColor="white"
          label="Login" />

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    );
  }
}
