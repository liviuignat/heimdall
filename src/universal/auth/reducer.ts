import * as actionTypes from './actionTypes';
import {errorFomatter} from 'universal/helpers/formatters';

const initialState = {
  isRegistering: false,
  registerError: '',
  isLoggingIn: false,
  loginError: '',
  isResetingPassword: false,
  resetPasswordError: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_REGISTER:
      return Object.assign(state, {
        isRegistering: true,
        registerError: '',
      });
    case actionTypes.AUTH_REGISTER_SUCCESS:
      return Object.assign(state, {
        isRegistering: false,
        registerError: '',
      });
    case actionTypes.AUTH_REGISTER_FAIL:
      return Object.assign(state, {
        isRegistering: false,
        registerError: errorFomatter(action.error),
      });

    case actionTypes.AUTH_LOGIN:
      return Object.assign(state, {
        isLoggingIn: true,
        loginError: '',
      });
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return Object.assign(state, {
        isLoggingIn: false,
        loginError: '',
      });
    case actionTypes.AUTH_LOGIN_FAIL:
      return Object.assign(state, {
        isLoggingIn: false,
        loginError: errorFomatter(action.error),
      });

    case actionTypes.AUTH_RESET_PASSWORD:
      return Object.assign(state, {
        isResetingPassword: true,
        resetPasswordError: '',
      });
    case actionTypes.AUTH_RESET_PASSWORD_SUCCESS:
      return Object.assign(state, {
        isResetingPassword: false,
        resetPasswordError: '',
      });
    case actionTypes.AUTH_RESET_PASSWORD_FAIL:
      return Object.assign(state, {
        isResetingPassword: false,
        resetPasswordError: errorFomatter(action.error),
      });

    default:
      return state;
  }
}
