import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Welcome from './Pages/Welcome/Welcome'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Register from './Pages/Register/Register'
import LoginEmail from './Pages/LoginEmail/LoginEmail'
import CreateQuiz from './Pages/CreateQuiz/CreateQuiz'
import RevealQuiz from './Pages/RevealQuiz/RevealQuiz.js'
import Home from './Pages/Home/Home'
import EditUserProfile from './Pages/EditUserProfile/EditUserProfile'
import FindQuiz from './Pages/FindQuiz/FindQuiz'
import TakeQuiz from './Pages/TakeQuiz'
import Quiz from './Pages/Quiz/Quiz'
import ActivitySelection from "./Pages/activity/selection/Selection"
import Created from "./Pages/activity/created/Created"
import Running from "./Pages/activity/running/Running"
import Completed from "./Pages/activity/completed/Completed"
import { Navigate, Route, Routes } from 'react-router-dom'

import { useSelector } from 'react-redux'

function App() {
	const isAuthenticated = useSelector((state) => state.user.authUser) === null ? false : true

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/register" element={<Register />} />
				<Route path="/find-quiz" element={<FindQuiz />} />
				<Route path="/login-email" element={<LoginEmail />} />
				<Route path="/activity" element={<ActivitySelection/>} />
				<Route path="/activity/created" element={<Created/>} />
				<Route path="/activity/running" element={<Running/>} />
				<Route path="/activity/completed" element={<Completed/>} />
				<Route path="/CreateQuiz" element={<CreateQuiz />} />
				<Route path="RevealQuiz" element={<RevealQuiz />} />
				<Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="login" />} />
				<Route path="/edit-user-profile" element={isAuthenticated ? <EditUserProfile /> : <Navigate to="Login" />} />
				<Route path="/Quiz/:id" element={isAuthenticated ? <Quiz /> : <Navigate to="Login" />} />
				<Route path="/Quiz/Take" element={isAuthenticated ? <TakeQuiz /> : <Navigate to="Login" />} />
			</Routes>
		</div>
	)
}

export default App
