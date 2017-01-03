import 'auth/passport';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as oauth2 from 'auth/oauth2';
import {setupRoutes} from 'controllers';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(compression());

app.get('/', (req, res) => {
  res.status(200);
  res.send(`Hello from Heimdall`);
});

app.post('/api/oauth/token', oauth2.token);

setupRoutes(app);

app.use((err: any, req: any, res: any, next: any) => {
  return res.status(400).json(err);
});

export default app;
