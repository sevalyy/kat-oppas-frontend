import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectUser, selectToken } from "../store/user/selectors";
import "./style.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { fetchMyReservations } from "../store/reservation/thunks";
import { updateUserInfo } from "../store/user/thunks";
import { selectMyReservations } from "../store/reservation/selector";
import Status from "../components/Status";
import { Link } from "react-router-dom";

export const MyAccount = () => {
  const token = useSelector(selectToken);
  console.log("user token", token);
  const userDetails = useSelector(selectUser);
  const myReservations = useSelector(selectMyReservations);

  console.log("user boo", userDetails);

  const [name, setName] = useState(userDetails.name);
  const [aboutMe, setAboutMe] = useState(userDetails.aboutMe);
  const [telephone, setTelephone] = useState(userDetails.telephone);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateUserInfo(name, telephone, aboutMe));
  }

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
    dispatch(fetchMyReservations());
  }, [userDetails, navigate, dispatch]);

  return (
    <div style={{ display: "flex", justifyContent: "spaceAround", margin: 30 }}>
      <div style={{}}>
        <h2>User Info</h2>
        {userDetails && (
          <Form>
            <Form.Group>
              <Form.Label>Name: </Form.Label>
              <Form.Control
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder={userDetails.name}
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
                placeholder={userDetails.telephone}
                value={telephone}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>About me and my cat: </Form.Label>
              <Form.Control
                onChange={(event) => setAboutMe(event.target.value)}
                placeholder={userDetails.aboutMe}
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
        )}
      </div>

      <div>
        <ul>
          <h2>My Reservations</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {myReservations
              .filter(
                (myReservations) =>
                  myReservations.requesterUserId === userDetails.id
              )
              .map((r) => {
                return (
                  <li key={r.id}>
                    <img
                      alt="cat"
                      src={r.imageUrl}
                      style={{ height: 100, weight: 100 }}
                    />
                    <p>Status:{<Status status={r.status} />}</p>

                    <p>
                      Date: {r.startDate} - {r.endDate}
                    </p>
                    <Link to={`/reservations/${r.id}`}>details</Link>
                    <hr />
                  </li>
                );
              })}
          </div>
        </ul>
      </div>
      <div>
        <ul>
          <h2>Cats 🐾 I Take Care Of</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {myReservations
              .filter(
                (myReservations) =>
                  myReservations.providerUserId === userDetails.id
              )
              .map((r) => {
                return (
                  <li key={r.id}>
                    <img
                      alt="cat"
                      src={r.imageUrl}
                      style={{ height: 100, weight: 100 }}
                    />
                    <p>Status:{<Status status={r.status} />}</p>

                    <p>
                      Date: {r.startDate} - {r.endDate}
                    </p>
                    <Link to={`/reservations/${r.id}`}>details</Link>
                    <hr />
                  </li>
                );
              })}
          </div>
        </ul>
      </div>
    </div>
  );
};
