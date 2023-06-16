import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Welcome from './pages/home/welcome'
import Login from './pages/auth/login/selection'
import LoginEmail from './pages/auth/login/email'
import Signup from './pages/auth/signup/selection'
import Register from './pages/auth/signup/email'
import Home from "./pages/home/main"
import EditUserProfile from "./pages/user/edit"
import FindQuiz from "./pages/quiz/find"
import CreateQuiz from "./pages/quiz/create"
import RevealQuiz from "./pages/quiz/reveal"
import TakeQuiz from "./pages/quiz/take"
import Quiz from "./pages/quiz/main"
import ActivitySelection from "./pages/activity/selection"
import Created from "./pages/activity/created"
import Running from "./pages/activity/running"
import Completed from "./pages/activity/completed"


function App() {
	const isAuthenticated = useSelector((state) => state.user.authUser) === null ? false : true

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/login/email" element={<LoginEmail />} />
				<Route path="RevealQuiz" element={<RevealQuiz />} />
				<Route path="/activity" element={<ActivitySelection/>} />
				<Route path="/activity/created" element={<Created/>} />
				<Route path="/activity/running" element={<Running/>} />
				<Route path="/activity/completed" element={<Completed/>} />
				<Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
				<Route path="/user/edit" element={isAuthenticated ? <EditUserProfile /> : <Navigate to="/login" />} />
				<Route path="/quiz/find" element={<FindQuiz />} />
				<Route path="/quiz/create" element={<CreateQuiz />} />
				<Route path="/quiz/:id" element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />} />
				<Route path="/quiz/take" element={isAuthenticated ? <TakeQuiz /> : <Navigate to="/login" />} />
			</Routes>
		</div>
	)
}

export default App
