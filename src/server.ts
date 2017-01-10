import * as http from 'http';
import app from 'expressApp';
import * as config from 'config';
import {logger} from 'logger';
import {initializeDatabase} from 'repositories/initialDataRepository';

const server = http.createServer(app);
const port = config.get<number>('port');

async function startServer() {
  await initializeDatabase();

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
