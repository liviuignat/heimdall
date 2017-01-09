import * as express from 'express';
import * as joi from 'joi';
import * as passport from 'passport';
import * as oauth2 from 'auth/oauth2';
import * as siteController from 'controllers/siteController';
import * as userController from 'controllers/userController';
import * as tokenController from 'controllers/tokenController';
import * as errorController from 'controllers/errorController';
const validate = require('express-validation');

export function setupApiRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/dialog/authorize', oauth2.authorization);
  app.post('/dialog/authorize/decision', oauth2.decision);
  app.post('/api/oauth/token', oauth2.token);

  // Mimicking google's token info endpoint from https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
  app.get('/api/tokeninfo', tokenController.getTokenInfo);
  // Mimicking google's token revoke endpoint from https://developers.google.com/identity/protocols/OAuth2WebServer
  app.get('/api/tokenrevoke', tokenController.revokeToken);

  app.get('/',        siteController.index);
  app.get('/login',   siteController.loginForm);
  app.post('/login',  siteController.login);
  app.get('/logout',  siteController.logout);
  app.get('/account', siteController.account);

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.post('/api/users/register', validate(userController.registerValidation), userController.registerUser);
  app.put('/api/users/resetpassword', validate(userController.resetPasswordValidation), userController.resetPassword);
  app.put('/api/users/changepassword', authMiddleware, validate(userController.changePasswordValidation), userController.changePassword);

  app.use(errorController.errorHandler);
};
