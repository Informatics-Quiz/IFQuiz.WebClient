import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import Modal from 'react-bootstrap/Modal'
import { registerAuthUser } from '../../Services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [date, setDate] = useState()

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const [errorMessage, setErrorMessage] = useState('')

	async function loginRegister() {
		if (password !== password2) {
			setErrorMessage('Password not match')
			handleShow()
			return
		}

		const bodyRequest = {
			email: email,
			password: password,
			fullname: `${firstname} ${lastname}`,
			birthday: date,
		}
		try {
			await registerAuthUser(bodyRequest)
			navigate('/Login')
		} catch (error) {
			setErrorMessage(error.response.data.message)
			handleShow()
		}
	}

	return (
		<div className="ContainerRegister">
			<div className="content-1">
				<div className="section-1x">
					<div className="row" style={{ padding: 5 }}>
						<div className="col">
							<div className="row">
								<div className="col-sm-12">
									<p id="section1-text1">Continue with Email</p>
								</div>
							</div>

							{
								<div className="row mt-0">
									<div className="col-sm-6 col-md-8 col-xl-5 d-flex flex-column">
										<p id="section1-text1">Enter email address</p>
										<input onChange={(e) => setEmail(e.target.value)}></input>
										<Link
											role="button"
											style={{
												textDecoration: 'none',
												color: 'white',
												backgroundColor: '#238636',
												display: 'flex',
												justifyContent: 'center',
												borderRadius: '3px',
											}}
										>
											<button id="btn1" onClick={loginRegister}>
												Continue
											</button>
										</Link>
									</div>
								</div>
							}
						</div>
						<div className="col">
							<p id="fontresp">Please fill in your account details</p>
							<div className="col-sm-6  col-md-7 col-lg-7 col-xl-4">
								<p>firstname</p>
								<input style={{ width: '100%' }} onChange={(e) => setFirstname(e.target.value)}></input>
							</div>
							<div className="col-sm-12  col-md-7 col-lg-7 col-xl-4">
								<p className="mt-1">Lastname</p>
								<input style={{ width: '100%' }} onChange={(e) => setLastname(e.target.value)}></input>
							</div>
							<div className="col-sm-12 col-md-7 col-lg-7 col-xl-4">
								<p className="mt-1" style={{ marginBottom: '10px' }}>
									Password
								</p>
								<input
									type="password"
									style={{ width: '100%' }}
									onChange={(e) => setPassword(e.target.value)}
								></input>
							</div>
							<div className="col-sm-12 col-md-7 col-lg-7 col-xl-4">
								<p className="mt-1" style={{ marginBottom: '10px' }}>
									Confirm Password
								</p>
								<input
									type="password"
									style={{ width: '100%' }}
									onChange={(e) => setPassword2(e.target.value)}
								></input>
							</div>
							<div
								className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-5 justify-content-center align-items-center mt"
								style={{ height: '40%', padding: 0 }}
							>
								<p>Selected Date : {date}</p>
								<input
									type="date"
									onChange={(e) => setDate(e.target.value)}
									style={{ height: '17.25%', width: '80%', marginBottom: '5px' }}
								></input>
							</div>
							<Link
								to="/CreateQuiz"
								role="button"
								style={{
									textDecoration: 'none',
									color: 'white',
									backgroundColor: '#238636',
									display: 'flex',
									justifyContent: 'center',
									borderRadius: '3px',
								}}
							>
								<button id="btn2" onClick={loginRegister}>
									Continue
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="section-2">
					<p>Already have an account ?</p>
					<Link to={'/Login'}>
						<button>Login</button>
					</Link>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header style={{ color: 'white' }}>
					<Modal.Title>Error Message</Modal.Title>
					<button
						type="button"
						className="btn-close btn-close-white"
						aria-label="Close"
						onClick={handleClose}
					></button>
				</Modal.Header>
				<Modal.Body style={{ color: 'white', border: '0px' }}>{errorMessage}</Modal.Body>
				<Modal.Footer style={{ color: 'white', border: '0px' }}></Modal.Footer>
			</Modal>
		</div>
	)
}
export default Register
