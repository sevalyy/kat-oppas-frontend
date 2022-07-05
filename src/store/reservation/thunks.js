import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  addNewRezervation,
  setAllReservations,
  setRezervationDetails,
} from "./slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";

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
  latitude
) => {
  return async (dispatch, getState) => {
    try {
      //   const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/reservations`,
        {
          startDate,
          endDate,
          description,
          longitude,
          latitude,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your reservation was posted successfully",
          3000
        )
      );
      // push new rez. to allRez. with artPostSucces from slice.
      dispatch(addNewRezervation(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};
