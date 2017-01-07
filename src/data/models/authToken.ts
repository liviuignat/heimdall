import * as Sequelize from 'sequelize';

export interface IAuthToken extends IAuthorizationCode, IRefreshToken, IAccessToken { }

export interface IAuthTokenInstance extends Sequelize.Instance<IAuthToken>, IAuthToken { }

export interface IAuthTokenModel extends Sequelize.Model<IAuthTokenInstance, IAuthToken> { }

export default function defineAuthToken(sequelize: Sequelize.Sequelize): IAuthTokenModel {
  return sequelize.define<IAuthTokenInstance, IAuthToken>('AuthToken', {
    value: {
      type: Sequelize.STRING(1024),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      field: 'user_id',
    },
    clientId: {
      type: Sequelize.UUID,
      allowNull: false,
      field: 'client_id',
    },
    scope: Sequelize.ARRAY(Sequelize.STRING),
    expirationDate: {
      type: Sequelize.DATE,
      field: 'expiration_date',
    },
    redirectURI: {
      type: Sequelize.STRING(256),
      field: 'redirect_uri',
    },
  },
  {
    tableName: 'oauth_tokens',
  });
};
