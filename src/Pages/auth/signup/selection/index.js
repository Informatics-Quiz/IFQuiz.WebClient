import "./style.css";

import { ReactComponent as CreateUserSvg } from "../../../../assets/svg/create__user.svg";
import { ReactComponent as GoogleSvg } from "../../../../assets/svg/google.svg";
import { ReactComponent as EmailSvg } from "../../../../assets/svg/email.svg";

import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="signup__container">
        <div className="signup__header">
          <CreateUserSvg className="signup__image" />
          <div className="signup__info">
            <div className="signup__title">Signup into Informatics Quiz</div>
            <div className="signup__description">Create a free in 2 steps</div>
          </div>
        </div>
        <div className="continue__container">
          <Link className="signup__button" to="">
            <GoogleSvg className="signup__button__svg" />
            Continue with Google
          </Link>

          <Link className="signup__button" to="/register">
            <EmailSvg className="signup__button__svg" />
            Continue with Email
          </Link>
        </div>
      </div>
    </>
  );
};
export default Signup;
