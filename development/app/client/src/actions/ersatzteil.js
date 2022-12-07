import * as api from "../api";

export const getErsatzteil = () => async (dispatch) => {
  try {
    const { data } = await api.fetchErsatzteil();
    dispatch({ type: "FETCH_ALL_ERSATZTEIL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteErsatzteil = (EtID) => async (dispatch) => {
  try {
    await api.deleteErsatzteil(EtID);
    dispatch({ type: "DELETE_ERSATZTEIL", payload: EtID });
  } catch (error) {
    console.log(error);
  }
};

export const createErsatzteil = (details) => async (dispatch) => {
  try{
    console.log(details)
    await api.createErsatzteil(details);
    dispatch({ type: "CREATE_ERSATZTEIL", payload: details});
  } catch (error){
    console.log(error);
  }
}