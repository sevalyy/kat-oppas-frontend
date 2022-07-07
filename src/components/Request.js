import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewReservation } from "../store/reservation/thunks";
import { LocationFinder } from "./LocationFinder";

export const Request = (props) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const setMyLocation = (newLatitude, newLongitude) => {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
  };
  function submitForm(event) {
    event.preventDefault();

    dispatch(
      postNewReservation(startDate, endDate, description, longitude, latitude)
    );
    setDescription("");
  }
  return (
    <Form>
      <img alt="Cat" src="https://cataas.com/cat?width=300" />

      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          // value = today ???
          onChange={(event) => setStartDate(event.target.value)}
          type="date"
          min="2022-07-05" // today
          max="2023-12-31"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          // value = today +1
          onChange={(event) => setEndDate(event.target.value)}
          type="date"
          min="2022-07-06" // today +1
          max="2023-12-31"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>About my cat: </Form.Label>
        <Form.Control
          // value = today +1
          onChange={(event) => setDescription(event.target.value)}
          type="text"
          value={description}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>latitude: </Form.Label>
        <Form.Control type="text" value={latitude} />
      </Form.Group>
      <Form.Group>
        <Form.Label>longitude: </Form.Label>
        <Form.Control type="text" value={longitude} />
      </Form.Group>

      <LocationFinder onPositionFound={setMyLocation} />

      <Form.Group>
        <Button type="submit" onClick={submitForm}>
          Submit
        </Button>
      </Form.Group>

      <p> {/* long: {props.longitude} lat: {props.latitude} */}</p>
    </Form>
    /* 
      <div class="col">
                    <label for="date">Date</label>
                    <input type="date" onload="getDate()" class="form-control" id="date" 
                      name="date">
                </div>
      function getDate(){
    var today = new Date();
document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
} */
  );
};
