import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
const reduxAsyncConnect = require('redux-async-connect').reducer;

export default combineReducers({
  routing,
  form,
  reduxAsyncConnect,
});
