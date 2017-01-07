import * as uuid from 'uuid';
import db from 'data/database';

export async function getUserById(userId: string): Promise<IUser> {
  const userData = await db.User.findById(userId);

  if (!userData) {
    return null;
  }

  const user = userData.toJSON();
  delete user.password;
  return user;
}

export async function getUserByEmail(userEmail: string): Promise<IUser> {
  const user = await searchUserByEmail(userEmail);

  if (!user) {
    return null;
  }

  delete user.password;
  return Promise.resolve(user);
}

export async function getUserByEmailAndPassword(userEmail: string, password: string): Promise<IUser> {
  const user = await searchUserByEmail(userEmail);

  if (!user) {
    return null;
  }

  if (user.password !== password) {
    return null;
  }

  delete user.password;
  return user;
}

export async function createUser(user: IUser): Promise<IUser> {
  user.id = uuid.v1();
  const newUser = await db.User.create(user);
  return newUser && newUser.toJSON();
}

export async function updateUser(user: IUser): Promise<IUser> {
  const {id} = user;
  await db.User.update(user, {where: {id}});
  return user;
}

export async function deactivateUser(user: IUser): Promise<void> {
  const {id} = user;
  await db.User.destroy({where: {id}});
}

async function searchUserByEmail(userEmail: string): Promise<IUser> {
  const user = await db.User.findOne({where: {email: userEmail}});
  return user && user.toJSON();
}
