import './EditUserProfile.css'
import { FaUserEdit, FaLock, FaArrowRight, FaKey } from 'react-icons/fa'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ProfileImage from '../../Components/ProfileImage'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../Reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile, updateUserPassword, deleteUserAccount } from '../../Services/user'

const EditUserProfile = () => {
	const user = useSelector((state) => state.user.authUser)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [show, setShow] = useState(false)
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)

	const [message, setMessage] = useState('')

	const [newPassword, setNewPassword] = useState({
		password: null,
	})

	const [userProfileState, setUserProfileState] = useState({
		fullname: user.fullname,
		status: user.status,
		backgroundMusic: user.backgroundMusic,
		soundEffect: user.soundEffect,
	})

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const handleClose2 = () => setShow2(false)
	const handleShow2 = () => setShow2(true)

	const handleClose3 = () => {
		setShow3(false)
		dispatch(setUser(null))
		navigate('/')
	}
	const handleShow3 = () => setShow3(true)

	const handleClickLogout = () => {
		dispatch(setUser(null))
		navigate('/')
	}

	const handleChangeProfileState = (e) => {
		const { name, value } = e.target
		setUserProfileState({ ...userProfileState, [name]: value })
	}

	const handleChangePassword = (e) => {
		const { value } = e.target
		setNewPassword({
			password: value,
		})
	}

	const handleChangeProfileStateCheckbox = (e) => {
		const { name } = e.target
		setUserProfileState({ ...userProfileState, [name]: !userProfileState[name] })
	}

	async function handleClickUpdateProfile() {
		if (!user.token) return
		try {
			const res = await updateUserProfile(user.token, userProfileState)
			const { data } = res
			const userProfile = {
				fullname: data.fullname,
				email: data.email,
				status: data.status,
				backgroundMusic: data.backgroundMusic,
				soundEffect: data.soundEffect,
			}
			dispatch(setUser({ ...user, ...userProfile }))
			navigate('/Home')
		} catch (error) {
			console.error(error)
		}
	}

	async function handleTriggerDeleteAccount() {
		if (!user.token) return
		try {
			const res = await deleteUserAccount(user.token)
			const { data } = res

			setMessage(data.message) // POP UP THIS "data.message"
			handleShow3()
		} catch (error) {
			setMessage(error.response.data.message) // POP UP THIS "error.response.data.message"
			handleShow3()
		}
	}

	async function handleClickUpdatePassword() {
		if (!user.token) return
		try {
			const res = await updateUserPassword(user.token, newPassword)
			const { data } = res
			handleClose()
			setMessage(data.message)
			handleShow3()
		} catch (error) {
			setMessage(error.response.data.message) // POP UP THIS "error.response.data.message"
			handleShow3()
		}
	}

	return (
		<div className="edit-profile-container">
			<div className="user-profile-container">
				<p>
					<FaUserEdit style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px' }} />
					Profile Settings
				</p>
				<ProfileImage userProfileImage={user.imageUrl} firstLetter={user.fullname[0]} />
				<p>Display Name</p>
				<input name="fullname" type="text" placeholder={user.fullname} onChange={handleChangeProfileState}></input>
				<p>Status</p>
				<input name="status" type="text" placeholder={user.status} onChange={handleChangeProfileState}></input>
			</div>
			<div className="user-profile-container">
				<p>
					<FaUserEdit style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px' }} />
					Quiz Setting
				</p>
				<div className="d-flex justify-content-between">
					<p style={{ marginTop: '2.5px' }}>Background Music</p>
					<div className="form-check form-switch">
						<input
							name="backgroundMusic"
							className="form-check-input"
							type="checkbox"
							role="switch"
							id="flexSwitchCheckDefault"
							checked={userProfileState.backgroundMusic}
							onChange={handleChangeProfileStateCheckbox}
						></input>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<p style={{ marginTop: '2.5px' }}>Sound Effect</p>
					<div className="form-check form-switch">
						<input
							name="soundEffect"
							className="form-check-input"
							type="checkbox"
							role="switch"
							id="flexSwitchCheckDefault"
							checked={userProfileState.soundEffect}
							onChange={handleChangeProfileStateCheckbox}
						></input>
					</div>
				</div>
			</div>
			<div className="user-profile-container">
				<p>
					<FaLock style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px' }} />
					Account Setting
				</p>
				<div className="d-flex justify-content-between">
					<p style={{ marginTop: '2.5px' }}>Change Password</p>
					<FaArrowRight onClick={handleShow} />
				</div>
				<div className="d-flex justify-content-between">
					<p style={{ marginTop: '2.5px' }}>Delete Account</p>
					<FaArrowRight onClick={handleShow2} />
				</div>
				<button className="logout-button" onClick={handleClickLogout}>
					Log Out
				</button>
			</div>
			<button className="save-button" onClick={handleClickUpdateProfile}>
				Save
			</button>

			<Modal show={show} onHide={handleClose} style={{ top: '40%', color: 'white' }}>
				<Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<Modal.Title>
						{' '}
						<FaKey /> Change Password
					</Modal.Title>
				</Modal.Header>
				<div className="p-2">
					<p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>Enter New Password</p>
					<input
						className="input-change"
						type={'text'}
						style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
						onChange={handleChangePassword}
					></input>
					<p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>Re-Enter New Password</p>
					<input
						className="input-change"
						type={'text'}
						style={{ padding: '5px', marginBottom: '10px', width: '100%' }}
						onChange={handleChangePassword}
					></input>
				</div>

				<Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<Button
						onClick={handleClose}
						style={{
							width: '105px',
							height: '41px',
							backgroundColor: '#424242',
							border: 'none',
							fontSize: '20px',
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={handleClickUpdatePassword}
						style={{
							width: '105px',
							height: '41px',
							backgroundColor: '#238636',
							border: 'none',
							fontSize: '20px',
						}}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={show2} onHide={handleClose2} style={{ top: '40%', color: 'white' }}>
				<Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<Modal.Title>
						{' '}
						<FaKey /> Delete Account
					</Modal.Title>
				</Modal.Header>
				<div className="p-2">
					<p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>
						Are you sure you want to delete your account? All your data will be deleted.
					</p>
				</div>

				<Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
					<Button
						onClick={handleClose2}
						style={{
							width: '105px',
							height: '41px',
							backgroundColor: '#424242',
							border: 'none',
							fontSize: '20px',
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={handleTriggerDeleteAccount}
						style={{
							width: '160px',
							height: '41px',
							backgroundColor: '#EA4949',
							border: 'none',
							fontSize: '20px',
						}}
					>
						Delete Account
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={show3} onHide={handleClose3}>
				<Modal.Header style={{ color: 'white' }}>
					<Modal.Title>Message</Modal.Title>
					<button
						type="button"
						className="btn-close btn-close-white"
						aria-label="Close"
						onClick={handleClose3}
					></button>
				</Modal.Header>
				<Modal.Body style={{ color: 'white', border: '0px' }}>{message}</Modal.Body>
				<Modal.Footer style={{ color: 'white', border: '0px' }}></Modal.Footer>
			</Modal>
		</div>
	)
}

export default EditUserProfile
