import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());

app.use((req, res) => {
  res.status(200);
  res.send(`Hello world. ENV_TEST="${process.env.ENV_TEST}" ENV2_TEST="${process.env.ENV2_TEST}"`);
});

export default app;
