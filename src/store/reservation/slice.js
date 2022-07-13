import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allReservations: [],
  reservationDetails: {},
  myReservations: [],
};

export const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setAllReservations: (state, action) => {
      state.allReservations = action.payload;
    },
    setMyReservations: (state, action) => {
      state.myReservations = action.payload;
    },
    setRezervationDetails: (state, action) => {
      state.reservationDetails = action.payload;
    },
    addNewRezervation: (state, action) => {
      state.allReservations.push(action.payload);
    },
    // changeStatus: (state, action) => {
    //   state.reservationDetails.status = 1;
    //   state.reservationDetails.providerId = action.payload;
    //  },
  },
});

export const {
  setAllReservations,
  setMyReservations,
  setRezervationDetails,
  addNewRezervation,
  //changeStatus,
} = reservationSlice.actions;

export default reservationSlice.reducer;
