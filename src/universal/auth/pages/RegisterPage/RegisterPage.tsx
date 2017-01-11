import * as React from 'react';
import * as Helmet from 'react-helmet';
import {Paper} from 'universal/common/components';
import {reset} from 'redux-form';
import {registerUserAction} from 'universal/auth/actions';
import RegisterForm, {REGISTER_FORM_NAME} from './RegisterForm';
const {connect} = require('react-redux');
const {Component, PropTypes} = React;

@connect(
  ({auth}) => ({
    isRegistering: auth.isRegistering,
    registerError: auth.registerError,
  }),
  {
    reset,
    registerUserAction,
  })
export default class RegisterPage extends Component<any, any> {
  public static propTypes = {
    isRegistering: PropTypes.bool.isRequired,
    registerError: PropTypes.string.isRequired,
    reset: PropTypes.func.isRequired,
    registerUserAction: PropTypes.func.isRequired,
  };

  public async handleSubmit(data) {
    const response = await this.props.registerUserAction(data);
    if (response && response.result) {
      this.props.reset(REGISTER_FORM_NAME);
    }
  }

  public render() {
    const css = require('./RegisterPage.scss');
    const {
      isRegistering,
      registerError,
    } = this.props;

    return (
      <Paper className={css.RegisterPage}>
        <Helmet title="EverReal - Register" />

        <h3>Sign up to EverReal</h3>

        <RegisterForm
          isLoading={isRegistering}
          errorMessage={registerError}
          onSubmit={data => this.handleSubmit(data)}/>
      </Paper>
    );
  }
}
