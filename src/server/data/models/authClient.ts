import * as Sequelize from 'sequelize';

export interface IAuthClientInstance extends Sequelize.Instance<IAuthClient>, IAuthClient {
}

export interface IAuthClientModel extends Sequelize.Model<IAuthClientInstance, IAuthClient> { }

export default function defineAuthClient(sequelize: Sequelize.Sequelize): IAuthClientModel {
  return sequelize.define<IAuthClientInstance, IAuthClient>('AuthClient', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    description: Sequelize.STRING(1000),
    clientSecret: {
      type: Sequelize.STRING(256),
      allowNull: false,
      field: 'client_secret',
    },
    trustedClient: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'trusted_client',
    },
    scope: Sequelize.ARRAY(Sequelize.STRING),
  },
  {
    tableName: 'oauth_clients',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
    underscored: true,
    underscoredAll: true,
  });
};
