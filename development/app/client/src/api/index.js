import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchAuftraege = () => API.get("/auftraege");
export const fetchKunden = () => API.get("/kunden");
