import * as http from 'http';
import app from 'expressApp';
import * as config from 'config';
import {logger} from 'server/logger';
import {initializeDatabase} from 'server/repositories/initialDataRepository';
import {deleteExpiredTokens} from 'server/repositories';

const server = http.createServer(app);
const port = config.get<number>('port');
const timeToCheckExpiredTokens = config.get<number>('token.timeToCheckExpiredTokens') * 1000;

async function startServer() {
  const resetTables = false;
  await initializeDatabase(resetTables);

  setInterval(() => {
    deleteExpiredTokens();
  }, timeToCheckExpiredTokens);

  return new Promise((resolve, reject) => {
    server.listen(port, (err: Error) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

startServer()
  .then(() => logger.warn(`💻  Open http://localhost:${port} in a browser to view the app.`))
  .catch(err => logger.error(`Failed to start server. Error: ${JSON.stringify(err)}`));
