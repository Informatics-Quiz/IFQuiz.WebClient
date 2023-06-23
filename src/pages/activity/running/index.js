import "../global.activity.style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus, setUserImageUrl } from "../../../reducers/user";
import { getUserProfile, getUserProfileImage, updateUserStatus } from "../../../services/user";
import { getQuizRunning, getQuizCoverImage, deployQuiz, deleteQuiz, takeQuiz } from "../../../services/quiz";


import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";
import { ActivityHeader } from "../../../components/activity-header";
import { onErrorProfileImageUrl, onErrorQuizImageUrl } from "../../../config/constraints";
import BottomButton from "../../../components/button/bottom";
import { getImageFromResponse } from "../../../utils/functions/image.blob";
import { setTakingQuiz } from "../../../reducers/take";

const Running = () => {

	const user = useSelector((state) => state.user.authUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const [editstatus, setEditStatus] = useState("");
	const [quizzesRunning, setQuizzesRunning] = useState([]);

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
			if (quiz.copyof.imageUrl !== null && quiz.copyof.imageUrl !== "") {
				const res = await getQuizCoverImage(quiz.copyof.imageUrl)
				quiz.copyof.imageUrl = getImageFromResponse(res)

				// const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
				// const url = URL.createObjectURL(blob)
				// quiz.imageUrl = res.data.byteLength === 0 ? null : url
			}
		}
		return initializedQuiz
	}

	async function onGetQuizzes() {
		try {
			const response = await getQuizRunning(user.token)
			const initializedQuiz = await setImageCoverQuizzes(response.data)
			initializedQuiz.reverse()
			setQuizzesRunning(initializedQuiz);
		} catch (e) {
			showNotify("error", "Something went wrong?", e.response.data.message, () => {
				navigate("/home")
			})
		}
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
		message: "",
		cb: null
	});
	function showNotify(svg, title, message, cb) {
		setNotify({
			svg: svg,
			title: title,
			show: true,
			message: message,
			cb: cb
		})
	}
	function closeNotify() {
		setNotify({
			svg: null,
			title: "",
			show: false,
			message: "",
			cb: null
		})
	}

	function deleteHandler(index) {
		const newRunningQuizzes = [...quizzesRunning]
		newRunningQuizzes.splice(index, 1)
		setQuizzesRunning(newRunningQuizzes)
	}

	function takeQuizHandler(quizId) {
		takeQuiz(quizId, user.token).then((quiz) => {
			if (quiz.message) {
				dispatch(setTakingQuiz(null))
				dispatch(setTakingQuiz(quiz.runninQuiz));
				navigate(`/quiz/take`);
				return
			}
			showNotify("error", "Something went wrong?", "Feedback to server owner about this error.", () => {
				navigate(-1)
			})
		}).catch((error) => {
			showNotify("time_up", "Time's up!", error.response.data.message, () => {
				navigate(-1)
			})
		})

	}


	return (
		<>
			<Notify
				svg={notify.svg}
				show={notify.show}
				title={notify.title}
				handleClose={closeNotify}
				message={notify.message}
				cb={notify.cb}
			/>
			<ModalStatus
				show={show}
				handleClose={handleClose}
				status={user.status}
				setEditStatus={setEditStatus}
				handleEditStatus={handleEditStatus}
			/>
			<Navbar />
			<BottomButton
				svgName="back"
				position="left"
				label={"Back"}
				cb={() => { navigate(-1) }}
			/>
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
					<ActivityHeader
						svg={"book"}
						label={"Running"}
					/>
					{quizzesRunning.map((quiz, index) => {
						return <QuizCard
							key={quiz.copyof.name + index}
							index={index}
							quiz={quiz.copyof}
							userAnswers={quiz.answers}
							enableQuizTimer={true}
							deleteHandler={() => {
								deleteHandler(index)
							}}
							takeQuizHandler={
								() => {
									takeQuizHandler(quiz.copyof._id)
								}
							}
						/>
					})}
				</div>
			</div>
		</>
	);
};

export default Running;
