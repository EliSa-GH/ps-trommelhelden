import Auftrag from "../models/Auftrag.js";

export const getAuftraege = async (req, res) => {
  try {
    const auftraege = await Auftrag.findAll();
    res.status(200).json(auftraege);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
