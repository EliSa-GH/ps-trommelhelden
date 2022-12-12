export default (ersatzteil = [], action) => {
    switch (action.type) {
      case "FETCH_ALL_ERSATZTEIL":
        return action.payload;
      case "DELETE_ERSATZTEIL":
        return ersatzteil.filter(
          (ersatzteil) => ersatzteil.EtID !== action.payload.EtID
        );
      case "CREATE_ERSATZTEIL":
        return [...ersatzteil, action.payload];
      case "EDIT_ERSATZTEIL":
        return ersatzteil.map((ersatzteil) =>
          ersatzteil.EtID === action.payload.EtID ? action.payload : ersatzteil
            );
      default:
        return ersatzteil;
    }
  };
  