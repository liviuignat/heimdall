interface IAuthClient {
  id?: string;
  name?: string;
  clientSecret?: string;
  trustedClient?: boolean;
  description?: string;
  scope?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUser {
  id?: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  isActive?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAuthorizationCode {
  id?: string;
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
  redirectURI?: string;
}

interface IRefreshToken {
  id?: string;
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
}

interface IAccessToken extends IRefreshToken {
  expirationDate?: Date;
}

interface IJwtToken {
  jti: string;
  sub: string;
  exp: number;
  iat: number;
}

declare var webpackIsomorphicTools: any;
declare var __DEVTOOLS__: any;
declare var __DEVELOPMENT__: any;
declare var __SERVER__: any;
declare var __CLIENT__: any;
