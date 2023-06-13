import './LoginEmail.css'
import { ReactComponent as LogoSvg } from "../../Assets/svg/logo.svg"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Reducers/userReducer'
import { loginWithEmail } from '../../Services/auth'

const LoginEmail = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const [errorMessage, setErrorMessage] = useState()

	async function handleClickLogin() {
		console.log('Login with Email')
		try {
			const requestBody = {
				email: email,
				password: password,
			}
			const res = await loginWithEmail(requestBody)
			dispatch(setUser(res.data))
			navigate('/home')
		} catch (error) {
			setErrorMessage(error.response.data.message)
			handleShow()
		}
	}

	return (

		<div className='login__email__container'>
			<div className="login__email__header">
				<LogoSvg className="login__image" />
				<div className="login__info">
					<div className="login__title">Login to Informatics Quiz</div>
					<div className="login__description">Go in with your account</div>
				</div>
			</div>
			<div className="login__form">
				<p>Email</p>
				<input className='email__field' type="text" onChange={(e) => setEmail(e.target.value)}></input>

				<p>Password</p>
				<input type="password" onChange={(e) => setPassword(e.target.value)}></input>
			</div>
			<Link 
				className='login__button'
				role="button"
				onClick={handleClickLogin}
			>
				Sign in to account
			</Link>

			<div className='login__footer'>
			Thank you for participating in the Informatics Quiz! We hope you enjoyed testing your knowledge about our vibrant student community.<br/>
 Burapha University takes pride in nurturing exceptional talent, fostering academic excellence, and cultivating a supportive environment for all students. <br/>
Remember, learning is a lifelong journey, and we encourage you to continue exploring the diverse opportunities and experiences that await you at Burapha University. <br/>
Best of luck in your academic pursuits and beyond!
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Somthing's went wrong ?</Modal.Title>
				</Modal.Header>
				<Modal.Body>{errorMessage}</Modal.Body>
			</Modal>
		</div>
	)
}

export default LoginEmail
