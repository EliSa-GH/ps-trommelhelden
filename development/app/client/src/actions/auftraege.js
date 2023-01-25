import * as api from "../api";

export const getAllAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllAuftraege();
    dispatch({ type: "FETCH_ALL_AUFTRAG", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getNewAuftraege = (MitID) => async (dispatch) => {
  try {
    const { data } = await api.fetchNewAuftraege(MitID);
    dispatch({ type: "FETCH_NEW", payload: data });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getErlAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchErlAuftraege();
    dispatch({ type: "FETCH_ERL", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getOffenAuftraege = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOffenAuftraege();
    dispatch({ type: "FETCH_OFFEN", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuftrag = (AufNr) => async (dispatch) => {
  try {
    await api.deleteAuftrag(AufNr);
    dispatch({ type: "DELETE_AUFTRAG", payload: AufNr });
  } catch (error) {
    console.log(error);
  }
};

export const setAuftragMitarbeiter = (AufNr, MitID) => async (dispatch) => {
  try {
    await api.setAuftragMitarbeiter(AufNr, MitID);
    dispatch({ type: "SET_AUFTRAG_MITARBEITER", payload: { AufNr, MitID } });
  } catch (error) {
    console.log(error);
  }
};

export const editAuftrag = (selectedAuftrag) => async (dispatch) => {
  try {
    await api.editAuftrag(selectedAuftrag);
    dispatch({ type: "EDIT_AUFTRAG", payload: selectedAuftrag });
  } catch (error) {
    console.log(error);
  }
};

export const createAuftrag = (selectedAuftrag) => async (dispatch) => {
  try {
    await api.createAuftrag(selectedAuftrag);
    dispatch({ type: "CREATE_AUFTRAG", payload: selectedAuftrag });
  } catch (error) {
    console.log(error);
  }
};

export const createAuftragWithoutTrigger =
  (selectedAuftrag) => async (dispatch) => {
    try {
      console.log(selectedAuftrag);
      await api.createAuftragWithoutTrigger(selectedAuftrag);
      dispatch({
        type: "CREATE_AUFTRAG_WITHOUT_TRIGGER",
        payload: selectedAuftrag,
      });
    } catch (error) {
      console.log(error);
    }
  };
