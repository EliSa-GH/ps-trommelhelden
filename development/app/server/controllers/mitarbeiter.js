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

  try {
    console.log(req.query);
    const mitarbeiter = await Mitarbeiter.destroy({
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

//TODO
export const createMitarbeiter = async (req, res) => {
  try{
    console.log(req.body.params.mDetails);
     await Mitarbeiter.create({
      MitID:  req.body.params.mDetails.mID,
      MitName: req.body.params.mDetails.mName, 
      MitVorname : req.body.params.mDetails.mVorname,
      MitGebDat : req.body.params.mDetails.mBirthday,
      MitJob : req.body.params.mDetails.mJob,
      MitStundensatz : req.body.params.mDetails.mSalary,
      MitEinsatzort : req.body.params.mDetails.mPlace,
    
    });
    res.status(200).json({message: "Insert Employee Successfully"});
  } catch (error){
    res.status(404).json({message: error.message});
  }
};

export const editMitarbeiter = async (req, res) => {
  try {
    const selectedMitarbeiter = await req.body.params.selectedMitarbeiter;
    const mitarbeiter = await Mitarbeiter.findAll({
      where: { MitID: selectedMitarbeiter.MitID },
    });

    if (mitarbeiter.length > 0) {
      Mitarbeiter.update(await
        {
          MitID: selectedMitarbeiter.MitID,
          MitName: selectedMitarbeiter.MitName,
          MitVorname: selectedMitarbeiter.MitVorname,
          MitGebDat: selectedMitarbeiter.MitGebDat,
          MitJob: selectedMitarbeiter.MitJob,
          MitStundensatz: selectedMitarbeiter.MitStundensatz,
          MitEinsatzort: selectedMitarbeiter.MitEinsatzort,
        },
        { where: { MitID: selectedMitarbeiter.MitID } }
      );
      res.status(200).json({ message: "Update erfolgreich" });
    } else {
      res.status(404).json({ message: "Mitarbeiter existiert nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error: Mitarbeiter nicht gepatcht" });
  }
};