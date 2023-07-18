import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { useAuth } from "../../context";
import { loginHandler } from "../../services";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      console.log("Valid Input");
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Number");
    }
  };

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      console.log("Valid Input");

      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invaild Password entered");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isNumberValid && isPasswordValid) {
      const { accessToken, username } = await loginHandler(number, password);
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken,
      });
      authDispatch({
        type: "SET_USER_NAME",
        payload: username,
      });
    }
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleTestCredentialsClick = async () => {
    const { accessToken, username } = await loginHandler(
      9999999999,
      "Admin#1234"
    );
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: accessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: username,
    });
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className=" d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={number}
            className="auth-input"
            placeholder="Enter Mobile Number"
            maxLength="10"
            type="number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className=" d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="button btn-primary cursor btn-login">Login</button>
        </div>
        <div className="cta">
          <button
            className="button btn-outline-primary  cursor-pointer"
            onClick={handleTestCredentialsClick}
          >
            Login with test credenials
          </button>
        </div>
      </form>
    </div>
  );
};
