import * as api from "../api";

export const getKunden = () => async (dispatch) => {
  try {
    const { data } = await api.fetchKunden();
    dispatch({ type: "FETCH_ALL_KUNDEN", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKunde = (KunNr) => async (dispatch) => {
  //alert("wir sind hier");
  try {
    await api.deleteKunde(KunNr);
    dispatch({ type: "DELETE_KUNDE", payload: KunNr });
  } catch (error) {
    console.log(error);
  }
};

export const editKunde = (data) => async (dispatch) => {
  try {
    await api.editKunde();
    dispatch({ type: "EDIT_KUNDE", payload: data })
  } catch (error) {
    console.log(error);
  }
};