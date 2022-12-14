CREATE TRIGGER Aufnr_PK_Increment
ON Auftrag INSTEAD OF INSERT
	AS
	BEGIN
		insert into Auftrag 
			(Aufnr, MitID, KunNr, AufDat, ErlDat, Dauer, Anfahrt, Beschreibung)
		select 
			(select max(Aufnr) from Auftrag) + 1 ,
			i.MitID,
			i.KunNr,
			i.AufDat,
			i.ErlDat,
			i.Dauer,
			i.Anfahrt,
			i.Beschreibung 
		from inserted i;
	END