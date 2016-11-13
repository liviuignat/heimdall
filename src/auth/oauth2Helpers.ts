import {IAuthorizationCode, IAuthClient, IAccessToken, IRefreshToken} from 'interfaces';
import {
  getAuthorizationCode,
  getRefreshToken,
  saveAuthorizationCode,
  saveAccessToken,
  saveRefreshToken,
  deleteAuthorizationCode,
} from 'repositories/authTokenRepository';
import {getUserByEmailAndPassword} from 'repositories/userRepository';
import {
  generateAuthorizationTokenValue,
  generateAccessTokenValue,
  generateRefreshTokenValue,
  generateAuthTokenExpirationDate,
  ACCESS_TOKEN_EXPIRES_IN,
} from 'services/authTokenService';

export async function createAuthorizationToken(clientId: string, userId: string, redirectURI: string, scope: string) {
  const value = generateAuthorizationTokenValue();
  const authToken: IAuthorizationCode = {
    value,
    clientId: clientId,
    redirectURI,
    userId: userId,
    scope: scope,
  };

  await saveAuthorizationCode(authToken);
  return authToken;
}

export async function createAccessToken(clientId: string, userId: string, scope: string) {
  const value = generateAccessTokenValue();
  const expirationDate = generateAuthTokenExpirationDate();

  const accessToken: IAccessToken = {
    value,
    expirationDate,
    clientId: clientId,
    userId: userId,
    scope: scope,
  };

  await saveAccessToken(accessToken);
  return accessToken;
}

export async function createRefreshToken(clientId: string, userId: string, scope: string) {
  const value = generateRefreshTokenValue();

  const refreshToken: IRefreshToken = {
    value,
    clientId: clientId,
    userId: userId,
    scope: scope,
  };

  await saveRefreshToken(refreshToken);
  return refreshToken;
}

export async function createGrantTokens(client: IAuthClient, code: string, redirectURI: string) {
  const authCode = await getAuthorizationCode(code);

  if (!authCode) {
    throw new Error('Auth code does not exist');
  }

  if (client.id !== authCode.clientId) {
    throw new Error('Auth code clientId does not match');
  }

  if (redirectURI !== authCode.redirectURI) {
    throw new Error('Auth code redirectURI does not match');
  }

  await deleteAuthorizationCode(code);

  const token = await createAccessToken(authCode.clientId, authCode.userId, authCode.scope);

  let refreshToken = null;
  if (authCode.scope && authCode.scope.indexOf("offline_access") >= 0) {
    refreshToken = await createRefreshToken(authCode.clientId, authCode.userId, authCode.scope);
  }

  return {
    token,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

export async function createGrantTokensByUsernameAndPassword(client: IAuthClient, username: string, password: string, scope: string) {
  const user = await getUserByEmailAndPassword(username, password);

  if (!user) {
    throw new Error('user ' + username + 'does not exist');
  }

  const token = await createAccessToken(client.id, user.id, scope);

  let refreshToken = null;
  if (scope && scope.indexOf("offline_access") >= 0) {
    refreshToken = await createRefreshToken(client.id, user.id, scope);
  }

  return {
    token: token && token.value,
    refreshToken: refreshToken && refreshToken.value,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}

export async function createAccessTokenFromRefreshToken(client: IAuthClient, refreshTokenValue: string) {
  const refreshToken = await getRefreshToken(refreshTokenValue);

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  if (client.id !== refreshToken.clientId) {
    throw new Error('Refresh token not found because client id is not the same');
  }

  const token = await createAccessToken(refreshToken.clientId, refreshToken.userId, refreshToken.scope);

  return {
    token,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  };
}
