import * as React from 'react';
import {Field} from 'redux-form';
import {TextField} from 'redux-form-material-ui';
import {mapValidationMessagesToLocale} from 'universal/helpers/validation';
const {Component, PropTypes} = React;

export default class FormTextField extends Component<any, any> {
  public static contextTypes = {
    intl: PropTypes.object.isRequired,
  };

  public render() {
    const validate = mapValidationMessagesToLocale(this.context.intl, this.props.validate);
    return (
      <Field
        {...this.props}
        component={TextField}
        validate={validate}
      />
    );
  }
}
