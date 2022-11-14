const Sequelize = require("sequelize");
const db = require("./config/database.js");

const Montage = db.define(
  "Montage",
  {
    EtID: {
      type: Sequelize.CHAR(5),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Ersatzteil",
        key: "EtID",
      },
    },
    AufNr: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Auftrag",
        key: "Aufnr",
      },
    },
    Anzahl: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    db,
    tableName: "Montage",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Montage__4FC23363068D575D",
        unique: true,
        fields: [{ name: "EtID" }, { name: "AufNr" }],
      },
    ],
  }
);

module.exports = Montage;
