import * as express from 'express';
import * as passport from 'passport';
import * as userController from 'controllers/userController';

export function setupRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.post('/api/users/register', userController.registerUser);
  app.put('/api/users/resetpassword', userController.resetPassword);
};
