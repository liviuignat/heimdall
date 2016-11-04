import {IAuthClient} from 'interfaces';

const clients: IAuthClient[] = [
  {
      id: '1',
      name: 'EverReal client',
      clientId: 'ever_real_client',
      clientSecret: 'everreal@123',
      trustedClient: true,
  },
];

export async function getAuthClientById(id: string) {
  return Promise.resolve(clients.filter(({clientId}) => id === clientId)[0]);
}
