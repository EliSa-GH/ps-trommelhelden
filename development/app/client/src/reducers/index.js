import { combineReducers } from "redux";
import auftraege from "./auftraege";
import kunden from "./kunden";
import mitarbeiter from "./mitarbeiter";
import ersatzteil from "./ersatzteil";
import berichte from "./berichte";
import montage from "./montage";

export default combineReducers({
  auftraege,
  kunden,
  mitarbeiter,
  ersatzteil,
  berichte,
  montage,
});
