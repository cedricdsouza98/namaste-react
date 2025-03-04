import { useState } from "react";
import { LOGO_URL } from "./utils/constants";
import { Link } from "react-router";
import useOnlineStatus from "./utils/useOnlineStatus";

const Header = () => {
  const [isLogin, setisLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Online: {onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              isLogin === "Login" ? setisLogin("Logout") : setisLogin("Login");
            }}
          >
            {isLogin}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
