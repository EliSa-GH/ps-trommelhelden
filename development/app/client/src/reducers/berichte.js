export default (berichte = [], action) => {
  switch (action.type) {
    case "FETCH_BERICHT":
      return action.payload;
    default:
      return berichte;
  }
};
