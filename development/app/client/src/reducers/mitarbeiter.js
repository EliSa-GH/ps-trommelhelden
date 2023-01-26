export default (mitarbeiter = [], action) => {
  switch (action.type) {
    case "FETCH_MIT_NAMELIST":
      return action.payload;
    case "DELETE_MITARBEITER":
      return mitarbeiter.filter(
        (mitarbeiter) => mitarbeiter.MitID !== action.payload.MitID
      );
    case "CREATE_MITARBEITER":
      return [...mitarbeiter, action.payload];
    case "EDIT_MITARBEITER":
      return mitarbeiter.map((mitarbeiter) =>
        mitarbeiter.MitID === action.payload.MitID
          ? action.payload
          : mitarbeiter
      );
    default:
      return mitarbeiter;
  }
};
