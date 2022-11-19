export default (mitarbeiter = [], action) => {
  switch (action.type) {
    case "FETCH_MIT_NAMELIST":
      return action.payload;
    default:
      return mitarbeiter;
  }
};
