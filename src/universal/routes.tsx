import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import AppContainer from 'universal/common/components/AppContainer/AppContainer';
import LoginPage from 'universal/auth/pages/LoginPage/LoginPage';
import RegisterPage from 'universal/auth/pages/RegisterPage/RegisterPage';
import ResetPasswordPage from 'universal/auth/pages/ResetPasswordPage/ResetPasswordPage';

function getRoutesList({path = ''} = {}) {
  return (
    <Route path={path}>
      <Route path="login" component={LoginPage}/>
      <Route path="register" component={RegisterPage}/>
      <Route path="resetpassword" component={ResetPasswordPage}/>
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
