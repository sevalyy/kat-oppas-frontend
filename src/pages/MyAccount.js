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
import CatList from "../components/CatList";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export const MyAccount = () => {
  const token = useSelector(selectToken);
  const userDetails = useSelector(selectUser);
  const myReservations = useSelector(selectMyReservations);

  console.log("user boo", userDetails);

  const [name, setName] = useState(userDetails ? userDetails.name : "");
  const [aboutMe, setAboutMe] = useState(
    userDetails ? userDetails.aboutMe : ""
  );
  const [telephone, setTelephone] = useState(
    userDetails ? userDetails.telephone : ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();
    dispatch(updateUserInfo(name, telephone, aboutMe));
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    } else {
      dispatch(fetchMyReservations());
    }
  }, [token, navigate, dispatch]);

  return (
    <Container>
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="User Info">
          <h2 style={{ textAlign: "center" }}>User Info</h2>
          {userDetails && (
            <Form
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "70%",
              }}
            >
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
                <hr />
                <Button
                  type="submit"
                  onClick={submitForm}
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "10px",
                    marginTop: "10px",
                    width: "70%",
                    border: "2px solid ",
                    borderRadius: "10px",
                    backgroundColor: "#B1BCE6",
                    color: "black",
                  }}
                >
                  Update
                </Button>
              </Form.Group>
            </Form>
          )}
        </Tab>
        <Tab eventKey="requests" title="🐾 My Reservations">
          <CatList
            title="My 🐾 Reservations"
            reservations={myReservations}
            filterReservations={(myRes) =>
              myRes.requesterUserId === userDetails.id
            }
          />
        </Tab>
        <Tab eventKey="takecareof" title="🐾 Cats I Take Care Of">
          <CatList
            title="Cats 🐾 I Take Care Of"
            reservations={myReservations}
            filterReservations={(myRes) =>
              myRes.providerUserId === userDetails.id
            }
          />
        </Tab>
      </Tabs>
    </Container>
  );
};
