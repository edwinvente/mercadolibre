const express = require("express");
const app = express();

//controller for service
const { getTestMutant } = require("../controllers/mutant");
//rutas
app.route("/api/mutant").post(getTestMutant);

module.exports = app;
