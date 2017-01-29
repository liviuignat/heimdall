import * as actionTypes from './actionTypes';
import {errorFomatter} from 'universal/helpers/formatters';

const initialState = {
  username: '',
  encodedPassword: '',
  isRegistering: false,
  registerError: '',
  isLoggingIn: false,
  loginError: '',
  isResetingPassword: false,
  isResetPasswordSuccess: false,
  resetPasswordError: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_REGISTER:
      return Object.assign({}, state, {
        username: '',
        encodedPassword: '',
        isRegistering: true,
        registerError: '',
      });
    case actionTypes.AUTH_REGISTER_SUCCESS:
      return Object.assign({}, state, {
        username: action.result.username,
        encodedPassword: action.result.encodedPassword,
        isRegistering: false,
        registerError: '',
      });
    case actionTypes.AUTH_REGISTER_FAIL:
      return Object.assign({}, state, {
        username: '',
        encodedPassword: '',
        isRegistering: false,
        registerError: errorFomatter(action.error),
      });

    case actionTypes.AUTH_LOGIN:
      return Object.assign({}, state, {
        username: '',
        encodedPassword: '',
        isLoggingIn: true,
        loginError: '',
      });
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        username: action.result.username,
        encodedPassword: action.result.encodedPassword,
        isLoggingIn: false,
        loginError: '',
      });
    case actionTypes.AUTH_LOGIN_FAIL:
      return Object.assign({}, state, {
        username: '',
        encodedPassword: '',
        isLoggingIn: false,
        loginError: errorFomatter(action.error),
      });

    case actionTypes.AUTH_RESET_PASSWORD:
      return Object.assign({}, state, {
        isResetingPassword: true,
        resetPasswordError: '',
      });
    case actionTypes.AUTH_RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isResetingPassword: false,
        isResetPasswordSuccess: true,
        resetPasswordError: '',
      });
    case actionTypes.AUTH_RESET_PASSWORD_FAIL:
      return Object.assign({}, state, {
        isResetingPassword: false,
        isResetPasswordSuccess: false,
        resetPasswordError: errorFomatter(action.error),
      });

    default:
      return state;
  }
}
