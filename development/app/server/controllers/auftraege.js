import Auftrag, { ne } from "../models/Auftrag.js";

export const getNewAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll({
      where: { MitID: req.query.MitID, ErlDat: null },
    });
    if (auftraege.length > 0) {
      res.status(200).json(auftraege);
    } else {
      res.status(404).json({ message: "Keine Aufträge gefunden" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getErlAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll({
      where: {
        ErlDat: { [ne]: null },
      },
    });
    res.status(200).json(auftraege);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getOffenAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll({
      attributes: ["Aufnr", "KunNr", "AufDat", "Beschreibung"],
      where: {
        MitID: null,
        ErlDat: null,
      },
    });
    res.status(200).json(auftraege);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteAuftraege = async (req, res) => {
  try {
    const auftrag = await Auftrag.findAll({
      where: { Aufnr: req.query.AufNr },
    });
    if (auftrag.length > 0) {
      Auftrag.destroy({ where: { Aufnr: req.query.AufNr } });
    } else {
      res.status(404).json({ message: "Auftraege existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const setAuftragMitarbeiter = async (req, res) => {
  try {
    const auftrag = await Auftrag.findAll({
      where: { Aufnr: req.query.AufNr },
    });

    if (auftrag.length > 0) {
      Auftrag.update(
        { MitID: req.query.MitID },
        { where: { Aufnr: req.query.AufNr } }
      );
      res.status(200).json({ message: "Update erfolgreich" });
    } else {
      res.status(404).json({ message: "Auftraege existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
