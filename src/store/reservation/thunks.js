import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  addNewRezervation,
  setAllReservations,
  setRezervationDetails,
} from "./slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
// import { useNavigate } from "react-router-dom";

export const fetchReservations = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/reservations`);
      dispatch(setAllReservations(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const fetchReservationById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/reservations/${id}`);
      dispatch(setRezervationDetails(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const postNewReservation = (
  startDate,
  endDate,
  description,
  longitude,
  latitude,
  imageUrl
) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/reservations`,
        {
          startDate,
          endDate,
          description,
          longitude,
          latitude,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your reservation was posted successfully",
          5000
        )
      );
      // push new rez. to allRez. with artPostSucces from slice.
      dispatch(addNewRezervation(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(appDoneLoading());
      console.log("response for bad request");
      //show bad request response in the temporary message area.
      if (e.response && e.response.data) {
        dispatch(
          showMessageWithTimeout("failure", false, e.response.data, 5000)
        );
      }
    }
  };
};
export const acceptReservation = (id) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      await axios.post(
        `${apiUrl}/reservations/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "You accepted reservation successfully",
          5000
        )
      );
    } catch (e) {
      dispatch(appDoneLoading());
      console.log(e);
    }
  };
};
