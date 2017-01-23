import {
  initDatabase,
  request,
  getTokenRequest,
  getMeRequest,
} from 'server/testHelpers';

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

    describe('WHEN calling "/api/tokeninfo"', () => {
      const tokenInfoRequest = () => request.get(`/api/tokeninfo?access_token=${authToken.access_token}`);
      it('SHOULD respond with status 200', async () => tokenInfoRequest().expect(200));

      describe('WHEN calling "/api/tokenrevoke"', () => {
        let tokenRevokeRequest = () => request.get(`/api/tokenrevoke?token=${authToken.access_token}`);
        it('SHOULD respond with status 200', async () => tokenRevokeRequest().expect(200));

        describe('WHEN token is revokend and getting "user/me', () => {
          beforeEach(async () => await tokenRevokeRequest());
          it('SHOULD respond with status 401', async () => getMeRequest(authToken.access_token).expect(401));
        });
      });
    });
  });
});
