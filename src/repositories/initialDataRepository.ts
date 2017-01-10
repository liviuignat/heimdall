import * as config from 'config';
import db from 'data/database';
import {createClientIfNotExists} from 'repositories';
import {logger} from 'logger';

export async function initializeDatabase() {
  await db.sequelize.sync({force: true});

  const clients = config.get<IAuthClient[]>('defaultClients') || [];
  const defaultClients = await Promise.all((clients).map(client => createClientIfNotExists(client)));

  const returnValue = {
    defaultClients,
  };
  logger.info(JSON.stringify(returnValue));

  return returnValue;
}
