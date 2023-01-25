CREATE TRIGGER KunNr_PK_Increment
ON Kunde INSTEAD OF INSERT
	AS
	BEGIN
		insert into Kunde 
			(KunNr, KunName, KunOrt, KunPlz, KunStrasse)
		select 
			(select max(KunNr) from Kunde) + 1 ,
      i.KunName, 
      i.KunOrt, 
      i.KunPlz, 
      i.KunStrasse
		from inserted i;
END