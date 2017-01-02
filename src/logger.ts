import * as config from 'config';
import * as winston from 'winston';

const logConfig: any = config.get('logger');

 export const logger = new (winston.Logger)({
   level: logConfig.level,
    transports: [
      new (winston.transports.Console)(),
    ],
  });
