export default (kunden = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_KUNDEN":
      return action.payload;
    case "DELETE_AUFTRAG":
      return kunden.filter(
        (kunde) => kunde.KunNr !== action.payload.KunNr
      );
    case "EDIT_KUNDE":
      return kunden.filter(
        (kunde) => kunde.KunNr !== action.payload.KunNr);
    default:
      return kunden;
  }
};
