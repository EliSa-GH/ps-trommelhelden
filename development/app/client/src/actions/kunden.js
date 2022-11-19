import * as api from "../api";

export const getKunden = () => async (dispatch) => {
  try {
    const { data } = await api.fetchKunden();
    dispatch({ type: "FETCH_ALL_KUNDEN", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
