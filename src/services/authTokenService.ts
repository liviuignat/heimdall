import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export const REFRESH_TOKEN_EXPIRES_IN = parseInt(config.get<string>('token.refreshTokenExpiresIn'), 10);
export const ACCESS_TOKEN_EXPIRES_IN = parseInt(config.get<string>('token.accessTokenExpiresIn'), 10);
export const AUTHORIZATION_TOKEN_EXPIRES_IN = parseInt(config.get<string>('token.authorizationTokenExpiresIn'), 10);
const privateKey = fs.readFileSync(path.join(__dirname, './../../certs/privatekey.pem'));
const publicKey = fs.readFileSync(path.join(__dirname, './../../certs/certificate.pem'));

export function generateAuthorizationTokenValue() {
  return createToken(AUTHORIZATION_TOKEN_EXPIRES_IN);
}

export function generateAccessTokenValue() {
  return createToken(ACCESS_TOKEN_EXPIRES_IN);
}

export function generateRefreshTokenValue() {
  return createToken(REFRESH_TOKEN_EXPIRES_IN);
}

export function generateAuthTokenExpirationDate() {
  return new Date(new Date().getTime() + (ACCESS_TOKEN_EXPIRES_IN * 1000));
}

function createToken(exp = ACCESS_TOKEN_EXPIRES_IN, sub = '') {
  const token = jwt.sign({
    jti : uuid(),
    sub,
    exp : Math.floor(Date.now() / 1000) + exp,
  }, privateKey, {
    algorithm: 'RS256',
  });
  return token;
};

export function verifyToken(token: string) {
  const result = jwt.verify(token, publicKey);
  return result;
}
