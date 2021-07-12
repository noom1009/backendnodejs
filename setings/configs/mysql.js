var mysql = require("mysql");
const env = require("./env");
var con = mysql.createPool({
  host: env.host,
  user: env.username,
  password: env.password,
  database: env.database,
  port: env.port,
  connectionLimit: 10,
  dateStrings: true,
  multipleStatements: true,
});
con.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});
module.exports = con;