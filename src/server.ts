import * as http from 'http';
import app from 'expressApp';
import * as config from 'config';
import db from 'data/database';
import {createClientIfNotExists} from 'repositories';
import {logger} from 'logger';

const server = http.createServer(app);
const port = config.get<number>('port');

export async function createInitialData() {
  const defaultClients = config.get<IAuthClient[]>('defaultClients') || [];
  return Promise.all((defaultClients).map(client => createClientIfNotExists(client)));
}

async function start() {
  await db.sequelize.sync({force: true});
  const clients = await createInitialData();
  logger.info(JSON.stringify(clients));

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
