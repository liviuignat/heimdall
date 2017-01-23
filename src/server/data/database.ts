import * as config from 'config';
import * as Sequelize from 'sequelize';
import defineUser from 'server/data/models/user';
import defineAuthClient from 'server/data/models/authClient';
import defineAuthToken from 'server/data/models/authToken';

const dbConfig: any = config.get('database');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig,
);

const db = {
  sequelize,
  Sequelize,
  User: defineUser(sequelize),
  AuthClient: defineAuthClient(sequelize),
  AuthToken: defineAuthToken(sequelize),
};

export default db;
