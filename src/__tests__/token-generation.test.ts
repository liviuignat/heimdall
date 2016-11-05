import {getAuthClientById} from 'repositories/authClientRepository';
import expressApp from 'expressApp';
import * as supertest from 'supertest-as-promised';

const request = supertest(expressApp);

describe('WHEN testing token generation', () => {
  const clientId = 'ever_real_client';
  let client;

  beforeEach(async () => client = await getAuthClientById(clientId));

  it('SHOULD have the correct test client', () => expect(client.clientId).toBe(clientId));

  describe('WHEN generating token with username and password', () => {
    let tokenResponse;

    beforeEach(async () => {
      tokenResponse = await request.post('/api/oauth/token')
        .set('content-type', 'application/json')
        .send({
          grant_type: "password",
          client_id: client.clientId,
          client_secret: client.clientSecret,
          scope: "offline_access",
          username: "liviu@ignat.email",
          password: "jasjasdjasldjkas",
        });
    });

    it('SHOULD have a refresh token in the response', () => expect(tokenResponse.body.refresh_token).toBeDefined());

    it('SHOULD have an access token in the response', () => expect(tokenResponse.body.access_token).toBeDefined());

    it('SHOULD have an expires in the response response', () => expect(tokenResponse.body.expires_in).toBeDefined());
  });
});
