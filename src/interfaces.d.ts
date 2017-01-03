export interface IAuthClient {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  trustedClient: boolean;
  scope?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id?: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  isActive?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAuthorizationCode {
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
  redirectURI?: string;
}

export interface IRefreshToken {
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
}

export interface IAccessToken extends IRefreshToken {
  expirationDate?: Date;
}
