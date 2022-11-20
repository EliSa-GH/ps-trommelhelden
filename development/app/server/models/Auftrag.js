import { Sequelize } from "sequelize";
export const { gt, lte, ne, contains } = Sequelize.Op;

import db from "../config/database.js";

const Auftrag = db.define(
  "Auftrag",
  {
    Aufnr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    MitID: {
      type: Sequelize.CHAR(3),
      allowNull: true,
      references: {
        model: "Mitarbeiter",
        key: "MitID",
      },
    },
    KunNr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Kunde",
        key: "KunNr",
      },
    },
    AufDat: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    ErlDat: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    Dauer: {
      type: Sequelize.DECIMAL(5, 1),
      allowNull: true,
    },
    Anfahrt: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    Beschreibung: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    db,
    tableName: "Auftrag",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Auftrag__D56A0E139737FCEF",
        unique: true,
        fields: [{ name: "Aufnr" }],
      },
    ],
  }
);

export default Auftrag;
