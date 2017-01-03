import {getAuthClientById} from 'repositories/authClientRepository';
import {
  initDatabase,
  firstClient as authClient,
  request,
  getTokenRequest,
} from 'testHelpers';

const userData = {
  email: 'liviu@ignat.email',
  password: 'jasjasdjasldjkas',
};

describe('WHEN testing token generation', () => {
  beforeEach(async () => await initDatabase());

  describe('WHEN generating token with username and password', () => {
    let authToken;

    beforeEach(async () => authToken = (await getTokenRequest(userData)).body);

    it('SHOULD have all the token information', () => {
      expect(authToken.refresh_token).toBeDefined();
      expect(authToken.access_token).toBeDefined();
      expect(authToken.expires_in).toBeDefined();
    });
  });
});
