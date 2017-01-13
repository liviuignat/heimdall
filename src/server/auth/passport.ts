import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {BasicStrategy} from 'passport-http';
import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {logger} from 'server/logger';
import {getUserById, getUserByEmailAndPassword} from 'server/repositories/userRepository';
import {getAuthClientById} from 'server/repositories/authClientRepository';
import {getAccessToken, deleteAccessToken} from 'server/repositories/authTokenRepository';

const passportOauth2ClientPassword = require('passport-oauth2-client-password');
const ClientPasswordStrategy = passportOauth2ClientPassword.Strategy;

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(new LocalStrategy((email: string, password: string, done) => {
  logger.info('LocalStrategy');

  getUserByEmailAndPassword(email, password)
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(err => done(err, false));
  },
));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
  (username, password, done) => {
    logger.info('BasicStrategy');

    getAuthClientById(username)
      .then(client => {
        if (!client) {
          return done(null, false);
        }
        return done(null, client);
      })
      .catch(err => done(err, false));
    },
));

/**
 * Client Password strategy
 *
 * The OAuth 2.0 client password authentication strategy authenticates clients
 * using a client ID and client secret. The strategy requires a verify callback,
 * which accepts those credentials and calls done providing a client.
 */
passport.use(new ClientPasswordStrategy((clientId, clientSecret, done) => {
  logger.info('ClientPasswordStrategy');
  getAuthClientById(clientId)
    .then(client => {
      if (!client) {
        throw new Error(`ClientPasswordStrategy - no client ${clientId}`);
      } else if (client.clientSecret !== clientSecret) {
        throw new Error(`ClientPasswordStrategy - secret invalid ${clientId}`);
      }

      logger.info(`ClientPasswordStrategy:success`);

      return done(null, client);
    })
    .catch(err => {
      logger.error(`ClientPasswordStrategy:error ${JSON.stringify(err)}`);
      done(err, false);
    });
  },
));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
async function bearerStrategyCallback(accessToken: string): Promise<any> {
  logger.info('BearerStrategy', accessToken);

  const token = await getAccessToken(accessToken);

  if (!token) {
    throw false;
  }

  if (new Date() > token.expirationDate) {
    await deleteAccessToken(accessToken);
  }

  // to keep current state simple, restricted scopes are not implemented,
  const info = { scope: '*' };

  if (token.userId !== null) {
    const user = await getUserById(token.userId);

    if (!user) {
      throw false;
    }

    return {user, info};
  } else if (token.clientId !== null) {
    // The request came from a client only since userID is null
    // therefore the client is passed back instead of a user
    const client = await getAuthClientById(token.clientId);

    if (!client) {
      throw false;
    }

    return {client, info};
  }
}
passport.use(new BearerStrategy((accessToken: string, done) => {
  bearerStrategyCallback(accessToken).then(({user, client, info} = {}) => {
    if (user) {
      return done(null, user, info);
    }

    if (client) {
      return done(null, client, info);
    }

    return done(null, false);
  }).catch(err => done(err));
}));

// Register serialialization and deserialization functions.
//
// When a client redirects a user to user authorization endpoint, an
// authorization transaction is initiated.  To complete the transaction, the
// user must authenticate and approve the authorization request.  Because this
// may involve multiple HTTPS request/response exchanges, the transaction is
// stored in the session.
//
// An application must supply serialization functions, which determine how the
// client object is serialized into the session.  Typically this will be a
// simple matter of serializing the client's ID, and deserializing by finding
// the client by ID from the database.
passport.serializeUser((user, done) => {
  logger.info('serializeUser');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  logger.info('deserializeUser', id);
  getUserById(id)
    .then(user => {
      logger.info(`deserializeUser:success:${JSON.stringify(user)}`);
      return done(null, user);
    })
    .catch(err => {
      logger.info(`deserializeUser:fail`);
      return done(err, null);
    });
});
