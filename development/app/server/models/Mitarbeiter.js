import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Mitarbeiter = db.define(
  "Mitarbeiter",
  {
    MitID: {
      type: Sequelize.CHAR(3),
      allowNull: false,
      primaryKey: true,
    },
    MitName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    MitVorname: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    MitGebDat: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    MitJob: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    MitStundensatz: {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: true,
    },
    MitEinsatzort: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
  },
  {
    db,
    tableName: "Mitarbeiter",
    schema: "dbo",
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PK__Mitarbei__7D0DA8080F2E3009",
        unique: true,
        fields: [{ name: "MitID" }],
      },
    ],
  }
);

export default Mitarbeiter;
