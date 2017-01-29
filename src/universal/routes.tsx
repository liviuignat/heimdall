import * as React from 'react';
import {Route} from 'react-router';
import AppContainer from 'universal/common/components/AppContainer/AppContainer';
import LoginPage from 'universal/auth/pages/LoginPage/LoginPage';
import RegisterPage from 'universal/auth/pages/RegisterPage/RegisterPage';
import ResetPasswordPage from 'universal/auth/pages/ResetPasswordPage/ResetPasswordPage';
import ChangePasswordPage from 'universal/auth/pages/ChangePasswordPage/ChangePasswordPage';

function getRoutesList({path = ''} = {}) {
  return (
    <Route path={path}>
      <Route path="login" component={LoginPage}/>
      <Route path="register" component={RegisterPage}/>
      <Route path="resetpassword" component={ResetPasswordPage}/>
      <Route path="changepassword/:userId/:resetToken" component={ChangePasswordPage}/>
    </Route>
  );
};

export function getRoutes() {
  return (
    <Route path="/" component={AppContainer}>
      {getRoutesList()}
      {getRoutesList({path: ':language'})}
    </Route>
  );
}
