import * as config from 'config';
import db from 'server/data/database';
import {createClientIfNotExists} from 'server/repositories';
import {logger} from 'server/logger';

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
