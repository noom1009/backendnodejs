const util = require("util");
const Sequelize = require("sequelize");
const env = require('../setings/configs/env');
const con = require('../setings/configs/mysql');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    port: env.port,
    dialect: env.dialect,
    logging: false,
    freezeTableName: true,
    operatorsAliases: 0,
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle,
    },
  });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.UsesrDB = require('../models/schema/users/tbluser')(sequelize, Sequelize);

  module.exports = db;