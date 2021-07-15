const env = require("./env");
const sql = require("mssql");
var config = {
  user: env.username,
  password: env.password,
  server: env.host,
  database: env.database,
  options: {
    encrypt: false,
    port: env.port,
    enableArithAbort: false,
  },
};
sql.connect(config, function (err) {
  if (!err) {
    console.log("Database Connected Mssql Successfully!!!");
  } else {
    console.log("Failed to Establish Connection with Mssql with Error: " + err);
  }
});

module.exports = sql;