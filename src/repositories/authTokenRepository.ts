import {IAuthorizationCode, IAccessToken, IRefreshToken} from 'interfaces';

const authorizationCodes: IAuthorizationCode[] = [];
const accessTokens: IAccessToken[] = [];
const refreshTokens: IRefreshToken[] = [];

export async function getAuthorizationCode(tokenValue: string) {
  return authorizationCodes.filter(({value}) => value === tokenValue)[0];
}

export async function saveAuthorizationCode(authorizationToken: IAuthorizationCode) {
  authorizationCodes.push(authorizationToken);
}

export async function deleteAuthorizationCode(tokenValue: string) {
  const authorizationToken = await getAuthorizationCode(tokenValue);
  authorizationCodes.splice(authorizationCodes.indexOf(authorizationToken), 1);
}

export async function getAccessToken(tokenValue: string) {
  return accessTokens.filter(({value}) => value === tokenValue)[0];
}

export async function saveAccessToken(accessToken: IAccessToken) {
  accessTokens.push(accessToken);
}

export async function deleteAccessToken(tokenValue: string) {
  const accessToken = await getAccessToken(tokenValue);
  accessTokens.splice(accessTokens.indexOf(accessToken), 1);
}

export async function getRefreshToken(tokenValue: string) {
  return refreshTokens.filter(({value}) => value === tokenValue)[0];
}

export async function saveRefreshToken(refreshToken: IRefreshToken) {
  refreshTokens.push(refreshToken);
}

export async function deleteRefreshToken(tokenValue: string) {
  const refreshToken = await getRefreshToken(tokenValue);
  refreshTokens.splice(refreshTokens.indexOf(refreshToken), 1);
}
