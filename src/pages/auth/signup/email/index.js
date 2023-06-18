import "./style.css";


import { useState } from "react";
import { registerAuthUser } from "../../../../services/auth";
import { useNavigate } from "react-router-dom";

import Notify from "../../../../components/notify";
import { svgMap } from "../../../../config/constraints";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState();

  // Validate everything
  function validateStrongPassword(password) {
    const passwordPattern = /^.{1,7}$/;

    return passwordPattern.test(password);
  }

  function validatePassword() {
    if (!validateStrongPassword(password)) {
      showNotify("error", "Something went wrong?", "At least 8 characters in length\nContains at least one uppercase letter\nContains at least one lowercase letter\nContains at least one digit\nContains at least one special character (e.g., @$!%*?&)\n")
      return false;
    }
    if (password !== password2) {
      showNotify("error", "Something went wrong?", "Password not match")
      return false;
    }
    return true;
  }

  function validateMinLength(name, minLength) {
    const lengthPattern = new RegExp(`^[a-zA-Z]{${minLength},}$`);
    return lengthPattern.test(name);
  }

  function validateFullName() {
    if (!validateMinLength(firstname, 2)) {
      showNotify("error", "Something went wrong?", "Firstname must be at least 2 characters")
      return false;
    }
    if (!validateMinLength(lastname, 2)) {
      showNotify("error", "Something went wrong?", "Lastname must be at least 2 characters")
      return false;
    }
    return true;
  }

  async function createAccount() {
    if (!validateFullName()) {
      return;
    }
    if (!validatePassword()) {
      return;
    }
    const bodyRequest = {
      email: email,
      password: password,
      fullname: `${firstname} ${lastname}`,
      birthday: date,
    };

    try {
      await registerAuthUser(bodyRequest);
      navigate("/login/email");
    } catch (error) {
      showNotify(null, "Something went wrong?", error.response.data.message)
    }
  }

  // Notify
  // Notify
  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  function showNotify(svg, title, message, cb) {
    setNotify({
      svg: svg,
      cb: cb,
      title: title,
      show: true,
      message: message,
    });
  }
  function closeNotify() {
    setNotify({
      svg: null,
      cb: null,
      title: "",
      show: false,
      message: "",
    });
  }


  // Validate Email
  const [isEmailValid, setIsEmailValid] = useState(false);
  function validateEmail() {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid = emailPattern.test(email);
    if (!isValid) {
      setIsEmailValid(false);
      showNotify("error", "Something went wrong?", "Email is not valid")
    } else {
      setIsEmailValid(true);
    }
  }

  return (
    <>
      <Notify
        cb={notify.cb}
        svg={notify.svg}
        show={notify.show}
        title={notify.title}
        handleClose={closeNotify}
        message={notify.message}
      />
      {!isEmailValid ? (
        <div className="register__container">
          <div className="register__info">
            {svgMap.create__user}
            <div className="register__info__row">
              <div className="register__title">
                Signup into Informatics Quiz
              </div>
              <div className="register__description">
                We want your email first before we go to next step
              </div>
            </div>
          </div>
          <div className="email__form">
            <div className="email__field">
              <p>Email</p>
              <input
                type="text"
                placeholder="Type your email here."
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <button onClick={validateEmail}>Continue</button>
          </div>
          <div className="register__footer">
            Please ensure that you enter a valid email address in the following
            format: example@example.com.
            <br />
            Double-check for any typos or missing characters to ensure accurate
            submission.
          </div>
        </div>
      ) : (
        <div className="register__container">
          <div className="register__info">
            {svgMap.create__user}
            <div className="register__info__row">
              <div className="register__title">
                Signup into Informatics Quiz
              </div>
              <div className="register__description">
                Almost!, We just want your identity for complete create your
                account
              </div>
            </div>
          </div>
          <div className="identity__container">
            <div className="identity__form">
              <div className="input__with__label">
                <p>First Name</p>
                <input
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                ></input>
              </div>
              <div className="input__with__label">
                <p>Last Name</p>
                <input
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                ></input>
              </div>
              <div className="input__with__label">
                <p>Password</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="input__with__label">
                <p>Confirm Password</p>
                <input
                  type="password"
                  onChange={(e) => setPassword2(e.target.value)}
                ></input>
              </div>
			  <div className="input__with__label">
                <p>Birth of Date</p>
				<input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                style={{ height: "17.25%", width: "80%", marginBottom: "5px" }}
              ></input>
              </div>
             
            </div>
            <button className="create__account__btn" onClick={createAccount}>Create Quizer</button>
          </div>
          <div className="register__footer">
            Congratulations! You're just one step away from joining our vibrant
            community.
            <br />
            By creating an account, you'll unlock a world of exciting
            opportunities and exclusive benefits. <br />
            Stay updated on the latest campus events, and embark on an
            incredible educational journey at Burapha University.
            <br />
            submission.
          </div>
        </div>
      )}

    
    </>

  );
};
export default Register;
