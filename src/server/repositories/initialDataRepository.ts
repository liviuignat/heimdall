import * as config from 'config';
import db from 'server/data/database';
import {getAuthClientById} from 'server/repositories';
import {logger} from 'server/logger';

export async function initializeDatabase() {
  await db.sequelize.sync({force: false});

  const clients = config.get<IAuthClient[]>('defaultClients') || [];
  const defaultClients = await Promise.all((clients).map(client => createClientIfNotExists(client)));

  const returnValue = {
    defaultClients,
  };
  logger.info(JSON.stringify(returnValue));

  return returnValue;
}

async function createClientIfNotExists(client: IAuthClient): Promise<IAuthClient> {
  const existingClient = await getAuthClientById(client.id);

  if (!existingClient) {
    return await await db.AuthClient.create(client);
  }

  return existingClient;
}

