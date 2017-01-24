let defaultConfig = require(__dirname + '/../../../config/default');
defaultConfig.token.accessTokenExpiresIn = -3600; // Token expired 1 hour ago
jest.setMock('../../../config/default', defaultConfig);

import {
  initDatabase,
  getTokenRequest,
  getMeRequest,
} from 'server/testHelpers';

const userData = {
  email: 'liviu@ignat.email',
  password: 'jasjasdjasldjkas',
};

import {deleteExpiredTokens} from '../repositories';

describe('WHEN testing token expired cleanup', () => {
  beforeEach(async () => await initDatabase());

  describe('WHEN generating expired token & calling deleteExpiredTokens & getting /user/me', () => {
    let authToken;

    beforeEach(async () => {
      authToken = (await getTokenRequest(userData)).body;
      deleteExpiredTokens();
    });

    it('SHOULD respond with status 401', async () => getMeRequest(authToken.access_token).expect(401));
  });
});
