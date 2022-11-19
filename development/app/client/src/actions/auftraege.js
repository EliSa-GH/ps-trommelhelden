import * as api from "../api";

export const getAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAuftraege();
    dispatch({ type: "FETCH_ALL_AUFTRAG", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getErlAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchErlAuftraege();
    dispatch({ type: "FETCH_ERL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOffenAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOffenAuftraege();
    dispatch({ type: "FETCH_OFFEN", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
