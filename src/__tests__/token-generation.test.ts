import {getAuthClientById} from 'repositories/authClientRepository';
import {initDatabase, firstClient as authClient, request} from 'testHelpers';

describe('WHEN testing token generation', () => {
  beforeAll(async () => await initDatabase());

  describe('WHEN generating token with username and password', () => {
    let tokenResponse;

    beforeEach(async () => {
      tokenResponse = await request.post('/api/oauth/token')
        .set('content-type', 'application/json')
        .send({
          grant_type: 'password',
          client_id: authClient.clientId,
          client_secret: authClient.clientSecret,
          scope: 'offline_access',
          username: 'liviu@ignat.email',
          password: 'jasjasdjasldjkas',
        });
    });

    it('SHOULD have a refresh token in the response', () => expect(tokenResponse.body.refresh_token).toBeDefined());

    it('SHOULD have an access token in the response', () => expect(tokenResponse.body.access_token).toBeDefined());

    it('SHOULD have an expires in the response response', () => expect(tokenResponse.body.expires_in).toBeDefined());
  });
});
