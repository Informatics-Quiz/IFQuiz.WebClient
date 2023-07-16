import "./style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus, setUserImageUrl } from "../../../reducers/user";
import { getUserProfile, getUserProfileImage, updateUserStatus } from "../../../services/user";
import { getOwnedQuiz, getQuizCoverImage, deployQuiz, getCompletedQuizzes, getSummarizedQuizzes } from "../../../services/quiz";


import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";
import { ActivityHeader } from "../../../components/activity-header";
import BottomButton from "../../../components/button/bottom";

import { onErrorProfileImageUrl } from "../../../config/constraints";
import { getImageFromResponse } from "../../../utils/functions/image.blob";
import DeployedQuizCard from "../../../components/deployed-card";

const Deployed = () => {

	const user = useSelector((state) => state.user.authUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const [editstatus, setEditStatus] = useState("");
	const [quizzesCompleted, setQuizzesCompleted] = useState([]);

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
				quiz.imageUrl = getImageFromResponse(res)
			}
		}

		return initializedQuiz
	}

	async function onGetQuizzes() {
		const response = await getSummarizedQuizzes(user.token)
		const initializedQuiz = await setImageCoverQuizzes(response.data)
		setQuizzesCompleted(initializedQuiz);
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

	function watchScoreHandler(quizId){
		navigate(`/score/${quizId}`)
	}


	function gotoSummarizedQuiz(quiz){
		if(quiz._id === undefined || quiz.success === false){
			showNotify("thinking", "Something went wrong.", "This quiz is still running", null)
			return
		}
		navigate(`/summarized/${quiz._id}`)
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
						svg={"deployed"}
						label={"Deployed"}
					/>
					
					{quizzesCompleted.map((quiz, index) => {
						return <DeployedQuizCard
							index={index}
							quiz={quiz}
							gotoSummarizedHandler= {gotoSummarizedQuiz}
						/>
					})}
				</div>
			</div>
		</>
	);
};

export default Deployed;
