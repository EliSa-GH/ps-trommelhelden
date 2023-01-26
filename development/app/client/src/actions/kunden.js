import * as api from "../api";

export const getKunden = () => async (dispatch) => {
  try {
    const { data } = await api.fetchKunden();
    dispatch({ type: "FETCH_ALL_KUNDEN", payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteKunde = (KunNr) => async (dispatch) => {
  try {
    await api.deleteKunde(KunNr);
    dispatch({ type: "DELETE_KUNDE", payload: KunNr });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createKunde = (details) => async (dispatch) => {
  try {
    await api.createKunde(details);
    dispatch({ type: "CREATE_KUNDE", payload: details });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editKunde = (data) => async (dispatch) => {
  try {
    await api.editKunde(data);
    dispatch({ type: "EDIT_KUNDE", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};
