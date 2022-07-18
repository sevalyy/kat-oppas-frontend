import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="logo">
        {" "}
        <h3>
          {/* <span className="footerLogo">Kat-</span>Oppas */}
          🐈‍⬛ 🐈‍⬛ 🐈‍⬛
        </h3>
      </div>

      <div className="account visit">
        <h6 style={{ marginBottom: "0px" }}>ACCOUNT</h6>
        <Link to={"/myaccount"}>My Account</Link>
        <br />
        <Link to={"/request"}>New Reservation Request</Link>
      </div>
      <div className="follow">
        <h6>
          FOLLOW <br />
          <FaFacebook /> | <FaInstagram /> | <FaTwitter />
        </h6>
      </div>
    </div>
  );
}
