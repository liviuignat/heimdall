import db from 'data/database';
import {logger} from 'logger';
import {decodeToken} from 'services/authTokenService';

export async function getAuthorizationCode(tokenValue: string): Promise<IAuthorizationCode> {
  const jwtToken = await decodeToken(tokenValue);
  const code = await db.AuthToken.findOne({where: {id: jwtToken.jti}});
  return code && code.toJSON();
}

export async function saveAuthorizationCode(authorizationToken: IAuthorizationCode): Promise<void> {
  const jwtToken = await decodeToken(authorizationToken.value);
  authorizationToken.id = jwtToken.jti;
  await db.AuthToken.insertOrUpdate(authorizationToken);
}

export async function deleteAuthorizationCode(tokenValue: string): Promise<void> {
  const jwtToken = await decodeToken(tokenValue);
  await db.AuthToken.destroy({where: {id: jwtToken.jti}});
}

export async function getAccessToken(tokenValue: string): Promise<IAccessToken> {
  const jwtToken = await decodeToken(tokenValue);
  const code = await db.AuthToken.findOne({where: {id: jwtToken.jti}});
  return code && code.toJSON();
}

export async function saveAccessToken(accessToken: IAccessToken): Promise<void> {
  const jwtToken = await decodeToken(accessToken.value);
  accessToken.id = jwtToken.jti;
  await db.AuthToken.insertOrUpdate(accessToken);
}

export async function deleteAccessToken(tokenValue: string): Promise<void> {
  const jwtToken = await decodeToken(tokenValue);
  await db.AuthToken.destroy({where: {id: jwtToken.jti}});
}

export async function getRefreshToken(tokenValue: string): Promise<IRefreshToken> {
  const jwtToken = await decodeToken(tokenValue);
  const code = await db.AuthToken.findOne({where: {id: jwtToken.jti}});
  return code && code.toJSON();
}

export async function saveRefreshToken(refreshToken: IRefreshToken): Promise<void> {
  const jwtToken = await decodeToken(refreshToken.value);
  refreshToken.id = jwtToken.jti;
  await db.AuthToken.insertOrUpdate(refreshToken);
}

export async function deleteRefreshToken(tokenValue: string): Promise<void> {
  const jwtToken = await decodeToken(tokenValue);
  await db.AuthToken.destroy({where: {id: jwtToken.jti}});
}
