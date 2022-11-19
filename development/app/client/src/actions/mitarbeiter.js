import * as api from "../api";

export const getMitarbeiter = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMitarbeiter();
    dispatch({ type: "FETCH_MIT_NAMELIST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
