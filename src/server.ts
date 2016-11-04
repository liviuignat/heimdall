import * as http from 'http';
import app from 'expressApp';
import {logger} from 'logger';

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, (err: Error) => {
  if (err) {
    return logger.error(JSON.stringify(err));
  }

  logger.info(`==> 💻  Open http://localhost:${port} in a browser to view the app.`);
});
