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

export async function generateAuthorizationTokenValue(): Promise<string> {
  return await createToken(AUTHORIZATION_TOKEN_EXPIRES_IN);
}

export async function generateAccessTokenValue(): Promise<string> {
  return createToken(ACCESS_TOKEN_EXPIRES_IN);
}

export async function generateRefreshTokenValue(): Promise<string> {
  return createToken(REFRESH_TOKEN_EXPIRES_IN);
}

export function generateAuthTokenExpirationDate(): Date {
  return new Date(new Date().getTime() + (ACCESS_TOKEN_EXPIRES_IN * 1000));
}

export async function createToken(exp = ACCESS_TOKEN_EXPIRES_IN, sub = ''): Promise<string> {
  const payload = {
    jti : uuid(),
    sub,
    exp : Math.floor(Date.now() / 1000) + exp,
  };
  const options: jwt.SignOptions = {
    algorithm: 'RS256',
  };

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        return reject(error);
      }
      return resolve(token);
    });
  });
};

export async function decodeToken(token: string): Promise<any> {
  const result = jwt.decode(token, {complete: true, json: true});
  return result;
}

export async function verifyToken(token: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(token, publicKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
}
