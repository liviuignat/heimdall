module.exports = {
  database: {
    database: 'everreal-tests',
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
    level: 'warn',
  },
};
