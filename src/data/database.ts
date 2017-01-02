import * as config from 'config';
import * as Sequelize from 'sequelize';
import defineUser from 'data/models/user';
import defineAuthClient from 'data/models/authClient';
import defineAuthToken from 'data/models/authToken';
import {logger} from 'logger';

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
