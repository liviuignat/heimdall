import {IAuthClient} from 'interfaces';
import db from 'data/database';

export async function getAuthClientById(clientId: string): Promise<IAuthClient> {
  const client = (await db.AuthClient.findOne({where: {clientId}})).toJSON();
  return client;
}
