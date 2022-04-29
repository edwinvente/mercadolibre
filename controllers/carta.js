const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const { connection } = require("../config.db");

exports.getCarta = async (request, response) => {
  connection.query("SELECT * FROM articles", (error, results) => {
    if (error) throw error;
    response.status(200).json(results);
  });
};
