import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import AppContainer from 'universal/common/components/AppContainer/AppContainer';
import LoginPage from 'universal/auth/pages/LoginPage/LoginPage';
import RegisterPage from 'universal/auth/pages/RegisterPage/RegisterPage';
import ResetPasswordPage from 'universal/auth/pages/ResetPasswordPage/ResetPasswordPage';

export function getRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>

      <Route path="login" component={LoginPage}/>
      <Route path="register" component={RegisterPage}/>
      <Route path="resetpassword" component={ResetPasswordPage}/>
    </Route>
  );
}
