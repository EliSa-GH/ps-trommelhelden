export default (montage = [], action) => {
  switch (action.type) {
    case "CREATE_MONTAGE":
      return [...montage, action.payload];
    default:
      return montage;
  }
};
