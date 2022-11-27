import Kunde from "../models/Kunde.js";

export const getKunden = async (req, res) => {
  try {
    const kunden = await Kunde.findAll();
    res.status(200).json(kunden);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteKunde = async (req, res) => {
  try {
    console.log(req.query);
    const kunden = await Kunde.findAll({
      where: { KunNr: req.query.KunNr },
    });
    
    if (kunden.length > 0) {
      Kunde.destroy({ where: { KunNr: req.query.KunNr } });
    } else {
      res.status(404).json({ message: "Kunden existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const editKunde = async (req, res) => {
  const kunden = await Kunde.findAll({
    where: { KunNr: req.query.KunNr }
  });
  console.log(req.query);
};