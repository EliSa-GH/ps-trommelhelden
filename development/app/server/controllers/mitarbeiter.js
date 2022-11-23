import Mitarbeiter from "../models/Mitarbeiter.js";

export const getMitarbeiter = async (req, res) => {
  try {
    const mitarbeiter = await Mitarbeiter.findAll();
    res.status(200).json(mitarbeiter);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteMitarbeiter = async (req, res) => {
  alert('hi');
  try {
    console.log(req.query);
    const mitarbeiter = await Mitarbeiter.findAll({
      where: { MitID: req.query.MitID },
    });
    
    if (mitarbeiter.length > 0) {
      Mitarbeiter.destroy({ where: { MitID: req.query.MitID } });
    } else {
      res.status(404).json({ message: "Mitarbeiter existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};