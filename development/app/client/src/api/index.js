import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Auftraege API
export const fetchNewAuftraege = (MitID) =>
  API.get("/auftraege", { params: { MitID: MitID } });
export const fetchErlAuftraege = () => API.get("/auftraege/erl");
export const fetchOffenAuftraege = () => API.get("/auftraege/offen");
export const deleteAuftrag = (AufNr) =>
  API.delete(`/auftraege/delete`, { params: { AufNr } });
export const setAuftragMitarbeiter = (AufNr, MitID) =>
  API.post("/auftraege/assign", { params: { AufNr, MitID } });
export const editAuftrag = (selectedAuftrag) =>
  API.patch(`/auftraege/edit`, {
    params: { selectedAuftrag },
  });
export const createAuftrag = (selectedAuftrag, KunNr) =>
  API.post("/auftraege/create", { params: { selectedAuftrag, KunNr } });

// Mitarbeiter API
export const fetchMitarbeiter = () => API.get("/mitarbeiter");
export const deleteMitarbeiter = (MitID) =>
  API.delete(`/mitarbeiter/delete`, { params: { MitID: MitID } });
export const createMitarbeiter = (mDetails) =>
  API.post("/mitarbeiter/create", { params: { mDetails: mDetails } });

// Kunden API
export const fetchKunden = () => API.get("/kunden");
export const deleteKunde = (KunNr) =>
  API.delete(`/kunden/delete`, { params: { KunNr: KunNr } });
export const createKunde = (details) =>
  API.post("/kunden/create", { params: { details: details } });

  // Ersatzteil API
export const fetchErsatzteil = () => API.get("/ersatzteil");
export const deleteErsatzteil = (EtID) =>
  API.delete(`/ersatzteil/delete`, { params: { EtID: EtID } });
export const createErsatzteil = (details) =>
  API.post("/ersatzteil/create", { params: { details: details } });