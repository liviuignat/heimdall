import * as Sequelize from 'sequelize';

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
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
    underscored: true,
    underscoredAll: true,
  });
};
