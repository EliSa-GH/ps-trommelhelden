import { combineReducers } from "redux";
import auftraege from "./auftraege";
import kunden from "./kunden";
import mitarbeiter from "./mitarbeiter";
import ersatzteil from "./ersatzteil";

export default combineReducers({ auftraege, kunden, mitarbeiter, ersatzteil });
