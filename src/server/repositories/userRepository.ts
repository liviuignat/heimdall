import * as uuid from 'uuid';
import db from 'server/data/database';

const attributes = [
  'id',
  'email',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
];

export async function getUserById(userId: string): Promise<IUser> {
  const user = await db.User.findById(userId, {attributes});
  return user && user.toJSON();
}

export async function getUserWithResetPasswordIdById(userId: string): Promise<IUser> {
  const user = await db.User.findById(userId, {
    attributes: [
      ...attributes,
      'resetPasswordId',
    ],
  });
  return user && user.toJSON();
}

export async function getUserByEmail(email: string): Promise<IUser> {
  const user = await db.User.findOne({where: {email} , attributes});
  return user && user.toJSON();
}

export async function getUserByEmailAndPassword(email: string, password: string): Promise<IUser> {
  const dbUser = await db.User.findOne({
    where: {email},
    attributes: [
      ...attributes,
      'password',
    ],
  });
  const user = dbUser && dbUser.toJSON();

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
