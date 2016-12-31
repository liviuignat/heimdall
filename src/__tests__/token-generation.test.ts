import {getAuthClientById} from 'repositories/authClientRepository';
import expressApp from 'expressApp';
import * as supertest from 'supertest-as-promised';
import {initDatabase, firstClient} from './../testHelpers';

const request = supertest(expressApp);

describe('WHEN testing token generation', () => {
  let client = firstClient;
  beforeAll(async () => await initDatabase());

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
