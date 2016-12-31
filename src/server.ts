import * as http from 'http';
import app from 'expressApp';
import db from 'data/database';
import {logger} from 'logger';

const server = http.createServer(app);
const port = process.env.PORT || 3000;

async function start() {
  await db.sequelize.sync();
  logger.info(JSON.stringify(await db.AuthClient.findAll()));
  logger.info(JSON.stringify(await db.User.findAll()));

  server.listen(port, (err: Error) => {
    if (err) {
      return Promise.reject(err);
    }
    return Promise.resolve();
  });
}

start()
  .then(() => logger.info(`💻  Open http://localhost:${port} in a browser to view the app.`))
  .catch(err => logger.error(`Failed to start server. Error: ${JSON.stringify(err)}`));
