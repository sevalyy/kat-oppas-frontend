import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  addNewRezervation,
  setAllReservations,
  setMyReservations,
  setRezervationDetails,
} from "./slice";
import { appLoading, appDoneLoading } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/thunks";
import { updateUserProfile } from "../user/slice";
// import { useNavigate } from "react-router-dom";

// GET ALL REZ.
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
// GET MY REZ.
export const fetchMyReservations = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      const response = await axios.get(`${apiUrl}/reservations/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setMyReservations(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

// REZ BY ID
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

// ADD NEW REZ.
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

      // update local user details's credits
      dispatch(updateUserProfile({ user: response.data.requester }));

      // push new rez. to allRez. with artPostSucces from slice.
      dispatch(addNewRezervation(response.data));
      dispatch(appDoneLoading());
    } catch (e) {
      dispatch(appDoneLoading());
      console.log("Error in postNewReservation", e);
      //show bad request response in the temporary message area.

      if (e.response && e.response.status < 500) {
        dispatch(
          showMessageWithTimeout("failure", false, e.response.data, 5000)
        );
      } else {
        dispatch(
          showMessageWithTimeout("failure", false, "Server error.", 5000)
        );
      }
    }
  };
};

// ACCEPT A REZ.
export const acceptReservation = (id) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/reservations/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("accepted", response.data);
      dispatch(setRezervationDetails(response.data));

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
      if (e.response && e.response.data) {
        dispatch(
          showMessageWithTimeout("failure", false, e.response.data, 5000)
        );
      }
      console.log(e);
    }
  };
};

// CANCEL A REZ.
export const cancelReservation = (id) => {
  return async (dispatch, getState) => {
    try {
      const { token, profile } = getState().user;
      dispatch(appLoading());

      const response = await axios.post(
        `${apiUrl}/reservations/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("canceled rez.", response.data);

      if (profile.id === response.data.requester.id) {
        console.log("Removing blocked credits");
        dispatch(updateUserProfile({ user: response.data.requester }));
      }

      dispatch(setRezervationDetails(response.data));

      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "You canceled reservation successfully",
          5000
        )
      );
    } catch (e) {
      dispatch(appDoneLoading());
      if (e.response && e.response.data) {
        dispatch(
          showMessageWithTimeout(
            "something wrong! try again later",
            false,
            e.response.data,
            5000
          )
        );
      }
      console.log(e);
    }
  };
};
