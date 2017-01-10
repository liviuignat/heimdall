import 'server/auth/passport';
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as favicon from 'serve-favicon';
import * as serveStatic from 'serve-static';
import * as cors from 'cors';
import {setupApiRoutes} from 'server/controllers';
import {reactComponentMiddleware} from 'universal/serverMiddleware';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(compression());
app.use(favicon(path.join(__dirname, 'static', 'favicon.png')));
app.use(serveStatic(path.join(__dirname, 'static')));

setupApiRoutes(app);

app.use(reactComponentMiddleware());

export default app;
