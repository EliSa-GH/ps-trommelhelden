import { Sequelize } from "sequelize";

const db = new Sequelize("trommelhelden", "sa", "Trommelhelden24!", {
  host: "localhost",
  port: 1433,
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
