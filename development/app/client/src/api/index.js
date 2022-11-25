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
  API.post(
    `/auftraege/assign?MitID=${MitID}` +
      AufNr.map((AufNr) => `&AufNr[]=${AufNr}`).join("")
  );
export const editAuftrag = (selectedAuftrag) =>
  API.patch(`/auftraege/edit`, {
    params: { selectedAuftrag },
  });

// Mitarbeiter API
export const fetchMitarbeiter = () => API.get("/mitarbeiter");
export const deleteMitarbeiter = (MitID) =>
  API.delete(`/mitarbeiter/delete`, { params: { MitID: MitID } });

// Kunden API
export const fetchKunden = () => API.get("/kunden");
export const deleteKunde = (KunNr) =>
  API.delete(`/kunden/delete`, { params: { KunNr: KunNr } });
