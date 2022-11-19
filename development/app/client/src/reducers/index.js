import { combineReducers } from "redux";
import auftraege from "./auftraege";
import kunden from "./kunden";
import mitarbeiter from "./mitarbeiter";

export default combineReducers({ auftraege, kunden, mitarbeiter });
