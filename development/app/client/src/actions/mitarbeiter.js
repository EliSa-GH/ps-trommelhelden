import * as api from "../api";

export const getMitarbeiter = () => async (dispatch) => {
  try {
    const { data } = await api.fetchMitarbeiter();
    dispatch({ type: "FETCH_MIT_NAMELIST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMitarbeiter = (MitID) => async (dispatch) => {
   try {
    await api.deleteMitarbeiter(MitID);
    dispatch({ type: "DELETE_MITARBEITER", payload: MitID });
  } catch (error) {
    console.log(error);
  }
};

export const createMitarbeiter = (mDetails) => async (dispatch) => {
  try{
    console.log(mDetails)
    await api.createMitarbeiter(mDetails);
    dispatch({ type: "CREATE_MITARBEITER", payload: mDetails});
  } catch (error){
    console.log(error);
  }
};

export const editMitarbeiter = (data) => async (dispatch) => {
  try {
    await api.editMitarbeiter(data);
    dispatch({ type: "EDIT_MITARBEITER", payload: data })
  } catch (error) {
    console.log(error);
  }
};