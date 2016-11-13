export const ACCESS_TOKEN_EXPIRES_IN = 3600;
export const AUTHORIZATION_CODE_LENGTH = 16;
export const ACCESS_TOKEN_LENGTH = 256;
export const REFRESH_TOKEN_LENGTH = 256;

export function generateAuthorizationTokenValue() {
  return Date.now().toString();
}

export function generateAccessTokenValue() {
  return Date.now().toString();
}

export function generateRefreshTokenValue() {
  return Date.now().toString();
}

export function generateAuthTokenExpirationDate() {
  return new Date(new Date().getTime() + (ACCESS_TOKEN_EXPIRES_IN * 1000));
}
