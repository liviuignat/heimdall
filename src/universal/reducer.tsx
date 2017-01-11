import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import {reducer as auth} from 'universal/auth/reducer';

const reduxAsyncConnect = require('redux-connect').reducer;

export default combineReducers({
  routing,
  form,
  reduxAsyncConnect,
  auth,
});
