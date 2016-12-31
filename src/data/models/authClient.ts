import * as Sequelize from 'sequelize';
import {IAuthClient} from 'interfaces';

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
    clientId: {
      type: Sequelize.STRING(256),
      allowNull: false,
      field: 'client_id',
    },
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
    scope: Sequelize.STRING(4000),
  },
  {
    tableName: 'oauth_clients',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    underscoredAll: true,
  });
};
