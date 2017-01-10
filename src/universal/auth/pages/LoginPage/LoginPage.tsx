import * as React from 'react';
import * as Helmet from 'react-helmet';

const {connect} = require('react-redux');

@connect(
  () => ({
    message: 'Hello world',
  }),
  { })
export default class LoginPage extends React.Component<any, any> {
  public render() {
    const css = require('./LoginPage.scss');
    const {message} = this.props;

    return (
      <div className={css.LoginPage}>
        <Helmet title="giftdoodle - Log in" />
        Login Page {message}
      </div>
    );
  }
}
