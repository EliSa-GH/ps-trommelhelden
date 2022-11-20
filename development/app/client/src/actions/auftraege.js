import * as api from "../api";

export const getNewAuftraege = (MitID) => async (dispatch) => {
  try {
    const { data } = await api.fetchNewAuftraege(MitID);
    dispatch({ type: "FETCH_NEW", payload: data });
  } catch (error) {
    console.log(error.message);
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
