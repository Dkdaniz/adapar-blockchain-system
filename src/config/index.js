const config = {
  name: 'Doutorado',
  port: process.env.PORT | 3333,
  postgres: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    log: process.env.POSTGRES_LOG,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  monitor: {
    start: 2137901,
    end: 2137912,
  },
  crypto: {
    saltRounds: process.env.SALT,
    secret: process.env.SECRECT,
    expiresIn: process.env.EXPIRES,
  },
};

module.exports = config;
