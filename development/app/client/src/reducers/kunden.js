export default (kunden = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_KUNDEN":
      return action.payload;
    case "DELETE_KUNDE":
      return kunden.filter(
        (kunde) => kunde.KunNr !== action.payload.KunNr
      );
    case "CREATE_KUNDE":
        return [...kunden, action.payload]
    default:
      return kunden;
  }
};
