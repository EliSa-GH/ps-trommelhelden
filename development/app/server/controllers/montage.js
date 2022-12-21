import Montage from "../models/Montage.js";

export const createMontage = async (req, res) => {
  try {
    const ersatzteile = await req.body.params.ersatzteile;
    const Aufnr = await req.body.params.Aufnr;

    ersatzteile.forEach(async (element) => {
      await Montage.create({
        AufNr: Aufnr,
        EtID: element.EtID,
        Anzahl: element.EtAnz,
      });
    });

    res.status(200).json({ message: "Anlegen erfolgreich" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
