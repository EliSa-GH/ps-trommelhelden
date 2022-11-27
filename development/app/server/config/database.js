import { Sequelize } from "sequelize";

const db = new Sequelize("ii19s80431", "s80431", "s80431", {
  host: "141.56.2.45",
  dialect: "mssql",
  operatorAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
});
export default db;
