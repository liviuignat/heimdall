jest.mock('server/services/notificationService');

import {
  initDatabase,
  request,
  getTokenRequest,
  getMeRequest,
} from 'server/testHelpers';

const createUserPayload = {
  email: 'liviu.ignat@everreal.co',
  password: 'jasjasdjasldjkas',
};

const createUserRequest = (payload = createUserPayload) => request.post('/api/users/register')
  .set('content-type', 'application/json')
  .send(payload);

const changePasswordRequest = (password: string, token: string) => request.put('/api/users/me/changepassword')
  .set('content-type', 'application/json')
  .set('Authorization', `Bearer ${token}`)
  .send({password});

const resetPasswordRequest = (email: string) => request.put('/api/users/resetpassword')
  .set('content-type', 'application/json')
  .send({email});

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
        beforeEach(async () => authToken = (await getTokenRequest(createUserPayload)).body.access_token);
        it('SHOULD have an access token in the response', () => expect(authToken).toBeDefined());

        describe('WHEN asking for "/me" endpoint', () => {
          it('SHOULD have a response status 200', async () => getMeRequest(authToken).expect(200));

          describe('WHEN request finished with success', () => {
            let me: IUser = null;
            beforeEach(async () => me = (await getMeRequest(authToken)).body);

            it('SHOULD not have a password property set', () => expect(me.password).not.toBeDefined());
            it('SHOULD have required user information', () => {
              expect(me.id).toBeDefined();
              expect(me.email).toEqual(createUserPayload.email);
              expect(me.createdAt).toBeDefined();
              expect(me.updatedAt).toBeDefined();
              expect(me.firstName).toBeNull();
              expect(me.lastName).toBeNull();
            });
          });
        });

        describe('WHEN changing password for the new user', () => {
          const password = 'newpass';
          it('SHOULD return staus code 200', () => changePasswordRequest(password, authToken).expect(200));

          describe('WHEN password is changed with success', () => {
            beforeEach(async () => (await changePasswordRequest(password, authToken)).body);

            it('SHOULD be able to generate a new token and get "/me', async () => {
              const newAuthToken = (await getTokenRequest({email: createUserPayload.email, password})).body.access_token;
              const me = (await getMeRequest(newAuthToken)).body;
              expect(me.email).toEqual(createUserPayload.email);
            });
          });
        });

        // TODO: Fix this. Maybe check that resetPasswordId is generated. In order to check that the resetPasswordId
        // is generated we must return it as response. We can then also test /{userId}/changepassword
        // describe('WHEN doing resetpassword for a user', () => {
        //   it('SHOULD return staus code 200', () => resetPasswordRequest(createUserPayload.email).expect(200));

        //   describe('WHEN password is changed with success', () => {
        //     beforeEach(async () => (await resetPasswordRequest(createUserPayload.email)).body);

        //     it('SHOULD be not be able to generate a new token with the old password',
        //       async () => getTokenRequest(createUserPayload).expect(403));
        //   });
        // });

        describe('WHEN doing resetpassword for an unexisting email', () => {
          const unexistingEmail = 'email.does.not.exist@everreal.co';
          let errorCode = null;
          let errorResponse = null;

          beforeEach(async () => {
            errorCode = (await resetPasswordRequest(unexistingEmail)).status;
            errorResponse = (await resetPasswordRequest(unexistingEmail)).body;
          });

          it('SHOULD return staus code 400', () => {
            expect(errorCode).toBe(400);
          });

          it('SHOULD return a well formatted error message', () => {
              expect(errorResponse.errorMessage).toBeDefined();
              expect(errorResponse.errorLocale).toBeDefined();
          });
        });

        describe('WHEN password is not valid', () => {
          it('SHOULD return status code 400', async () => changePasswordRequest('sm', authToken).expect(400));
        });
      });
    });
  });

  describe('WHEN creating the user with invalid email', () => {
    it('SHOULD have a response status 400', async () => createUserRequest({email: '4983242@dasa', password: 'a'}).expect(400));
  });
});
