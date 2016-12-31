import * as Sequelize from 'sequelize';
import {IUser} from 'interfaces';

export interface IUserInstance extends Sequelize.Instance<IUser>, IUser {
}

export interface IUserModel extends Sequelize.Model<IUserInstance, IUser> { }

export default function defineUser(sequelize: Sequelize.Sequelize): IUserModel {
  return sequelize.define<IUserInstance, IUser>('User', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(256),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(256),
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.STRING(256),
      field: 'last_name',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
    underscoredAll: true,
  });
};
