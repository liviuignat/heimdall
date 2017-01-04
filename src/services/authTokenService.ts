import * as uuid from 'uuid';

export const ACCESS_TOKEN_EXPIRES_IN = 3600;
export const AUTHORIZATION_CODE_LENGTH = 16;
export const ACCESS_TOKEN_LENGTH = 256;
export const REFRESH_TOKEN_LENGTH = 256;

export function generateAuthorizationTokenValue() {
  return uuid.v1();
}

export function generateAccessTokenValue() {
  return uuid.v1();
}

export function generateRefreshTokenValue() {
  return uuid.v1();
}

export function generateAuthTokenExpirationDate() {
  return new Date(new Date().getTime() + (ACCESS_TOKEN_EXPIRES_IN * 1000));
}
