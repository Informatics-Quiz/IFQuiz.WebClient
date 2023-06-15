import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { ReactComponent as GoogleSvg } from "../../Assets/svg/google.svg";
import { ReactComponent as EmailSvg } from "../../Assets/svg/email.svg";
import { ReactComponent as UserSvg } from "../../Assets/svg/user.svg";


const Login = () => {
  return (
    <>
      <div className="signup__container">
        <div className="login__header">
          <UserSvg className="login__image" />
          <div className="login__info">
            <div className="login__title">Login to Informatics Quiz</div>
            <div className="login__description">Go in with your account</div>
          </div>
        </div>
        <div className="continue__container">
          <Link className="signup__button" to="">
            <GoogleSvg className="signup__button__svg" />
            Continue with Google
          </Link>

          <Link className="signup__button" to="/login-email">
            <EmailSvg className="signup__button__svg" />
            Continue with Email
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;
