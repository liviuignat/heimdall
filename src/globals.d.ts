/* tslint:disable */

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
  resetPasswordToken?: string;
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

declare module 'redux-form-material-ui' {
  export class AutoComplete extends React.Component<any, any> {}
  export class Checkbox extends React.Component<any, any> {}
  export class TimePicker extends React.Component<any, any> {}
  export class DatePicker extends React.Component<any, any> {}
  export class RadioButtonGroup extends React.Component<any, any> {}
  export class SelectField extends React.Component<any, any> {}
  export class Slider extends React.Component<any, any> {}
  export class TextField extends React.Component<any, any> {}
  export class Toggle extends React.Component<any, any> {}
}
