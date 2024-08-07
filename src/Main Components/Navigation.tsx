import "./Navigations.css";
import logo from "../Images/signchat-logo.svg";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLogin } from "../Store-Redux/LoginReducer";

function Navigation() {
  const dispatchModal = useDispatch();

  function openLoginPage() {
    dispatchModal(openLogin());
  }

  return (
    <>
      <div className="navigation-main">
        <div className="main-logo">
          <img src={logo} alt="main-logo" />
        </div>
        <div className="nav-buttons">
          <span>
            <NavLink to="/">Home</NavLink>
          </span>
          <span>
            <NavLink to="/about">About</NavLink>
          </span>
          <span style={{ marginRight: "1rem" }}>
            <NavLink to="/contact">Contact</NavLink>
          </span>
          <Button buttonName="Login" openModal={openLoginPage}/>
        </div>
      </div>
    </>
  );
}

export default Navigation;
