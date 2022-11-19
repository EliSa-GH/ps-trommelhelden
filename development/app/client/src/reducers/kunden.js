export default (kunden = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_KUNDEN":
      return action.payload;
    default:
      return kunden;
  }
};
