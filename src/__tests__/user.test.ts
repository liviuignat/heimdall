import {IUser, IAccessToken} from 'interfaces';
import {getAuthClientById} from 'repositories/authClientRepository';
import {
  initDatabase,
  firstClient as authClient,
  request,
  getTokenRequest,
} from 'testHelpers';

const createUserPayload = {
  email: 'liviu.ignat@everreal.co',
  password: 'jasjasdjasldjkas',
};
const createUserRequest = () => request.post('/api/users/register')
  .set('content-type', 'application/json')
  .send(createUserPayload);

const getMeRequest = (token: string) => request.get('/api/users/me')
  .set('content-type', 'application/json')
  .set('Authorization', `Bearer ${token}`)
  .send(createUserPayload);

describe('WHEN testing user endpoints', () => {
  beforeEach(async () => await initDatabase());

  describe('WHEN creating a new user', () => {
    let createdUser: IUser = null;

    it('SHOULD have a response status 201', async () => createUserRequest().expect(201));

    describe('WHEN the user is created with success', () => {
      beforeEach(async () => createdUser = (await createUserRequest()).body);

      it('SHOULD have initial user information', () => {
        expect(createdUser.id).toBeDefined();
        expect(createdUser.email).toEqual(createUserPayload.email);
      });
      it('WHEN trying to create the user again SHOULD have a response status 400', async () => createUserRequest().expect(400));

      describe('WHEN generating the token for the new user', () => {
        let authToken;
        beforeEach(async () => authToken = (await getTokenRequest(createUserPayload)).body);
        it('SHOULD have an access token in the response', () => expect(authToken.access_token).toBeDefined());

        describe('WHEN asking for "/me" endpoint', () => {
          it('SHOULD have a response status 200', async () => getMeRequest(authToken.access_token).expect(200));

          describe('WHEN request finished with success', () => {
            let me: IUser = null;
            beforeEach(async () => me = (await getMeRequest(authToken.access_token)).body);

            it('SHOULD not have a password property set', () => expect(me.password).not.toBeDefined());
            it('SHOULD have required user information', () => {
              expect(me.id).toBeDefined();
              expect(me.email).toEqual(createUserPayload.email);
            });
          });
        });
      });
    });
  });
});
