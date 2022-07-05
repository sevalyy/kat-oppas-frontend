import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allReservations: [],
  reservationDetails: {},
};

export const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setAllReservations: (state, action) => {
      state.allReservations = action.payload;
    },

    setRezervationDetails: (state, action) => {
      state.reservationDetails = action.payload;
    },
    addNewRezervation: (state, action) => {
      state.allReservations.push(action.payload);
    },
  },
});

export const { setAllReservations, setRezervationDetails, addNewRezervation } =
  reservationSlice.actions;

export default reservationSlice.reducer;
