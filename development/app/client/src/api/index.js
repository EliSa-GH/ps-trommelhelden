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

// Mitarbeiter API
export const fetchMitarbeiter = () => API.get("/mitarbeiter");

// Kunden API
export const fetchKunden = () => API.get("/kunden");
export const deleteKunde = (KunNr) =>
  API.delete(`/kunden/delete`, { params: { KunNr: KunNr } });
export const editKunde = () => API.patch("/kunden/edit");
