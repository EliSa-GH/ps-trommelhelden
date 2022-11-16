import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Gebiet = db.define(
  "Gebiet",
  {
    GebietID: {
      type: Sequelize.CHAR(2),
      allowNull: false,
      primaryKey: true,
    },
    NLNr: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Niederlassung",
        key: "NLNr",
      },
    },
  },
  {
    db,
    tableName: "Gebiet",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Gebiet__4A0BE64C55800BCA",
        unique: true,
        fields: [{ name: "GebietID" }],
      },
    ],
  }
);
export default Gebiet;
