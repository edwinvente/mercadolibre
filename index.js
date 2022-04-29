const express = require("Express");
const app = express();

//we are help to analize the body of the request POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//upload routes for mutants
app.use(require("./routes/mutant"));

app.listen(process.env.PORT || 3300, () => {
  console.log("Servidor corriendo en el puerto 3300", process.env.PORT);
});

module.exports = app;
