import * as api from "../api";

export const getErsatzteil = () => async (dispatch) => {
  try {
    const { data } = await api.fetchErsatzteil();
    dispatch({ type: "FETCH_ALL_ERSATZTEIL", payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteErsatzteil = (EtID) => async (dispatch) => {
  try {
    await api.deleteErsatzteil(EtID);
    dispatch({ type: "DELETE_ERSATZTEIL", payload: EtID });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createErsatzteil = (details) => async (dispatch) => {
  try {
    await api.createErsatzteil(details);
    dispatch({ type: "CREATE_ERSATZTEIL", payload: details });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editErsatzteil = (data) => async (dispatch) => {
  try {
    await api.editErsatzteil(data);
    dispatch({ type: "EDIT_ERSATZTEIL", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
