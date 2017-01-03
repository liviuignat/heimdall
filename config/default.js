module.exports = {
  database: {
    database: "everreal",
    username: "postgres",
    password: "password",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    logging: true,
    pool: {
      idle: 10000,
      max: 10,
      min: 0,
    },
  },
  logger: {
    level: "info",
  },
};
