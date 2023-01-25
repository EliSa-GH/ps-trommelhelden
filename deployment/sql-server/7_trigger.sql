create trigger T_MitID
on mitarbeiter instead of insert
as
begin
	declare @t_mitid char(3);
	set @t_mitid = (select max(mitid) from mitarbeiter) + 1

	declare @mitname varchar(20);
	select @mitname = mitname from inserted

	declare @mitvorname varchar(20)
	select @mitvorname = mitvorname from inserted

	declare @mitgebdat date;
	select @mitgebdat = mitgebdat from inserted

	declare @mitjob varchar(20)
	select @mitjob = mitjob from inserted

	declare @mitstundensatz smallmoney
	select @mitstundensatz = mitstundensatz from inserted

	declare @miteinsatzort varchar(20)
	select @miteinsatzort = miteinsatzort from inserted
	
	insert into mitarbeiter (mitid, mitname, mitvorname, mitgebdat, mitjob, mitstundensatz, miteinsatzort)
	values(@t_mitid, @mitname, @mitvorname, @mitgebdat, @mitjob, @mitstundensatz, @miteinsatzort)
end

/* kurzer Alternativ */
/* CREATE TRIGGER MitID_PK_Increment
ON Mitarbeiter INSTEAD OF INSERT
	AS
	BEGIN
		INSERT INTO Mitarbeiter 
			(MitId, MitName, MitVorname, MitGebDat, MitJob, MitStundensatz, MitEinsatzort)
		SELECT 
			(SELECT max(MitID) FROM Mitarbeiter) + 1 ,
			 i.MitName, 
			 i.MitVorname, 
			 i.MitGebDat, 
			 i.MitJob, 
			 i.MitStundensatz, 
			 i.MitEinsatzort
		FROM inserted i;
END */