import Button from "../../Main Components/Button";
import { useState, useEffect } from "react";
import man from "../../Images/medium-shot-man-with-laptop.svg";
import mainLogo from "../../Images/signchat-logo.svg";
import "../Login.css";
import { useDispatch, useSelector } from "react-redux";
import { openSignup } from "../../Store-Redux/SignupReducer";
import { closeLogin } from "../../Store-Redux/LoginReducer";
import { api } from "../../API/Axios";
import { endpoints } from "../../API/Endpoints";
import notValid from "../../Icons/icons8-close-colored.svg";
import {
  setNotificationBackgroundColor,
  setNotificationBorderColor,
  setNotificationIcon,
  setNotificationMessage,
  setNotificationTextColor,
  setShowNotification,
} from "../../Store-Redux/NotificationReducer";
import { setToken, setUserInfo } from "../../Store-Redux/AuthReducer";
import { useNavigate } from "react-router";

function LoginInputs() {
  //open signup page when you click signup
  const notificationIsOpen = useSelector(
    (state: any) => state.notification.notificationIsOpen
  );

  //authentication
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // notification closes after 4secs
  useEffect(() => {
    const closeNotificationAfterDelay = setTimeout(() => {
      dispatchNotifications(setShowNotification(false));
    }, 4000);

    return () => {
      clearTimeout(closeNotificationAfterDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationIsOpen]);

  //Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openSignupPage() {
    dispatch(openSignup());
    dispatch(closeLogin());
  }

   console.log(notificationIsOpen);

  const dispatchNotifications = useDispatch();

  async function submitLoginDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    try {
      setIsLoading(true);
      const response = await api.post(endpoints.signIn, data);
      console.log(response.data);
      dispatch(setToken(response.data.idToken));
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("user", response.data);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoading(false);
      setUserInfo(response.data.email);
      navigate(`/videocall`);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
        dispatchNotifications(setShowNotification(true));
        dispatchNotifications(
          setNotificationMessage("Email doesn't exist. Please sign up")
        );
        dispatchNotifications(setNotificationIcon(notValid));
        dispatchNotifications(setNotificationBackgroundColor("#ffc8c8"));
        dispatchNotifications(setNotificationTextColor("#800000"));
        dispatchNotifications(setNotificationBorderColor("#800000"));
        return;
      }
      if (error.response.data.error.message === "INVALID_PASSWORD") {
        dispatchNotifications(setShowNotification(true));
        dispatchNotifications(
          setNotificationMessage("Invalid Password. Try Again")
        );
        dispatchNotifications(setNotificationIcon(notValid));
        dispatchNotifications(setNotificationBackgroundColor("#ffc8c8"));
        dispatchNotifications(setNotificationTextColor("#800000"));
        dispatchNotifications(setNotificationBorderColor("#800000"));
        return;
      }

      setEmail("");
      setPassword("");
    }
  }
  return (
    <>
      <div className="login-inputs-main">
        <div className="login-inputs">
          <div className="login-inputs-logo">
            <img src={mainLogo} alt="main-logo" />
          </div>
          <h1>Welcome Back</h1>
          <form onSubmit={submitLoginDetails}>
            <input
              type="text"
              className="email"
              placeholder="Enter your email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              value={email}
            />
            <input
              type="password"
              className="password"
              placeholder="Enter password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              value={password}
            />
            {!isLoading && <Button buttonName="Login" />}
            {isLoading && <Button buttonName="Logging in..." />}
          </form>
          <span className="switch-to-signup">
            Don't have an account?{" "}
            <span className="signup-link" onClick={openSignupPage}>
              Sign up
            </span>
          </span>
        </div>
        <div className="login-image">
          <img src={man} alt="man-on-camera" />
        </div>
      </div>
    </>
  );
}

export default LoginInputs;
