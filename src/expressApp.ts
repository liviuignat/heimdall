import 'server/auth/passport';
import * as path from 'path';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import * as serveStatic from 'serve-static';
import * as cors from 'cors';
import * as passport from 'passport';
import {setupApiRoutes} from 'server/controllers';
import {reactComponentMiddleware} from 'universal/serverMiddleware';
const {languageMiddleware} = require('er-common-components/lib/middleware');
const {initLocaleData} = require('er-common-components/lib/translations');
const {getAllTranslations} = require('er-common-components/lib/translations/getAllTranslations');

initLocaleData();

const app = express();
const MemoryStore = expressSession.MemoryStore;

app.use(cookieParser());
app.use(expressSession({
  saveUninitialized: true,
  resave: true,
  secret: 'some secret',
  name: 'authorization.sid',
  store: new MemoryStore(),
  cookie: { maxAge: 3600 * 1000 },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(compression());
app.use(favicon(path.join(__dirname, 'static', 'favicon.png')));
app.use(serveStatic(path.join(__dirname, 'static')));
app.use(languageMiddleware({defaultLanguage: 'en-US', allTranslations: getAllTranslations()}));

setupApiRoutes(app);
app.use(reactComponentMiddleware());

export default app;
