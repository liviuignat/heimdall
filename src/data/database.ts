import * as fs from 'fs';
import * as path from 'path';
import * as config from 'config';
import * as Sequelize from 'sequelize';
import {IUserModel} from 'data/models/user';

const db: any = {};
const dbConfig: any = config.get('database');
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig,
);

const basename  = path.basename(module.filename);
fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
      const model: any = sequelize['import'](path.join(__dirname, file));
      // NOTE: you have to change from the original property notation to
      // index notation or tsc will complain about undefined property.
      db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export interface IDbConnection {
  sequelize: Sequelize.Sequelize;
  User: IUserModel;
};

export default <IDbConnection> db;
