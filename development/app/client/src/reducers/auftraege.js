export default (auftraege = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_AUFTRAG":
      return action.payload;
    case "FETCH_NEW":
      return action.payload;
    case "FETCH_ERL":
      return action.payload;
    case "FETCH_OFFEN":
      return action.payload;
    case "DELETE_AUFTRAG":
      return auftraege.filter(
        (auftrag) => auftrag.Aufnr !== action.payload.AufNr
      );
    case "SET_AUFTRAG_MITARBEITER":
      return auftraege.filter(
        (auftrag) => auftrag.Aufnr !== action.payload.AufNr
      );
    case "EDIT_AUFTRAG":
      return auftraege.map((auftrag) =>
        auftrag.Aufnr === action.payload.Aufnr ? action.payload : auftrag
      );
    case "CREATE_AUFTRAG":
      return [...auftraege, action.payload];
    default:
      return auftraege;
  }
};
