import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { Login, SignUp, Homepage, MyAccount } from "./pages";
import { ReservationRequest } from "./pages/ReservationRequest";
import { RequestDetails } from "./pages/RequestDetails";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request" element={<ReservationRequest />} />
        <Route path="/reservations/:id" element={<RequestDetails />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
