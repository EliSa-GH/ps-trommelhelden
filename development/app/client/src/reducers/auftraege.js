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
    default:
      return auftraege;
  }
};
