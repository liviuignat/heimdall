import {Request, Response, NextFunction} from 'express';
import {createUser, getUserByEmail, updateUser} from 'repositories';
import {IUser} from 'interfaces';

export async function getMe(req: Request, res: Response): Promise<Response> {
  return res.json(req.user);
}

export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  const newUser: IUser = req.body;

  try {
    const user = await createUser(newUser);
    return res.status(201).json(user);
  } catch (ex) {
    return res.status(400).send();
  }
}

export async function resetPassword(req: Request, res: Response): Promise<Response> {
  const {password} = req.body;

  try {
    const user = await getUserByEmail(req.user.email);

    user.password = password;
    await updateUser(user);

    const updatedUser = await getUserByEmail(req.user.email);

    return res.status(201).json(updatedUser);
  } catch (ex) {
    return res.status(400).send();
  }
}
