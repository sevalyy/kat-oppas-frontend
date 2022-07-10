import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectUser, selectToken } from "../store/user/selectors";
import "./style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchMyReservations } from "../store/reservation/thunks";
import { selectMyReservations } from "../store/reservation/selector";

export const MyAccount = () => {
  const token = useSelector(selectToken);
  console.log("user token", token);
  const userDetails = useSelector(selectUser);
  const myReservations = useSelector(selectMyReservations);

  const [name, setName] = useState(userDetails.name);
  const [aboutMe, setAboutMe] = useState(userDetails.aboutMe);
  const [telephone, setTelephone] = useState(userDetails.telephone);

  console.log("user details", userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function submitForm(event) {
    event.preventDefault();
    // write func. here
  }
  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
    dispatch(fetchMyReservations());
  }, [userDetails, navigate, dispatch]);

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            onChange={(event) => setName(event.target.value)}
            type="text"
            value={name}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control
            type="text"
            value={userDetails.email}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Telephone number: </Form.Label>
          <Form.Control
            onChange={(event) => setTelephone(event.target.value)}
            type="text"
            value={telephone}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>About me and my cat: </Form.Label>
          <Form.Control
            onChange={(event) => setAboutMe(event.target.value)}
            type="text"
            value={aboutMe}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>My Credit(s): </Form.Label>
          <Form.Control
            type="text"
            value={userDetails.credits}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>My Blocked Credit(s): </Form.Label>
          <Form.Control
            type="text"
            value={userDetails.blockedCredits}
            disabled
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Button type="submit" onClick={submitForm}>
            Update
          </Button>
        </Form.Group>
      </Form>

      <hr />
      <ul>
        <h2>My Reservations</h2>
        {myReservations.map((r) => {
          return (
            <li key={r.id}>
              <img
                alt="cat"
                src={r.imageUrl}
                style={{ height: 100, weight: 100 }}
              />
              Date: {r.startDate} Status: {r.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
