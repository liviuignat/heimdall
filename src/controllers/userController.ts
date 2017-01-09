import * as joi from 'joi';
import * as randomstring from 'randomstring';
import {Request, Response, NextFunction} from 'express';
import {createUser, getUserByEmail, updateUser} from 'repositories';
import {sendNewRegisteredUserEmail, sendUserResetPasswordEmail} from 'services/notificationService';
import {ValidationError} from 'errors';

const md5 = require('blueimp-md5');

export async function getMe(req: Request, res: Response): Promise<void | Response> {
  return res.json(req.user);
}

export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  const newUser: IUser = req.body;

  try {
    const user = await createUser(newUser);

    // Don't wait to send the email
    sendNewRegisteredUserEmail(newUser);

    return res.status(201).json(user);
  } catch (err) {
    return Promise.resolve(next(err));
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  const {password} = req.body;
  const {email} = req.user;

  try {
    const user = await getUserByEmail(email);

    if (user === null) {
      throw new ValidationError('User with email does not exist', 'heimdall.validation.reset.password.user.not.exist');
    }

    user.password = password;
    await updateUser(user);

    const updatedUser = await getUserByEmail(email);

    return res.status(200).json(updatedUser);
  } catch (err) {
    return Promise.resolve(next(err));
  }
}

// TODO: Don't allow the user to reset password in the future, but do a two step password change
export async function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
  const {email} = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user === null) {
      throw new ValidationError('User with email does not exist', 'validation.reset.password.user.not.exist');
    }

    const newPassword = randomstring.generate();

    user.password = md5(newPassword);
    await updateUser(user);

    // Don't wait to send the email
    sendUserResetPasswordEmail(user, newPassword);

    const updatedUser = await getUserByEmail(email);

    return res.status(200).json(updatedUser);
  } catch (err) {
    return Promise.resolve(next(err));
  }
}

export const registerValidation = {
  body: {
    email: joi.string().email().required(),
    password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  },
};

export const resetPasswordValidation = {
  body: {
    email: joi.string().email().required(),
  },
};

export const changePasswordValidation = {
  body: {
    password: joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
  },
};
