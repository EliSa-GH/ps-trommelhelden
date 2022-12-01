create database trommelhelden;
go

use trommelhelden;
go

CREATE TABLE ersatzteil (
	etid char(5) COLLATE Latin1_General_CI_AS NOT NULL,
	etbezeichnung varchar(100) COLLATE Latin1_General_CI_AS NOT NULL,
	etpreis smallmoney NOT NULL,
	etanzlager int NOT NULL,
	ethersteller varchar(30) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK__ersatzte__C4F20831CF3208AC PRIMARY KEY (etid)
);
go

CREATE TABLE kunde (
	kunnr int NOT NULL,
	kunname varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	kunort varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	kunplz char(5) COLLATE Latin1_General_CI_AS NOT NULL,
	kunstrasse varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	CONSTRAINT PK__kunde__E5D94C28223FA5DB PRIMARY KEY (kunnr)
);
go

CREATE TABLE mitarbeiter (
	mitid char(3) COLLATE Latin1_General_CI_AS NOT NULL,
	mitname varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	mitvorname varchar(20) COLLATE Latin1_General_CI_AS NULL,
	mitgebdat date NOT NULL,
	mitjob varchar(20) COLLATE Latin1_General_CI_AS NOT NULL,
	mitstundensatz smallmoney NULL,
	miteinsatzort varchar(20) COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT PK__mitarbei__D264E69791F9427C PRIMARY KEY (mitid)
);
go

CREATE TABLE auftrag (
	Aufnr int NOT NULL,
	MitID char(3) COLLATE Latin1_General_CI_AS NULL,
	KunNr int NOT NULL,
	AufDat date NOT NULL,
	ErlDat date NULL,
	Dauer decimal(5,1) NULL,
	Anfahrt int NULL,
	Beschreibung text COLLATE Latin1_General_CI_AS NULL,
	CONSTRAINT PK__auftrag__D56A0E1336045532 PRIMARY KEY (Aufnr),
	CONSTRAINT FK__auftrag__KunNr__5C6CB6D7 FOREIGN KEY (KunNr) REFERENCES kunde(kunnr),
	CONSTRAINT FK__auftrag__MitID__5B78929E FOREIGN KEY (MitID) REFERENCES mitarbeiter(mitid)
);

CREATE TABLE montage (
	EtID char(5) COLLATE Latin1_General_CI_AS NOT NULL,
	AufNr int NOT NULL,
	Anzahl int NOT NULL,
	CONSTRAINT PK__montage__4FC2336373B5C79E PRIMARY KEY (EtID,AufNr),
	CONSTRAINT FK__montage__AufNr__5F492382 FOREIGN KEY (AufNr) REFERENCES auftrag(Aufnr),
	CONSTRAINT FK__montage__EtID__5E54FF49 FOREIGN KEY (EtID) REFERENCES ersatzteil(etid)
);