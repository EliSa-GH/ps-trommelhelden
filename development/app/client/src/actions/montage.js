import * as api from "../api";

export const createMontage = (Aufnr, ersatzteile) => async (dispatch) => {
  try {
    await api.createMontage(Aufnr, ersatzteile);
    dispatch({ type: "CREATE_MONTAGE", payload: Aufnr });
  } catch (error) {
    console.log(error);
  }
};
