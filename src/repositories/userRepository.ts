import * as uuid from 'node-uuid';
import {IUser} from 'interfaces';
import db from 'data/database';

export async function getUserById(userId: string): Promise<IUser> {
  const user = (await db.User.findById(userId)).toJSON();

  if (!user) {
    return null;
  }

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
  const newUser: IUser = (await db.User.create(user)).toJSON();
  return newUser;
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
  const user = (await db.User.findOne({where: {email: userEmail}})).toJSON();
  return user;
}
