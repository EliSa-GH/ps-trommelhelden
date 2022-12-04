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

export const createKunde = async (req, res) => {
  try{
    console.log(req.body.params.details);
     await Kunde.create({
      KunNr:  req.body.params.details.kKunnr,
      KunName: req.body.params.details.kName, 
      KunOrt : req.body.params.details.kStreet,
      KunPlz : req.body.params.details.kZipcode,
      KunStrasse : req.body.params.details.kCity,
    });
    res.status(200).json({message: "Insert Successfully"});
  } catch (error){
    res.status(404).json({message: error.message});
  }
};

export const editKunde = async (req, res) => {
  try {
    const selectedKunde = await req.body.params.selectedKunde;
    const kunde = await Kunde.findAll({
      where: { KunNr: selectedKunde.KunNr },
    });

    if (kunde.length > 0) {
      Kunde.update(await
        {
          KunNr: selectedKunde.KunNr,
          KunName: selectedKunde.KunName,
          KunOrt: selectedKunde.KunOrt,
          KunPlz: selectedKunde.KunPlz,
          KunStrasse: selectedKunde.KunStrasse,
        },
        { where: { KunNr: selectedKunde.KunNr } }
      );
      res.status(200).json({ message: "Update erfolgreich" });
    } else {
      res.status(404).json({ message: "Kunde existiert nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error: Kunde nicht gepatcht" });
  }
};