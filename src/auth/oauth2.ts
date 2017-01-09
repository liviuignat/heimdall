import * as express from 'express';
import * as passport from 'passport';
import {logger} from 'logger';
import {getAuthClientById} from 'repositories/authClientRepository';
import {
  createAuthorizationToken,
  createAccessToken,
  createGrantTokens,
  createGrantTokensByUsernameAndPassword,
  createAccessTokenFromRefreshToken,
} from './oauth2Helpers';
import {ACCESS_TOKEN_EXPIRES_IN} from 'services/authTokenService';

const login = require('connect-ensure-login');
const oauth2orize = require('oauth2orize');
const server = oauth2orize.createServer();

/**
 * Grant authorization codes
 *
 * The callback takes the `client` requesting authorization, the `redirectURI`
 * (which is used as a verifier in the subsequent exchange), the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a code,
 * which is bound to these values, and will be exchanged for an access token.
 */
server.grant(oauth2orize.grant.code((client: IAuthClient, redirectURI: string, user: IUser, ares, done) => {
  logger.info('server.grant.code');

  createAuthorizationToken(client.id, user.id, redirectURI, client.scope)
    .then(token => done(null, token.value))
    .catch((err: Error) => done(err));
}));

/**
 * Grant implicit authorization.
 *
 * The callback takes the `client` requesting authorization, the authenticated
 * `user` granting access, and their response, which contains approved scope,
 * duration, etc. as parsed by the application.  The application issues a token,
 * which is bound to these values.
 */
server.grant(oauth2orize.grant.token((client: IAuthClient, user: IUser, ares, done) => {
  logger.info('server.grant.token');

  createAccessToken(client.id, user.id, client.scope)
    .then(token => done(null, token.value, { expires_in: ACCESS_TOKEN_EXPIRES_IN }))
    .catch((err: Error) => done(err));
}));

/**
 * Exchange authorization codes for access tokens.
 *
 * The callback accepts the `client`, which is exchanging `code` and any
 * `redirectURI` from the authorization request for verification.  If these values
 * are validated, the application issues an access token on behalf of the user who
 * authorized the code.
 */
server.exchange(oauth2orize.exchange.code((client: IAuthClient, code: string, redirectURI: string, done) => {
  logger.info('server.exchange.code', client, code, redirectURI);

  createGrantTokens(client, code, redirectURI)
    .then(({token, refreshToken, expiresIn}) => done(null, token, refreshToken, {expires_in: expiresIn}))
    .catch(err => {
      logger.info('server.exchange.code:error', JSON.stringify(err));
      return done(null, false);
    });
}));

/**
 * Exchange user id and password for access tokens.
 *
 * The callback accepts the `client`, which is exchanging the user's name and password
 * from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the user who authorized the code.
 */
server.exchange(oauth2orize.exchange.password((client: IAuthClient, username: string, password: string, scope: string[], done) => {
  logger.info('server.exchange.password:entry');

  createGrantTokensByUsernameAndPassword(client, username, password, scope)
    .then(({token, refreshToken, expiresIn}) => done(null, token, refreshToken, {expires_in: expiresIn}))
    .catch(err => {
      logger.info('server.exchange.password:error', JSON.stringify(err));
      return done(null, false);
    });
}));

/**
 * Exchange the client id and password/secret for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id and
 * password/secret from the token request for verification. If these values are validated, the
 * application issues an access token on behalf of the client who authorized the code.
 */
server.exchange(oauth2orize.exchange.clientCredentials((client: IAuthClient, scope: string[], done) => {
  logger.info('server.exchange.clientCredentials');

  createAccessToken(client.id, null, client.scope)
    .then(token => done(null, token, null, {expires_in: ACCESS_TOKEN_EXPIRES_IN}))
    .catch(err => {
      logger.info('server.exchange.clientCredentials:error', JSON.stringify(err));
      return done(err);
    });
}));

/**
 * Exchange the refresh token for an access token.
 *
 * The callback accepts the `client`, which is exchanging the client's id from the token
 * request for verification.  If this value is validated, the application issues an access
 * token on behalf of the client who authorized the code
 */
server.exchange(oauth2orize.exchange.refreshToken((client: IAuthClient, refreshTokenValue: string, scope: string[], done) => {
  logger.info('server.exchange.refreshToken');

  createAccessTokenFromRefreshToken(client, refreshTokenValue)
    .then(({token, expiresIn}) => done(null, token, null, {expires_in: expiresIn}))
    .catch(err => {
      logger.info('server.exchange.refreshToken:error', JSON.stringify(err));
      return done(null, false);
    });
}));

/**
 * Register serialialization and deserialization functions.
 *
 * When a client redirects a user to user authorization endpoint, an
 * authorization transaction is initiated.  To complete the transaction, the
 * user must authenticate and approve the authorization request.  Because this
 * may involve multiple HTTPS request/response exchanges, the transaction is
 * stored in the session.
 *
 * An application must supply serialization functions, which determine how the
 * client object is serialized into the session.  Typically this will be a
 * simple matter of serializing the client's ID, and deserializing by finding
 * the client by ID from the database.
 */
server.serializeClient((client: IAuthClient, done) => {
  return done(null, client.id);
});

server.deserializeClient((id, done) => {
  getAuthClientById(id)
    .then(client => done(null, client))
    .catch(err => done(err));
});

/**
 * User decision endpoint
 *
 * `decision` middleware processes a user's decision to allow or deny access
 * requested by a client application.  Based on the grant type requested by the
 * client, the above grant middleware configured above will be invoked to send
 * a response.
 */
export const decision = [
  (req, res, next) => {
    logger.info('module.exports.decision', req.body);
    next();
  },
  login.ensureLoggedIn(),
  server.decision(),
];

/**
 * Token endpoint
 *
 * `token` middleware handles client requests to exchange authorization grants
 * for access tokens.  Based on the grant type being exchanged, the above
 * exchange middleware will be invoked to handle the request.  Clients must
 * authenticate when making requests to this endpoint.
 */
export const token = [
  (req, res, next) => {
    const user = req.user;
    logger.info('module.exports.token', req.body, user);
    next();
  },
  passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
  server.token(),
  server.errorHandler(),
];

/*
 * User authorization endpoint
 *
 * `authorization` middleware accepts a `validate` callback which is
 * responsible for validating the client making the authorization request.  In
 * doing so, is recommended that the `redirectURI` be checked against a
 * registered value, although security requirements may vary accross
 * implementations.  Once validated, the `done` callback must be invoked with
 * a `client` instance, as well as the `redirectURI` to which the user will be
 * redirected after an authorization decision is obtained.
 *
 * This middleware simply initializes a new authorization transaction.  It is
 * the application's responsibility to authenticate the user and render a dialog
 * to obtain their approval (displaying details about the client requesting
 * authorization).  We accomplish that here by routing through `ensureLoggedIn()`
 * first, and rendering the `dialog` view.
 */
export const authorization = [
  (req, res, next) => {
    const user = req.user;
    logger.info('module.exports.authorization', req.body, user);
    next();
  },
  login.ensureLoggedIn(),
  server.authorization((clientId: string, redirectURI: string, scope: string[], done) => {
    getAuthClientById(clientId)
      .then(client => {
        if (client) {
          client.scope = scope;
        }
        // WARNING: For security purposes, it is highly advisable to check that
        // redirectURI provided by the client matches one registered with
        // the server. For simplicity, this example does not.
        return done(null, client, redirectURI);
      })
      .catch(err => done(err));
  }), (req, res, next) => {
    // Render the decision dialog if the client isn't a trusted client
    // TODO:  Make a mechanism so that if this isn't a trusted client, the user can record that
    // they have consented but also make a mechanism so that if the user revokes access to any of
    // the clients then they will have to re-consent.
    getAuthClientById(req.query.client_id)
      .then(client => {
        if (client && client.trustedClient === true) {
          // This is how we short call the decision like the dialog below does
          server.decision({ loadTransaction: false }, (serverReq, callback) => {
            callback(null, { allow: true });
          })(req, res, next);
        } else {
          res.json({transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client});
          // res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
        }
      })
      .catch(() => {
        res.json({ transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
        // res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client })
      });
  }];
