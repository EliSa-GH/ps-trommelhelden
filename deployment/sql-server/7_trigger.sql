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