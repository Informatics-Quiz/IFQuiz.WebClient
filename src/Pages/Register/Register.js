import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { registerAuthUser } from "../../Services/auth";
import { useNavigate } from "react-router-dom";

import { ReactComponent as CreateUserSvg } from "../../Assets/svg/create__user.svg";

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
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
  }

  function validatePassword() {
    if (!validateStrongPassword(password)) {
      errorModal(
        "At least 8 characters in length\nContains at least one uppercase letter\nContains at least one lowercase letter\nContains at least one digit\nContains at least one special character (e.g., @$!%*?&)\n"
      );
      return false;
    }
    if (password !== password2) {
      errorModal("Password not match");
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
      errorModal("Firstname must be at least 2 characters");
      return false;
    }
    if (!validateMinLength(lastname, 2)) {
      errorModal("Lastname must be at least 2 characters");
      return false;
    }
    return true;
  }

  async function createAccount() {
    if (!validatePassword()) {
      return;
    }
    if (!validateFullName()) {
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
      navigate("/login-email");
    } catch (error) {
      setErrorMessage(error.response.data.message);
      handleShow();
    }
  }

  // Modal Variables
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  function errorModal(msg) {
    setErrorMessage(msg);
    handleShow();
  }

  // Validate Email
  const [isEmailValid, setIsEmailValid] = useState(false);
  function validateEmail() {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValid = emailPattern.test(email);
    if (!isValid) {
      setIsEmailValid(false);
      errorModal("Email is not valid");
    } else {
      setIsEmailValid(true);
    }
  }

  return (
    <div>
      {!isEmailValid ? (
        <div className="register__container">
          <div className="register__info">
            <CreateUserSvg />
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
            <CreateUserSvg />
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Somthing's went wrong ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
      </Modal>
    </div>

    // <div className="ContainerRegister">
    // 	<div className="content-1">
    // 		<div className="section-1x">
    // 			<div className="row" style={{ padding: '5' }}>
    // 				<div className="col" style={{ backgroundColor: '#0D1117' }}>
    // 					<div className="col-sm-12">
    // 						<p id="section1-text1" >Continue with Email</p>
    // 						<div className="row mt-0" style={{ backgroundColor: '#0D1117' }}>
    // 							<div className="col-sm-6 col-md-8 col-xl-5 d-flex flex-column" >
    // 								<p id="section1-text1">Enter email address</p>
    // 								<input onChange={(e) => setEmail(e.target.value)}></input>
    // 								<Link
    // 									role="button"
    // 									style={{
    // 										textDecoration: 'none',
    // 										color: 'white',
    // 										backgroundColor: '#238636',
    // 										display: 'flex',
    // 										justifyContent: 'center',
    // 										borderRadius: '3px',
    // 									}}
    // 								>
    // 									<button id="btn1" onClick={loginRegister}>
    // 										Continue
    // 									</button>
    // 								</Link>
    // 							</div>
    // 						</div>
    // 					</div>

    // 				</div>
    // 				<div className="col" style={{ backgroundColor: '#0D1117' }}>
    // 					<p id="fontresp">Please fill in your account details</p>
    // 					<div className="col-sm-6  col-md-7 col-lg-7 col-xl-4">
    // 						<p>firstname</p>
    // 						<input style={{ width: '100%' }} onChange={(e) => setFirstname(e.target.value)}></input>
    // 					</div>
    // 					<div className="col-sm-12  col-md-7 col-lg-7 col-xl-4">
    // 						<p className="mt-1">Lastname</p>
    // 						<input style={{ width: '100%' }} onChange={(e) => setLastname(e.target.value)}></input>
    // 					</div>
    // 					<div className="col-sm-12 col-md-7 col-lg-7 col-xl-4">
    // 						<p className="mt-1" style={{ marginBottom: '10px' }}>
    // 							Password
    // 						</p>
    // 						<input
    // 							type="password"
    // 							style={{ width: '100%' }}
    // 							onChange={(e) => setPassword(e.target.value)}
    // 						></input>
    // 					</div>
    // 					<div className="col-sm-12 col-md-7 col-lg-7 col-xl-4">
    // 						<p className="mt-1" style={{ marginBottom: '10px' }}>
    // 							Confirm Password
    // 						</p>
    // 						<input
    // 							type="password"
    // 							style={{ width: '100%' }}
    // 							onChange={(e) => setPassword2(e.target.value)}
    // 						></input>
    // 					</div>
    // 					<div
    // 						className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-5 justify-content-center align-items-center mt"
    // 						style={{ height: '40%', padding: 0 }}
    // 					>
    // 						<p>Selected Date : {date}</p>
    // 						<input
    // 							type="date"
    // 							onChange={(e) => setDate(e.target.value)}
    // 							style={{ height: '17.25%', width: '80%', marginBottom: '5px' }}
    // 						></input>
    // 					</div>
    // 					<Link
    // 						to="/CreateQuiz"
    // 						role="button"
    // 						style={{
    // 							textDecoration: 'none',
    // 							color: 'white',
    // 							backgroundColor: '#238636',
    // 							display: 'flex',
    // 							justifyContent: 'center',
    // 							borderRadius: '3px',
    // 						}}
    // 					>
    // 						<button id="btn2" onClick={loginRegister}>
    // 							Continue
    // 						</button>
    // 					</Link>
    // 				</div>
    // 			</div>
    // 		</div>
    // 		<div className="section-2">
    // 			<p>Already have an account ?</p>
    // 			<Link to={'login'}>
    // 				<button>Login</button>
    // 			</Link>
    // 		</div>
    // 	</div>

    // 	<Modal show={show} onHide={handleClose}>
    // 		<Modal.Header style={{ color: 'white' }}>
    // 			<Modal.Title>Error Message</Modal.Title>
    // 			<button
    // 				type="button"
    // 				className="btn-close btn-close-white"
    // 				aria-label="Close"
    // 				onClick={handleClose}
    // 			></button>
    // 		</Modal.Header>
    // 		<Modal.Body style={{ color: 'white', border: '0px' }}>{errorMessage}</Modal.Body>
    // 		<Modal.Footer style={{ color: 'white', border: '0px' }}></Modal.Footer>
    // 	</Modal>

    // </div>
  );
};
export default Register;
