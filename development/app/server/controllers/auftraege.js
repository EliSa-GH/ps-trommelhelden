import Auftrag, { ne } from "../models/Auftrag.js";
import AuftragWithoutTrigger from "../models/AuftragWithoutTrigger.js";
import db from "../config/database.js";

export const getAllAuftraege = async (req, res) => {
  try {
    const auftraege = await AuftragWithoutTrigger.findAll({
      attributes: ["Aufnr"],
      order: [["Aufnr", "ASC"]],
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

export const getNewAuftraege = async (req, res) => {
  try {
    const [auftraege, metadata] = await db.query(
      `select a.Aufnr,		a.MitID, 		a.KunNr, 		a.AufDat, 		a.ErlDat, 		a.Dauer, 		a.Anfahrt, 		a.Beschreibung, 		m.Ersatzteil from Auftrag as a left join(select  extern.AufNr, LEFT(Ersatzteil, LEN(Ersatzteil)-1) as Ersatzteil	from Montage as extern	cross apply(		select EtID + ' (', convert(varchar(3),Anzahl) + '), '		from Montage as intern		where extern.AufNr = intern.AufNr		for XML PATH('')	)pre_trimmed(Ersatzteil)	group by extern.AufNr, Ersatzteil) as m on a.Aufnr=m.AufNr where ErlDat is null and MitID = ${req.query.MitID}`
    );
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
    const [auftraege, metadata] = await db.query(
      "select a.Aufnr, a.MitID,	a.KunNr, a.AufDat, a.ErlDat, a.Dauer, a.Anfahrt, a.Beschreibung, m.Ersatzteil from Auftrag as a left join(select  extern.AufNr, LEFT(Ersatzteil, LEN(Ersatzteil)-1) as Ersatzteil	from Montage as extern	cross apply( select	EtID + ' (', convert(varchar(3),Anzahl) + '), ' from Montage as intern where extern.AufNr = intern.AufNr for XML PATH(''))pre_trimmed(Ersatzteil)	group by extern.AufNr, Ersatzteil) as m on a.Aufnr=m.AufNr where ErlDat is not null and MitID is not null"
    );
    if (auftraege.length > 0) {
      res.status(200).json(auftraege);
    } else {
      res.status(404).json({ message: "Keine Aufträge gefunden" });
    }
  } catch (error) {
    res.status(404).json({ error });
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
      where: { Aufnr: req.body.params.AufNr },
    });
    if (auftrag.length > 0) {
      Auftrag.update(
        { MitID: req.body.params.MitID },
        { where: { Aufnr: req.body.params.AufNr } }
      );
      res.status(200).json({ message: "Update erfolgreich" });
    } else {
      res.status(404).json({ message: "Auftraege existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const editAuftrag = async (req, res) => {
  try {
    const selectedAuftrag = await req.body.params.selectedAuftrag;

    const auftrag = await Auftrag.findAll({
      where: { Aufnr: selectedAuftrag[0].Aufnr },
    });

    if (auftrag.length > 0) {
      Auftrag.update(
        {
          Aufnr: selectedAuftrag[0].Aufnr,
          KunNr: selectedAuftrag[0].KunNr,
          MitID: selectedAuftrag[0].MitID,
          AufDat: selectedAuftrag[0].AufDat,
          ErlDat: selectedAuftrag[0].AufDat,
          Dauer: selectedAuftrag[0].Dauer,
          Anfahrt: selectedAuftrag[0].Anfahrt,
          Beschreibung: selectedAuftrag[0].Beschreibung,
        },
        { where: { Aufnr: selectedAuftrag[0].Aufnr } }
      );
      res.status(200).json({ message: "Update erfolgreich" });
    } else {
      res.status(404).json({ message: "Auftraege existieren nicht" });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createAuftrag = async (req, res) => {
  try {
    const {
      Aufnr,
      MitID,
      KunNr,
      AufDat,
      ErlDat,
      Dauer,
      Anfahrt,
      Beschreibung,
    } = await req.body.params.selectedAuftrag;

    await Auftrag.create({
      Aufnr: Aufnr ? Aufnr : null,
      MitID: MitID ? MitID : null,
      KunNr: KunNr,
      AufDat: AufDat,
      ErlDat: ErlDat ? ErlDat : null,
      Dauer: Dauer ? Dauer : null,
      Anfahrt: Anfahrt ? Anfahrt : null,
      Beschreibung: Beschreibung ? Beschreibung : null,
    });
    res.status(200).json({ message: "Auftrag erfolgreich erstellt" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createAuftragWithoutTrigger = async (req, res) => {
  try {
    const {
      Aufnr,
      MitID,
      KunNr,
      AufDat,
      ErlDat,
      Dauer,
      Anfahrt,
      Beschreibung,
    } = await req.body.params.selectedAuftrag;

    await AuftragWithoutTrigger.create({
      Aufnr: Aufnr ? Aufnr : null,
      MitID: MitID ? MitID : null,
      KunNr: KunNr,
      AufDat: AufDat,
      ErlDat: ErlDat ? ErlDat : null,
      Dauer: Dauer ? Dauer : null,
      Anfahrt: Anfahrt ? Anfahrt : null,
      Beschreibung: Beschreibung ? Beschreibung : null,
    });
    res.status(200).json({ message: "Auftrag erfolgreich erstellt" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
