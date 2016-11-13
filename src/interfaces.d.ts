export interface IAuthClient {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  trustedClient: boolean;
  scope?: string;
}

export interface IRefreshToken {
  value: string;
  userId: string;
  clientId: string;
  scope: string;
}

export interface IAuthorizationCode {
  value: string;
  clientId: string;
  redirectURI: string;
  userId: string;
  scope: string;
}

export interface IAccessToken {
  value: string;
  expirationDate: Date;
  clientId: string;
  userId: string;
  scope: string;
}

export interface IUser {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}
