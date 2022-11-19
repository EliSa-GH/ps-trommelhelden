import Mitarbeiter from "../models/Mitarbeiter.js";

export const getMitarbeiter = async (req, res) => {
  try {
    const mitarbeiter = await Mitarbeiter.findAll({
      attributes: ["MitID", "MitName", "MitVorname"],
    });
    res.status(200).json(mitarbeiter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
