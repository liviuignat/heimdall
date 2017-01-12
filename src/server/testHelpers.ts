import * as supertest from 'supertest-as-promised';
import expressApp from 'expressApp';
import * as uuid from 'uuid';
import db from 'server/data/database';
import {logger} from 'server/logger';

export const request = supertest(expressApp);

export const firstClient: IAuthClient = {
  id: uuid.v1(),
  name: 'EverReal client',
  clientSecret: 'everreal@123',
  trustedClient: true,
};

export const firstUser: IUser = {
  id: uuid.v1(),
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

export const getTokenRequest = (user: IUser = firstUser, authClient = firstClient) => request.post('/oauth/token')
  .set('content-type', 'application/json')
  .send({
    grant_type: 'password',
    client_id: authClient.id,
    client_secret: authClient.clientSecret,
    scope: 'offline_access',
    username: user.email,
    password: user.password,
  });

export const getMeRequest = (token: string) => request.get('/api/users/me')
  .set('content-type', 'application/json')
  .set('Authorization', `Bearer ${token}`);
