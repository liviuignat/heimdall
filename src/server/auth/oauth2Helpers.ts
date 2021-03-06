import {
  getAuthorizationCode,
  getRefreshToken,
  saveAuthorizationCode,
  saveAccessToken,
  saveRefreshToken,
  deleteAuthorizationCode,
} from 'server/repositories/authTokenRepository';
import {getScopesByUserId} from 'server/repositories/scopesRepository';
import {getUserByEmailAndPassword} from 'server/repositories/userRepository';
import {
  generateAuthorizationTokenValue,
  generateAccessTokenValue,
  generateRefreshTokenValue,
  generateAuthTokenExpirationDate,
  ACCESS_TOKEN_EXPIRES_IN,
} from 'server/services/authTokenService';
import * as validate from 'server/validate';

interface IAccessTokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
};

export async function createAuthorizationToken(clientId: string, userId: string, redirectURI: string, scope: string[]): Promise<IAuthorizationCode> {
  const value = await generateAuthorizationTokenValue(userId);
  const filteredScopes = await getScopesByUserId(userId, scope);

  const authToken: IAuthorizationCode = {
    value,
    clientId,
    redirectURI,
    userId,
    scope: filteredScopes,
  };

  await saveAuthorizationCode(authToken);
  return authToken;
}

export async function createAccessToken(clientId: string, userId: string, scope: string[]): Promise<IAccessToken> {
  const expirationDate = generateAuthTokenExpirationDate();
  const value = await generateAccessTokenValue(userId);
  const filteredScopes = await getScopesByUserId(userId, scope);

  const accessToken: IAccessToken = {
    value,
    expirationDate,
    clientId,
    userId,
    scope: filteredScopes,
  };

  await saveAccessToken(accessToken);
  return accessToken;
}

export async function createRefreshToken(clientId: string, userId: string, scope: string[]): Promise<IRefreshToken> {
  const value = await generateRefreshTokenValue(userId);
  const filteredScopes = await getScopesByUserId(userId, scope);

  const refreshToken: IRefreshToken = {
    value,
    clientId,
    userId,
    scope: filteredScopes,
  };

  await saveRefreshToken(refreshToken);
  return refreshToken;
}

export async function createGrantTokens(client: IAuthClient, code: string, redirectURI: string): Promise<IAccessTokenResponse> {
  const authCode = await getAuthorizationCode(code);
  await deleteAuthorizationCode(code);
  await validate.validateAuthCode(code, authCode, client, redirectURI);
  const token = await createAccessToken(authCode.clientId, authCode.userId, authCode.scope);

  let refreshToken = null;
  if (await validate.isRefreshToken(authCode)) {
    refreshToken = await createRefreshToken(authCode.clientId, authCode.userId, authCode.scope);
  }

  return {
    token: token && token.value,
    refreshToken: refreshToken && refreshToken.value,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

export async function createGrantTokensByUsernameAndPassword(client: IAuthClient, username: string, password: string, scope: string[]): Promise<IAccessTokenResponse> {
  const user = await getUserByEmailAndPassword(username, password);

  await validate.userExists(user);

  const token = await createAccessToken(client.id, user.id, scope);

  let refreshToken = null;
  if (await validate.isRefreshToken(token)) {
    refreshToken = await createRefreshToken(client.id, user.id, scope);
  }

  return {
    token: token && token.value,
    refreshToken: refreshToken && refreshToken.value,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

export async function createAccessTokenFromRefreshToken(client: IAuthClient, refreshTokenValue: string): Promise<IAccessTokenResponse> {
  const refreshToken = await getRefreshToken(refreshTokenValue);
  await validate.validateRefreshToken(refreshToken, refreshTokenValue, client);
  const token = await createAccessToken(refreshToken.clientId, refreshToken.userId, refreshToken.scope);

  return {
    token: token && token.value,
    refreshToken: refreshToken && refreshToken.value,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}
