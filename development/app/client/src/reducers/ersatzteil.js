export default (ersatzteil = [], action) => {
    switch (action.type) {
      case "FETCH_ALL_ERSATZTEIL":
        return action.payload;
      case "DELETE_ERSATZTEIL":
        return ersatzteil.filter(
          (ersatzteil) => ersatzteil.EtID !== action.payload.EtID
        );
      case "CREATE_ERSATTEIL":
        return [...ersatzteil, action.payload];
      default:
        return ersatzteil;
    }
  };
  