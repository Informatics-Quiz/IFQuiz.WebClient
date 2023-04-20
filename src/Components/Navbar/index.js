import { FaHome } from 'react-icons/fa'
import { TbRotateClockwise2 } from 'react-icons/tb'
import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../Reducers/userReducer'
import { MdLogout } from 'react-icons/md'

const Navbar2 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isAuthenticated = useSelector((state) => state.user.authUser) === null ? false : true

	function handleClickLogout() {
		dispatch(setUser(null))
		navigate('/')
	}

	if (window.location.pathname === '/Quiz/Take') return null

	return (
		<nav className="navbar navbar-expand-md" style={{ backgroundColor: '#161B22' }}>
			{isAuthenticated ? (
				<div className="container-fluid py-2 px-4">
					<div className="d-flex align-items-center">
						<Link
							to="/Home"
							className="d-flex align-items-center mx-2"
							style={{ textDecoration: 'none', color: 'white' }}
						>
							<FaHome />
							<button className="mx-xl-1">Home</button>
						</Link>
						<div className="d-flex align-items-center mx-2">
							<TbRotateClockwise2 />
							<button className="mx-xl-1">Activity</button>
						</div>
					</div>
					<div className="d-flex align-items-center">
						<MdLogout />
						<button onClick={handleClickLogout} className="mx-xl-1">
							Logout
						</button>
					</div>
				</div>
			) : (
				<div className="container-fluid py-2 px-4">
					<Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
						IF Quiz
					</Link>
					<div className="d-flex align-items-center">
						<Link to="/Login" className="mx-2" style={{ textDecoration: 'none', color: 'white' }}>
							Login
						</Link>
						<Link to="/Signup" className="mx-2" style={{ textDecoration: 'none', color: 'white' }}>
							Signup
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}
export default Navbar2
