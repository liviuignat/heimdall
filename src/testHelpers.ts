import db from 'data/database';
import {IAuthClient, IUser}from 'interfaces';
import {logger} from 'logger';

export const firstClient: IAuthClient = {
  id: '1',
  name: 'EverReal client',
  clientId: 'ever_real_client',
  clientSecret: 'everreal@123',
  trustedClient: true,
};

export const firstUser: IUser = {
  id: '1',
  firstName: 'Liviu',
  lastName: 'Ignat',
  password: 'jasjasdjasldjkas',
  email: 'liviu@ignat.email',
};

export async function initDatabase() {
  try {
    await db.sequelize.sync({force: true});
    await db.AuthClient.insertOrUpdate(firstClient);
    await db.User.insertOrUpdate(firstUser);

    return db;
  } catch (ex) {
    logger.error(`====> Error: ${JSON.stringify(ex)}`);
  }
};
