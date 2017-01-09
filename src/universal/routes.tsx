import * as React from 'react';
import {IndexRoute, Route} from 'react-router';
import AppContainer from './common/components/AppContainer/AppContainer';
import LoginPage from './auth/pages/LoginPage/LoginPage';

export function getRoutes(store) {
  return (
    <Route path="/" component={AppContainer}>

      <Route path="login" component={LoginPage}/>
    </Route>
  );
}
