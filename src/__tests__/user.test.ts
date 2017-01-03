import {IUser} from 'interfaces';
import {getAuthClientById} from 'repositories/authClientRepository';
import {initDatabase, firstClient as authClient, request} from 'testHelpers';

const createUserRequest = () => request.post('/api/users/register')
  .set('content-type', 'application/json')
  .send({
    email: 'liviu.ignat@everreal.com',
    password: 'jasjasdjasldjkas',
  });

describe('WHEN testing user endpoints', () => {
  beforeEach(async () => await initDatabase());

  describe('WHEN creating a new user', () => {
    let createdUserResponse = null;

    it('SHOULD have a response status 201', async () => createUserRequest().expect(201));

    describe('WHEN the user is created with success', () => {
      beforeEach(async () => createdUserResponse = await createUserRequest());

      it('SHOULD have the id in the user response', () => expect(createdUserResponse.body.id).toBeDefined());
      it('SHOULD have the email in the user response', () => expect(createdUserResponse.body.email).toEqual('liviu.ignat@everreal.com'));
    });
  });

  describe('WHEN creating the same user twice', () => {
    beforeEach(async () => await createUserRequest());

    it('SHOULD have a response status 400', async () => createUserRequest().expect(400));
  });
});

