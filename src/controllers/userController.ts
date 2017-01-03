import * as joi from 'joi';
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

export async function changePassword(req: Request, res: Response): Promise<Response> {
  const {password} = req.body;
  const {email} = req.user;

  try {
    const user = await getUserByEmail(email);

    user.password = password;
    await updateUser(user);

    const updatedUser = await getUserByEmail(email);

    return res.status(200).json(updatedUser);
  } catch (ex) {
    return res.status(400).send();
  }
}

export const registerValidation = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  },
};

export const changePasswordValidation = {
  body: {
    password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  },
};
