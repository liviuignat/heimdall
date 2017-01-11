import * as actionTypes from './actionTypes';
const md5 = require('blueimp-md5');

export function registerUserAction(user: IUser) {
  const data = Object.assign({}, user, {
    password: md5(user.password),
  });

  return {
    types: [
      actionTypes.AUTH_REGISTER,
      actionTypes.AUTH_REGISTER_SUCCESS,
      actionTypes.AUTH_REGISTER_FAIL,
    ],
    promise: client => (async () => {
      await client.post('/api/users/register', {data});
      await login(client, user.email, user.password);
      return true;
    })(),
  };
}

export function loginUserAction(email: string, password: string) {
  return {
    types: [
      actionTypes.AUTH_LOGIN,
      actionTypes.AUTH_LOGIN_SUCCESS,
      actionTypes.AUTH_LOGIN_FAIL,
    ],
    promise: client => (async () => {
      try {
        await login(client, email, password);
        return true;
      } catch (err) {
        throw 'validation.invalid.user.or.password';
      }
    })(),
  };
}

export function resetUserPassword(email: string) {
  return {
    types: [
      actionTypes.AUTH_RESET_PASSWORD,
      actionTypes.AUTH_RESET_PASSWORD_SUCCESS,
      actionTypes.AUTH_RESET_PASSWORD_FAIL,
    ],
    promise: client => (async () => {
      try {
        await client.put('/api/users/resetpassword', {data: {email}});
        return true;
      } catch (err) {
        throw 'validation.invalid.user.email';
      }
    })(),
  };
}

async function login(client, email: string, password: string, encodePassword = true): Promise<any> {
  const tokenPayload = {
    data: {
      grant_type: 'password',
      client_id: 'dbf8fc00-d7e1-11e6-be11-4df610fa68f6',
      client_secret: '9864b910-d742-11e6-b754-976f8d441951',
      scope: 'offline_access',
      username: email,
      password: encodePassword ? md5(password) : password,
    },
  };

  const token = await client.post('/api/oauth/token', tokenPayload);
  console.log(token);
  return token;
}
