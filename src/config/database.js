const config = require('./index');

module.exports = {
  dialect: 'postgres',
  host: config.postgres.host,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  define: {
    timestamps: true,
    underscored: false,
    underscoredAll: false,
  },
  logging: config.postgres.POSTGRES_LOG,
};
