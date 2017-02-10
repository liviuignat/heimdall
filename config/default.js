module.exports = {
  port: process.env.PORT || 9200,
  sessionSecret: 'my-session-secret',
  loggedInRedirectUrl: 'http://dev.everreal.co:9300/properties',
  baseUrl: 'http://auth.dev.everreal.co:9200',
  redis: {
    url: 'redis://localhost:6379',
  },
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
