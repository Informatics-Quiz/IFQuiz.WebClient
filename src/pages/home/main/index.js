import "./style.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus, setUserImageUrl } from "../../../reducers/user";
import { getUserProfileImage, updateUserStatus } from "../../../services/user";
import { getDeployedQuizzes, getQuizCoverImage } from "../../../services/quiz";


import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";
import { onErrorProfileImageUrl } from "../../../config/constraints";
import { current } from "@reduxjs/toolkit";

const Home = () => {

	const user = useSelector((state) => state.user.authUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const [editstatus, setEditStatus] = useState("");
	const [quizzes, setQuizzes] = useState([]);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function handleClickNavigate(url) {
		navigate(url);
	}

	async function handleEditStatus() {
		const response = await updateUserStatus(user.token, editstatus);
		dispatch(setStatus(response.data.status));
		handleClose();
	}


	async function setImageCoverQuizzes(quizzes) {
		let initializedQuiz = quizzes
		for (let quiz of initializedQuiz) {
			if (quiz.imageUrl !== null && quiz.imageUrl !== "") {
				const res = await getQuizCoverImage(quiz.imageUrl)
				const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
				const url = URL.createObjectURL(blob)
				quiz.imageUrl = res.data.byteLength === 0 ? null : url
			}
		}
		return initializedQuiz
	}

	async function onGetQuizzes() {
		const response = await getDeployedQuizzes(user.token)
		const initializedQuiz = await setImageCoverQuizzes(response.data)
		setQuizzes(current => initializedQuiz);
	}

	useEffect(() => {

		async function fetchProfileImage() {
			await getUserProfileImage(user.token, (url) => {
				dispatch(setUserImageUrl(url));
			});
		}
		fetchProfileImage();

		onGetQuizzes();
	}, []);



	// Notify
	const [notify, setNotify] = useState({
		show: false,
		title: "",
		message: ""
	});
	function showNotify(svg, title, message, cb) {
		setNotify({
			svg: svg,
			cb: cb,
			title: title,
			show: true,
			message: message
		})
	}
	function closeNotify() {
		setNotify({
			svg: null,
			cb: null,
			title: "",
			show: false,
			message: ""
		})
	}

	function deleteHandler(index) {
		const newQuizzes = [...quizzes]
		newQuizzes.splice(index, 1)
		setQuizzes(newQuizzes)
	}

	return (
		<>
			<Notify
				svg={notify.svg}
				cb={notify.cb}
				show={notify.show}
				title={notify.title}
				handleClose={closeNotify}
				message={notify.message}
			/>
			<ModalStatus
				show={show}
				handleClose={handleClose}
				status={user.status}
				setEditStatus={setEditStatus}
				handleEditStatus={handleEditStatus}
			/>
			<Navbar />

			<div className="home__container">
				<div className="profile__container">
					<div className="profile__image">
						<img
							src={user.imageUrl || onErrorProfileImageUrl}
							alt="profile"
						/>
					</div>
					<div className="profile__info">
						<p className="profile__info__fullname">{user.fullname}</p>
						<p className="profile__info__status">{user.status.length < 1 ? "Think nothing..." : user.status}</p>
						<div className="profile__info__settings">
							<button onClick={() => handleClickNavigate("/user/edit")}>
								Edit Profile
							</button>
							<button onClick={handleShow}>Edit Status</button>
						</div>
					</div>
				</div>
		
				<div className="quizzes__container">
					{quizzes.map((quiz, index) => {
						return <QuizCard
							key={index}
							index={index}
							quiz={quiz}
							enableQuizTimer={true}
							takeQuizHandler={() => handleClickNavigate("/quiz/" + quiz._id)}
							deleteHandler={() => {
								deleteHandler(index)
							}}
						/>
					})}
				</div>

			</div>
		</>
	);
};

export default Home;
