const envConf = process.env.CONF;
let prodConf = {};

try {
  prodConf = envConf ? JSON.parse(envConf) : { };
} catch (err) {
  console.log(`Cannot parse CONF env variable. It should be valid JSON.`);
  throw err;
}

const prodDefault = {
  loggedInRedirectUrl: 'https://www.everreal.co/properties',
  baseUrl: 'https://auth.everreal.co',
  redis: {
    url: 'redis://redis:6379',
  },
  database: {
    database: 'everreal',
    username: 'postgres',
    password: 'password',
    dialect: 'postgres',
    host: 'postgres',
    port: 5432,
    logging: false,
    pool: {
      idle: 10000,
      max: 10,
      min: 0,
    },
  },
  logger: {
    level: 'warn',
  },
  notification: {
    email: 'everreal.dev@gmail.com',
    from: '"EverReal" <everreal.dev@gmail.com>',
    password: 'everrealsecret',
  },
  token: {
    accessTokenExpiresIn: 3600,
    authorizationTokenExpiresIn: 3600,
    refreshTokenExpiresIn: 30 * 24 * 3600,
    timeToCheckExpiredTokens: 3600,
  },
  defaultClients: [
    {
      id: 'dbf8fc00-d7e1-11e6-be11-4df610fa68f6',
      clientSecret: '9864b910-d742-11e6-b754-976f8d441951',
      description: 'EverReal Default client',
      name: 'EverReal Default Client',
      trustedClient: true,
    },
  ],
};

const config = Object.assign({}, prodDefault, prodConf);

module.exports = config;
