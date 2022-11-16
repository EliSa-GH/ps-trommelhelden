import * as api from "../api";

export const getAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAuftraege();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
