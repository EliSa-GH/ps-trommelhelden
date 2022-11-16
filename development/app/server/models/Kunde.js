import { Sequelize } from "sequelize";
import db from "../config/database.js";

const Kunde = db.define(
  "Kunde",
  {
    KunNr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    KunName: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    KunOrt: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    KunPlz: {
      type: Sequelize.CHAR(5),
      allowNull: false,
    },
    KunStrasse: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
  },
  {
    db,
    tableName: "Kunde",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Kunde__B067D81DD7A97B35",
        unique: true,
        fields: [{ name: "KunNr" }],
      },
    ],
  }
);

export default Kunde;
