import * as express from 'express';
import * as passport from 'passport';
import * as oauth2 from 'server/auth/oauth2';
import * as siteController from 'server/controllers/siteController';
import * as userController from 'server/controllers/userController';
import * as tokenController from 'server/controllers/tokenController';
import * as errorController from 'server/controllers/errorController';
const metadata = require('./../../../package.json');
const validate = require('express-validation');
const {aliveMiddleware} = require('er-common-components/lib/middleware');

export function setupApiRoutes(app: express.Application): void {
  const authMiddleware = passport.authenticate('bearer', { session: false });

  app.get('/', siteController.getHome);
  app.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

  app.get('/dialog/logout', userController.logoutUser);
  app.get('/dialog/authorize', oauth2.authorization);
  app.post('/dialog/authorize/decision', oauth2.decision);
  app.post('/oauth/token', oauth2.token);

  // Mimicking google's token info endpoint from https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
  app.get('/api/tokeninfo', tokenController.getTokenInfoAction);
  // Mimicking google's token revoke endpoint from https://developers.google.com/identity/protocols/OAuth2WebServer
  app.get('/api/tokenrevoke', tokenController.revokeTokenAction);

  app.get('/api/users/me', authMiddleware, userController.getMe);
  app.get('/api/userinfo', authMiddleware, userController.getUserInfo);
  app.post('/api/users/register', validate(userController.registerValidation), userController.registerUser);
  app.put('/api/users/resetpassword', validate(userController.resetPasswordValidation), userController.resetPassword);
  app.put('/api/users/me/changepassword', authMiddleware, validate(userController.changePasswordValidation), userController.changePassword);
  app.put('/api/users/:userId/changepassword', validate(userController.changePasswordUsingResetTokenValidation), userController.changePasswordUsingResetToken);

  app.get('/api/alive', aliveMiddleware({metadata}));
  app.get('/assets/translations/locale/:language/index.js', siteController.getLocalizedTranslationScript);

  app.use(errorController.errorHandler);
};
