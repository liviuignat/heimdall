import * as express from 'express';
import * as joi from 'joi';
import * as passport from 'passport';
import * as userController from 'controllers/userController';
const validate = require('express-validation');

export function setupRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.post('/api/users/register', validate(userController.registerValidation), userController.registerUser);
  app.put('/api/users/changepassword',
    authMiddleware,
    validate(userController.changePasswordValidation),
    userController.changePassword);
};
