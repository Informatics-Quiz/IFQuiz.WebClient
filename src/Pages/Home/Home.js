import './Home.css'
import { useState, useEffect } from 'react'
import User from '../../Images/user.png'
import { useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setStatus } from '../../Reducers/userRedeucer'

const Home = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [profileImage, setProfileImage] = useState('')

	const [editstatus, setEidtStatus] = useState('')

	function editStatusFunc() {
		console.log('editStatus()')
		const authToken = user.authUser.token
		axios
			.patch(
				'http://localhost:3000/accounts/status',
				{
					status: editstatus,
				},
				{
					headers: {
						Authorization: 'Bearer ' + authToken,
					},
				},
			)
			.then((response) => {
				dispatch(setStatus(response.data.status))
				handleClose()
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		getProfileImage()
	}, [])

	async function getProfileImage() {
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

		let response = await axios.request(reqOptions)
		const blob = new Blob([response.data], { type: response.headers['Content-Type'] })
		const url = URL.createObjectURL(blob)
		setProfileImage(url)
	}

	function errorProfileImage(event){
		setProfileImage(User)
	}

	return (
		<div className="ContainerHome">
			<div className="split">
				<div className="home-1">
					<div className="col1">
						<div className="col11">
							<div className="col111">
								<div className="col111-img">
									<img src={profileImage} onError={errorProfileImage} width={'90%'} height={'82.5%'} alt="profile"></img>
								</div>
							</div>
							<div className="col112">
								<p style={{ fontSize: '15px' }}>{user.authUser.fullname}</p>
								<p style={{ fontSize: '12.5px' }}>{user.authUser.status}</p>
								<Link
									to="/EditUserProfile"
									style={{
										textDecoration: 'none',
										color: 'white',
										backgroundColor: '#161B22',
										borderRadius: '5px',
									}}
								>
									Edit profile
								</Link>
								<button style={{ marginRight: '3px', borderRadius: '5px' }} onClick={handleShow}>
									Edit Status
								</button>
							</div>
						</div>
					</div>
					<div className="col2">
						<div className="col22">
							<p>Find Quiz</p>
							<input placeholder="Enter code"></input>
							<button>Join</button>
						</div>
					</div>
					<div className="col3">
						<div className="col33">
							<p>Make a Quiz</p>
							<button>Create</button>
						</div>
					</div>
				</div>

				<div className="home-2">This is a Home page</div>
			</div>

			<Modal show={show} onHide={handleClose} style={{ top: '40%', color: 'white' }}>
				<Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<Modal.Title>
						<FaEdit style={{ marginBottom: '5.5px', marginRight: '7.5px' }} />
						{'Status'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ backgroundColor: '#0D1117' }}>
					<div className="col-12" style={{ padding: '5px' }}>
						<input
							onChange={(e) => setEidtStatus(e.target.value)}
							placeholder=" 🧠 What are you thinking "
							style={{
								color: 'white',
								width: '100%',
								backgroundColor: '#0D1117',
								border: '1px solid #585E65',
								borderRadius: '5px',
								height: '35px',
							}}
						></input>
					</div>
				</Modal.Body>
				<Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<button
						type="button"
						className="btn btn-success"
						style={{ backgroundColor: '#238636' }}
						onClick={editStatusFunc}
					>
						Save
					</button>
					<button type="button" className="btn btn-secondary" onClick={handleClose}>
						Cancel
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Home
