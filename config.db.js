//dotenv nos permite leer las variables de entorno de nuestro .env
const dotenv = require("dotenv");
dotenv.config();

/* module.exports = function () {
  const mysql = require("mysql");
  const db_config = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
  };

  let connection;

  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since

    connection.connect(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
        setTimeout(handleDisconnect, 2000);
      }
    });

    connection.on("error", function (err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        // Connection to the MySQL server is usually
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }

  handleDisconnect();

  return { connection };
}; */

const mysql = require("mysql");
let connection;

const handleDisconnect = () => {
  connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    timezone: "+0800",
    connectionLimit: 10,
    connectTimeout: 10000,
  }); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
};

handleDisconnect();

module.exports = { connection };
