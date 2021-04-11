const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const database = require('../../config/database');

const db = {};

const sequelize = new Sequelize(database);

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
