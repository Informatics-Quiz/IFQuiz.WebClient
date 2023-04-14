import './Home.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStatus } from '../../Reducers/userRedeucer'
import ModalStatus from '../../Components/ModalStatus'
import QuizCard from '../../Components/QuizCard'

const Home = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [show, setShow] = useState(false)
	const [profileImage, setProfileImage] = useState('')
	const [editstatus, setEditStatus] = useState('')
	const [quizzes, setQuizzes] = useState([])

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	function handleClickNavigateToEditUserProfile() {
		navigate('/EditUserProfile')
	}

	async function handleEditStatus() {
		const authToken = user.authUser.token
		const response = await axios.patch(
			'http://localhost:3000/accounts/status',
			{ status: editstatus },
			{
				headers: {
					Authorization: 'Bearer ' + authToken,
				},
			},
		)

		dispatch(setStatus(response.data.status))
		handleClose()
	}

	useEffect(() => {
		async function onGetProfileImage() {
			let headersList = {
				Accept: '*/*',
				Authorization: `Bearer ${user.authUser.token}`,
			}

			let reqOptions = {
				responseType: 'arraybuffer',
				url: 'http://localhost:3000/file/get/profile-image',
				method: 'GET',
				headers: headersList,
			}

			try {
				let response = await axios.request(reqOptions)
				const blob = new Blob([response.data], { type: response.headers['Content-Type'] })
				const url = URL.createObjectURL(blob)
				console.log(url)
				setProfileImage(url)
			} catch (error) {
				console.log(error)
			}
		}

		onGetProfileImage()
	}, [user])

	useEffect(() => {
		async function onGetQuizzes() {
			const response = await axios.get('http://localhost:3000/quizzes')
			console.log(response.data)
			setQuizzes(response.data)
		}
		onGetQuizzes()
	}, [])

	return (
		<div className="home-container">
			<div className="home-sidebar">
				<div className="home-profile">
					<div className="profile-image-container">
						<img src={profileImage} alt="profile"></img>
					</div>
					<div className="profile-desc-container">
						<h3>{user.authUser.fullname}</h3>
						<p>{user.authUser.status}</p>
						<button onClick={handleClickNavigateToEditUserProfile}>Edit profile</button>
						<button onClick={handleShow}>Edit Status</button>
					</div>
				</div>
				<div className="find-quiz-container">
					<h4>Find Quiz</h4>
					<input placeholder="Enter code"></input>
					<button>JOIN</button>
				</div>
				<div className="make-quiz-container">
					<h4>Make a Quiz</h4>
					<button>CREATE</button>
				</div>
			</div>

			<div className="home-content">
				<h4>All Quizzes</h4>
				<div className="quiz-list-container">
					{quizzes.map((quiz) => (
						<QuizCard
							name={quiz.name}
							owner={quiz.user?.fullname}
							numberOfTasks={quiz.questions.length}
							key={quiz._id}
						/>
					))}
				</div>
			</div>

			<ModalStatus
				show={show}
				handleClose={handleClose}
				status={user.authUser.status}
				setEditStatus={setEditStatus}
				handleEditStatus={handleEditStatus}
			/>
		</div>
	)
}

export default Home
