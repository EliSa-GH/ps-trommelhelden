import Ersatzteil from "../models/Ersatzteil.js";

export const getErsatzteil = async (req, res) => {
  try {
    const ersatzteil = await Ersatzteil.findAll();
    res.status(200).json(ersatzteil);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteErsatzteil = async (req, res) => {
  try {
    console.log(req.query);
    const ersatzteil = await Ersatzteil.findAll({
      where: { EtID: req.query.EtID },
    });
    
    if (ersatzteil.length > 0) {
      Ersatzteil.destroy({ where: { EtID: req.query.EtID } });
    } else {
      res.status(404).json({ message: "Ersatzteil existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createErsatzteil = async (req, res) => {
  try{
    console.log(req.body.params.details);
     await Ersatzteil.create({
      EtID:  req.body.params.details.EtID,
      EtBezeichnung: req.body.params.details.EtBezeichnung, 
      EtPreis : req.body.params.details.EtPreis,
      EtAnzLager : req.body.params.details.EtAnzLager,
      EtHersteller : req.body.params.details.EtHersteller,
    });
    res.status(200).json({message: "Insert Successfully"});
  } catch (error){
    res.status(404).json({message: error.message});
  }
};