import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// eslint-disable-next-line
import Navbar from './Components/Navbar1/Navbar'
// eslint-disable-next-line
import Welcome from './Pages/Welcome/Welcome'
// eslint-disable-next-line
import Login from './Pages/Login/Login'
// eslint-disable-next-line
import Signup from './Pages/Signup/Signup'
// eslint-disable-next-line
import Register from './Pages/Register/Register'
// eslint-disable-next-line
import LoginEmail from './Pages/LoginEmail/LoginEmail'
// eslint-disable-next-line
import Navbar2 from './Components/Navbar2/Navbar2'
// eslint-disable-next-line
import CreateQuiz from './Pages/CreateQuiz/CreateQuiz'
// eslint-disable-next-line
import Home from './Pages/Home/Home'
// eslint-disable-next-line
import EditUserProfile from './Pages/EditUserProfile/EditUserProfile'

import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
	const user = useSelector((state) => state.user.authUser)

	return (
		<div className="App">
			{!user ? <Navbar /> : <Navbar2 />}
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/LoginEmail" element={<LoginEmail />} />
				<Route path="/CreateQuiz" element={<CreateQuiz />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/EditUserProfile" element={<EditUserProfile />} />
			</Routes>
		</div>
	)
}

export default App
