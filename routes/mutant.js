const express = require("Express");
const app = express();
//controller for service
const { getTestMutant, getSearchReport } = require("../controllers/mutant");
//rutas
app.route("/api/mutant").post(getTestMutant);
app.route("/api/stats").get(getSearchReport);

module.exports = app;
