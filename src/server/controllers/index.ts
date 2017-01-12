import * as express from 'express';
import * as joi from 'joi';
import * as passport from 'passport';
import * as oauth2 from 'server/auth/oauth2';
import * as userController from 'server/controllers/userController';
import * as tokenController from 'server/controllers/tokenController';
import * as errorController from 'server/controllers/errorController';
const validate = require('express-validation');

export function setupApiRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/', (req, res) => res.status(200).send(`Hello from Heimdall`));
  app.post('/login', (req, res, next) => passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

  app.get('/dialog/authorize', oauth2.authorization);
  app.post('/dialog/authorize/decision', oauth2.decision);
  app.post('/oauth/token', oauth2.token);

  // Mimicking google's token info endpoint from https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
  app.get('/api/tokeninfo', tokenController.getTokenInfo);
  // Mimicking google's token revoke endpoint from https://developers.google.com/identity/protocols/OAuth2WebServer
  app.get('/api/tokenrevoke', tokenController.revokeToken);

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.post('/api/users/register', validate(userController.registerValidation), userController.registerUser);
  app.put('/api/users/resetpassword', validate(userController.resetPasswordValidation), userController.resetPassword);
  app.put('/api/users/changepassword', authMiddleware, validate(userController.changePasswordValidation), userController.changePassword);

  app.use(errorController.errorHandler);
};
