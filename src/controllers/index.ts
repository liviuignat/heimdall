import * as express from 'express';
import * as joi from 'joi';
import * as passport from 'passport';
import * as userController from 'controllers/userController';
import * as errorController from 'controllers/errorController';
const validate = require('express-validation');

export function setupApiRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.post('/api/users/register', validate(userController.registerValidation), userController.registerUser);
  app.put('/api/users/changepassword',
    authMiddleware,
    validate(userController.changePasswordValidation),
    userController.changePassword);

  app.use(errorController.errorHandler);
};
