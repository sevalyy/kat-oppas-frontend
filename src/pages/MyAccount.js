import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectUser, selectToken } from "../store/user/selectors";
import "./style.css";
import { fetchMyReservations } from "../store/reservation/thunks";
import { selectMyReservations } from "../store/reservation/selector";

export const MyAccount = () => {
  const token = useSelector(selectToken);
  console.log("user token", token);
  const userDetails = useSelector(selectUser);
  const myReservations = useSelector(selectMyReservations);

  console.log("user details", userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
    dispatch(fetchMyReservations());
  }, [userDetails, navigate, dispatch]);
  // const dispatch = useDispatch();

  return (
    <div>
      <p>Name: {userDetails.name}</p>
      <p>Email: {userDetails.email}</p>
      <p>Telephone number: {userDetails.telephone} </p>
      <p>About me and my cat: {userDetails.aboutMe}</p>
      <p>Credit: {userDetails.credits} </p>
      <p>Blocked Credit: {userDetails.blockedCredits}</p>
      <button>Update</button>
      <hr />
      <ol>
        {myReservations.map((r) => {
          return <li>{r.startDate}</li>;
        })}
      </ol>
    </div>
  );
};
