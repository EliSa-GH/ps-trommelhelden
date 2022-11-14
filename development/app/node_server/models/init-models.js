var DataTypes = require("sequelize").DataTypes;
var _Auftrag = require("./Auftrag");
var _Ersatzteil = require("./Ersatzteil");
var _Gebiet = require("./Gebiet");
var _Kunde = require("./Kunde");
var _Mitarbeiter = require("./Mitarbeiter");
var _Montage = require("./Montage");
var _Niederlassung = require("./Niederlassung");

function initModels(sequelize) {
  var Auftrag = _Auftrag(sequelize, DataTypes);
  var Ersatzteil = _Ersatzteil(sequelize, DataTypes);
  var Gebiet = _Gebiet(sequelize, DataTypes);
  var Kunde = _Kunde(sequelize, DataTypes);
  var Mitarbeiter = _Mitarbeiter(sequelize, DataTypes);
  var Montage = _Montage(sequelize, DataTypes);
  var Niederlassung = _Niederlassung(sequelize, DataTypes);

  Auftrag.belongsToMany(Ersatzteil, { as: 'EtID_Ersatzteils', through: Montage, foreignKey: "AufNr", otherKey: "EtID" });
  Ersatzteil.belongsToMany(Auftrag, { as: 'AufNr_Auftrags', through: Montage, foreignKey: "EtID", otherKey: "AufNr" });
  Montage.belongsTo(Auftrag, { as: "AufNr_Auftrag", foreignKey: "AufNr"});
  Auftrag.hasMany(Montage, { as: "Montages", foreignKey: "AufNr"});
  Montage.belongsTo(Ersatzteil, { as: "Et", foreignKey: "EtID"});
  Ersatzteil.hasMany(Montage, { as: "Montages", foreignKey: "EtID"});
  Auftrag.belongsTo(Kunde, { as: "KunNr_Kunde", foreignKey: "KunNr"});
  Kunde.hasMany(Auftrag, { as: "Auftrags", foreignKey: "KunNr"});
  Auftrag.belongsTo(Mitarbeiter, { as: "Mit", foreignKey: "MitID"});
  Mitarbeiter.hasMany(Auftrag, { as: "Auftrags", foreignKey: "MitID"});
  Gebiet.belongsTo(Niederlassung, { as: "NLNr_Niederlassung", foreignKey: "NLNr"});
  Niederlassung.hasMany(Gebiet, { as: "Gebiets", foreignKey: "NLNr"});

  return {
    Auftrag,
    Ersatzteil,
    Gebiet,
    Kunde,
    Mitarbeiter,
    Montage,
    Niederlassung,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
