import * as express from 'express';
import * as userController from 'controllers/userController';

export function setupRoutes(app: express.Application): void {
  app.get('/api/users/me', userController.getMe);
  app.post('/api/users/register', userController.registerUser);
  app.put('/api/users/resetpassword', userController.resetPassword);
};
