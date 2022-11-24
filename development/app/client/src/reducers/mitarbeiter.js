export default (mitarbeiter = [], action) => {
  switch (action.type) {
    case "FETCH_MIT_NAMELIST":
      return action.payload;
    case "DELETE_MITARBEITER":
      return mitarbeiter.filter(
        (mitarbeiter) => mitarbeiter.MitID !== action.payload.MitID
      );
    default:
      return mitarbeiter;
  }
};
