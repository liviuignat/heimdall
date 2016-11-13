import {IUser} from 'interfaces';

const users: IUser[] = [{
  id: '1',
  firstName: 'Liviu',
  lastName: 'Ignat',
  password: 'jasjasdjasldjkas',
  email: 'liviu@ignat.email',
}];

export async function getUserById(userId: string) {
  const user = Object.assign({}, users.filter(({id}) => id === userId)[0]);
  delete user.password;
  return Promise.resolve(user);
}

export async function getUserByEmail(userEmail: string) {
  const user = await searchUserByEmail(userEmail);
  delete user.password;
  return Promise.resolve(user);
}

export async function getUserByEmailAndPassword(userEmail: string, password: string) {
  const user = await searchUserByEmail(userEmail);

  if (!user) {
    return null;
  }

  if (user.password === password) {
    delete user.password;
    return Promise.resolve(user);
  }

  return Promise.resolve(null);
}

async function searchUserByEmail(userEmail: string) {
  const user = users.filter(({email}) => email === userEmail)[0];
  return Promise.resolve(Object.assign({}, user));
}
