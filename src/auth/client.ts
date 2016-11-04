import * as passport from 'passport';
import {IUser} from 'interfaces';

export const info = [
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
      // req.authInfo is set using the `info` argument supplied by
      // `BearerStrategy`.  It is typically used to indicate scope of the token,
      // and used in access control checks.  For illustrative purposes, this
      // example simply returns the scope in the response.

      const user: IUser = req.user;

      res.json({
        client_id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        scope: req.authInfo.scope,
      });
    },
];
