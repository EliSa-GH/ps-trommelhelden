import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Auftraege API
export const fetchAuftraege = () => API.get("/auftraege");
export const fetchErlAuftraege = () => API.get("/auftraege/erl");
export const fetchOffenAuftraege = () => API.get("/auftraege/offen");

// Mitarbeiter API
export const fetchMitarbeiter = () => API.get("/mitarbeiter");

// Kunden API
export const fetchKunden = () => API.get("/kunden");
