const Sequelize = require("sequelize");
const db = require("./config/database.js");

const Ersatzteil = db.define(
  "Ersatzteil",
  {
    EtID: {
      type: Sequelize.CHAR(5),
      allowNull: false,
      primaryKey: true,
    },
    EtBezeichnung: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    EtPreis: {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false,
    },
    EtAnzLager: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    EtHersteller: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
  },
  {
    db,
    tableName: "Ersatzteil",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__Ersatzte__E294A340199EEA54",
        unique: true,
        fields: [{ name: "EtID" }],
      },
    ],
  }
);

module.exports = Ersatzteil;
