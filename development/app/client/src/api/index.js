import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Auftraege API
export const fetchNewAuftraege = (MitID) =>
  API.get("/auftraege", { params: { MitID: MitID } });
export const fetchErlAuftraege = () => API.get("/auftraege/erl");
export const fetchOffenAuftraege = () => API.get("/auftraege/offen");
export const deleteAuftrag = (AufNr) =>
  API.delete(`/auftraege/`, { params: { AufNr: AufNr } });

// Mitarbeiter API
export const fetchMitarbeiter = () => API.get("/mitarbeiter");

// Kunden API
export const fetchKunden = () => API.get("/kunden");
