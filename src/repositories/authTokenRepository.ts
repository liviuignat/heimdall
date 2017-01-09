import db from 'data/database';
import {logger} from 'logger';

export async function getAuthorizationCode(tokenValue: string): Promise<IAuthorizationCode> {
  const code = await db.AuthToken.findOne({where: {value: tokenValue}});
  return code && code.toJSON();
}

export async function saveAuthorizationCode(authorizationToken: IAuthorizationCode): Promise<void> {
  await db.AuthToken.insertOrUpdate(authorizationToken);
}

export async function deleteAuthorizationCode(tokenValue: string): Promise<void> {
  await db.AuthToken.destroy({where: {value: tokenValue}});
}

export async function getAccessToken(tokenValue: string): Promise<IAccessToken> {
  const code = await db.AuthToken.findOne({where: {value: tokenValue}});
  return code && code.toJSON();
}

export async function saveAccessToken(accessToken: IAccessToken): Promise<void> {
  await db.AuthToken.insertOrUpdate(accessToken);
}

export async function deleteAccessToken(tokenValue: string): Promise<void> {
  await db.AuthToken.destroy({where: {value: tokenValue}});
}

export async function getRefreshToken(tokenValue: string): Promise<IRefreshToken> {
  const code = await db.AuthToken.findOne({where: {value: tokenValue}});
  return code && code.toJSON();
}

export async function saveRefreshToken(refreshToken: IRefreshToken): Promise<void> {
  await db.AuthToken.insertOrUpdate(refreshToken);
}

export async function deleteRefreshToken(tokenValue: string): Promise<void> {
  await db.AuthToken.destroy({where: {value: tokenValue}});
}
