module.exports = {
  database: {
    database: 'everreal',
    username: 'postgres',
    password: 'password',
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    logging: false,
    pool: {
      idle: 10000,
      max: 10,
      min: 0,
    },
  },
  logger: {
    level: 'info',
  },
  token: {
    accessTokenExpiresIn: 3600,
    authorizationTokenExpiresIn: 3600,
    refreshTokenExpiresIn: 52560000,
    timeToCheckExpiredTokens: 3600,
  },
  defaultClients: [
    {
      clientSecret: 'b4faec59e09b5c2190e38fe024e9a937',
      name: 'EverReal Default Client',
      trustedClient: true,
    },
  ],
};
