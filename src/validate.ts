import * as config from 'config';
import {logger} from 'logger';
import {verifyToken} from 'services/authTokenService';
import {ValidationError} from 'errors';

export async function logAndThrow(error: ValidationError) {
  logger.info(JSON.stringify(error, Object.getOwnPropertyNames(error)));
  throw error;
};

export async function user(user: IUser, password: string) {
  userExists(user);
  if (user.password !== password) {
    logAndThrow(new ValidationError('User password does not match', 'heimdall.validation.user.and.password.not.match'));
  }
  return user;
};

export async function userExists(user: IUser) {
  if (user == null) {
    logAndThrow(new ValidationError('User does not exist', 'heimdall.validation.user.does.not.exist'));
  }
  return user;
};

export async function validateClient(client: IAuthClient, clientSecret: string) {
  clientExists(client);
  if (client.clientSecret !== clientSecret) {
    logAndThrow(new ValidationError('Client secret does not match', 'heimdall.validation.client.secret.not.correct'));
  }
  return client;
};

export async function clientExists(client) {
  if (client == null) {
    logAndThrow(new ValidationError('Client does not exist', 'heimdall.validation.client.does.not.exist'));
  }
  return client;
};

export async function validateRefreshToken(token: IRefreshToken, refreshToken: string, client: IAuthClient) {
  await verifyToken(refreshToken);
  if (client.id !== token.clientId) {
    logAndThrow(new ValidationError('RefreshToken clientID does not match client id given', 'heimdall.validation.refresh.token.id.does.not.match'));
  }
  return refreshToken;
};

export async function validateAuthCode(code: string, authCode: IAuthorizationCode, client: IAuthClient, redirectURI: string) {
  await verifyToken(code);
  if (client.id !== authCode.clientId) {
    logAndThrow(new ValidationError('AuthCode clientID does not match client id given', 'heimdall.validation.auth.client.id.does.not.match'));
  }
  if (redirectURI !== authCode.redirectURI) {
    logAndThrow(new ValidationError('AuthCode redirectURI does not match redirectURI given', 'heimdall.validation.auth.redirecturi.does.not.match'));
  }
  return authCode;
};

export async function isRefreshToken(token: IAccessToken): Promise<boolean> {
  return token && token.scope && token.scope.includes('offline_access');
}

export async function tokenForHttp(token: string): Promise<string> {
  try {
    await verifyToken(token);
  } catch (err) {
    const error  = new Error('invalid_token');
  }
  return token;
}

export async function tokenExistsForHttp(token): Promise<string> {
  if (token == null) {
    const error = new Error('invalid_token');
    throw error;
  }
  return token;
};

export async function clientExistsForHttp(client): Promise<string> {
  if (client == null) {
    const error  = new Error('invalid_token');
    throw error;
  }
  return client;
};
