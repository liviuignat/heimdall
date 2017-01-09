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
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
  redirectURI?: string;
}

interface IRefreshToken {
  value: string;
  userId: string;
  clientId: string;
  scope?: string[];
}

interface IAccessToken extends IRefreshToken {
  expirationDate?: Date;
}
