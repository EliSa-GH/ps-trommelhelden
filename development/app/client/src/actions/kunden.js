import * as api from "../api";

export const getKunden = () => async (dispatch) => {
  try {
    const { data } = await api.fetchKunden();
    dispatch({ type: "FETCH_ALL_KUNDEN", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createKunde = (details) => async (dispatch) => {
  try{
    console.log(details)
    await api.createKunde(details);
    dispatch({ type: "CREATE_KUNDE", payload: details});
  } catch (error){
    console.log(error);
  }
}