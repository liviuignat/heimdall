import 'auth/passport';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {setupApiRoutes} from 'controllers';
import {reactComponentMiddleware} from 'universal/serverMiddleware';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(compression());

setupApiRoutes(app);

app.use(reactComponentMiddleware());

export default app;
