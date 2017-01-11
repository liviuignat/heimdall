import * as uuid from 'uuid';
import db from 'server/data/database';

export async function getAuthClientById(clientId: string): Promise<IAuthClient> {
  const client = await db.AuthClient.findOne({where: {id: clientId}});
  return client && client.toJSON();
}

export async function createAuthClient(client: IAuthClient): Promise<IAuthClient> {
  client.id = uuid.v1();

  if (!client.clientSecret) {
    client.clientSecret = uuid.v1();
  }

  if (!client.trustedClient) {
    client.trustedClient = false;
  }

  const newClient = await db.AuthClient.create(client);
  return newClient && newClient.toJSON();
}
