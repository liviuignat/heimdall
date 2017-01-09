import * as config from 'config';
import {logger} from 'logger';
import {verifyToken} from 'services/authTokenService';

export async function logAndThrow(message: string) {
  logger.info(message);
  throw new Error(message);
};

export async function user(user: IUser, password: string) {
  userExists(user);
  if (user.password !== password) {
    logAndThrow('User password does not match');
  }
  return user;
};

export async function userExists(user: IUser) {
  if (user == null) {
    logAndThrow('User does not exist');
  }
  return user;
};

export async function validateClient(client: IAuthClient, clientSecret: string) {
  clientExists(client);
  if (client.clientSecret !== clientSecret) {
    logAndThrow('Client secret does not match');
  }
  return client;
};

export async function clientExists(client) {
  if (client == null) {
    logAndThrow('Client does not exist');
  }
  return client;
};

export async function refreshToken(token: IRefreshToken, refreshToken: string, client: IAuthClient) {
  verifyToken(refreshToken);
  if (client.id !== token.clientId) {
    logAndThrow('RefreshToken clientID does not match client id given');
  }
  return refreshToken;
};

export async function validateAuthCode(code: string, authCode: IAuthorizationCode, client: IAuthClient, redirectURI: string) {
  verifyToken(code);
  if (client.id !== authCode.clientId) {
    logAndThrow('AuthCode clientID does not match client id given');
  }
  if (redirectURI !== authCode.redirectURI) {
    logAndThrow('AuthCode redirectURI does not match redirectURI given');
  }
  return authCode;
};

export async function isRefreshToken(scope: string[]) {
  return scope != null && scope.includes('offline_access');
}

export async function tokenForHttp(token: string) {
  return new Promise((resolve, reject) => {
    try {
      verifyToken(token);
    } catch (err) {
      const error  = new Error('invalid_token');
      return reject(error);
    }
    return resolve(token);
  });
}

export async function tokenExistsForHttp(token) {
  if (token == null) {
    const error = new Error('invalid_token');
    throw error;
  }
  return token;
};

export async function clientExistsForHttp(client) {
  if (client == null) {
    const error  = new Error('invalid_token');
    throw error;
  }
  return client;
};
