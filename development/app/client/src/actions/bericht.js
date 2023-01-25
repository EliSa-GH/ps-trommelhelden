import * as api from "../api";
export const getBerichte = (etAnzahl) => async (dispatch) => {
  try {
    const { data } = await api.getBerichte(etAnzahl);
    dispatch({ type: "FETCH_BERICHT", payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
