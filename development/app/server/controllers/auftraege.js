import Auftrag, { ne } from "../models/Auftrag.js";

export const getAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll();
    res.status(200).json(auftraege);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getErlAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll({
      where: {
        ErlDat: { [ne]: null },
      },
    });
    console.log(auftraege);
    res.status(200).json(auftraege);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    res.status(404).json({ message: error.message });
  }
};
