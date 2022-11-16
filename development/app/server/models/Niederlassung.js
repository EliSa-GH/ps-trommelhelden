import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Niederlassung = db.define(
  "Niederlassung",
  {
    NLNr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Ort: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  },
  {
    db,
    tableName: "Niederlassung",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Niederla__E26A7F37F099E908",
        unique: true,
        fields: [{ name: "NLNr" }],
      },
    ],
  }
);
export default Niederlassung;
