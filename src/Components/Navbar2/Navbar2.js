import { FaHome } from 'react-icons/fa'
import { TbRotateClockwise2 } from 'react-icons/tb'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../Reducers/userRedeucer'
const Navbar2 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleClickLogout() {
		dispatch(setUser(null))
		navigate('/')
	}

	return (
		<nav className="navbar navbar-expand-md" style={{ backgroundColor: '#161B22' }}>
			<div className="container-fluid p-2">
				<div className="col-sm-3 col-md-2 col-xl-1 d-flex">
					<FaHome style={{ marginRight: '5px', height: '20px', width: '30px' }} />
					<button style={{ padding: '0px' }}>Home</button>
				</div>
				<div className="col-sm-3 col-md-2 col-xl-1 d-flex">
					<TbRotateClockwise2 style={{ marginRight: '5px', height: '20px', width: '30px' }} />
					<button style={{ padding: '0px' }}>Activity</button>
				</div>
				<div className="col-sm-6 col-md-8 col-xl-10 d-flex d-flex justify-content-end align-items-center">
					<FaHome style={{ marginRight: '5px', height: '20px', width: '30px' }} />
					<span role="button" onClick={handleClickLogout} className="m-0">
						Logout
					</span>
				</div>
			</div>
		</nav>
	)
}
export default Navbar2
