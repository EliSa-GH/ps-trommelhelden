import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import exphbs from "express-handlebars";

import db from "./config/database.js";
import auftraegeRoutes from "./routes/auftraege.js";
import kundenRoutes from "./routes/kunden.js";
import mitarbeiterRoutes from "./routes/mitarbeiter.js";
import ersatzteilRoutes from "./routes/mitarbeiter.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/auftraege", auftraegeRoutes);
app.use("/kunden", kundenRoutes);
app.use("/mitarbeiter", mitarbeiterRoutes);
app.use("/ersatzteil", ersatzteilRoutes);

db.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    console.log("Database connected");
  })
  .catch((err) => console.log(err));
