const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/database.js");
const Kunde = require("./models/Kunde.js");
const Auftrag = require("./models/Auftrag.js");

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

const app = express();

app.get("/auftraege", function (req, res) {
  Auftrag.findAll()
    .then((auftraege) => res.send(auftraege))
    .catch((err) => console.log(err));
});

app.get("/kunden", function (req, res) {
  Kunde.findAll()
    .then((kunden) => res.send(kunden))
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
