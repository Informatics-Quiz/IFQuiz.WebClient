import "../global.activity.style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus, setUserImageUrl } from "../../../reducers/user";
import { getUserProfileImage, updateUserStatus } from "../../../services/user";
import { getOwnedQuiz, getQuizCoverImage, deployQuiz, deleteQuiz } from "../../../services/quiz";


import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";
import { ActivityHeader } from "../../../components/activity-header";
import { onErrorProfileImageUrl, onErrorQuizImageUrl } from "../../../config/constraints";
import BottomButton from "../../../components/button/bottom";
import { getImageFromResponse } from "../../../utils/functions/image.blob";
import ModalConfirmDeleteImage from "../../../components/modals/confirm-delete-image";

const Created = () => {

	const user = useSelector((state) => state.user.authUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [show, setShow] = useState(false);
	const [editstatus, setEditStatus] = useState("");
	const [quizzesCreated, setQuizzesCreated] = useState([]);

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

				// const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
				// const url = URL.createObjectURL(blob)
				// quiz.imageUrl = res.data.byteLength === 0 ? null : url
			}
		}
		return initializedQuiz
	}

	async function onGetQuizzes() {
		const response = await getOwnedQuiz(user.token)
		const initializedQuiz = await setImageCoverQuizzes(response.data)
		setQuizzesCreated(initializedQuiz);
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



	function editHandler(quiz) {
		const quizId = quiz._id
		if (!quizId) {
			showNotify("not_found", "Something went wrong?", "Quiz not found!")
			return
		}
		navigate('/quiz/edit/' + quizId)
	}

	async function deployHandler(quiz) {
		const quizId = quiz._id
		if (!quizId) {
			showNotify("not_found", "Something went wrong?", "Quiz not found!")
			return
		}
		try {
			const response = await deployQuiz(quizId, user.token)
			showNotify("true", "Deployed!", "Your quiz is now available for everyone to play!", () => {
				navigate('/quiz/' + response.data._id)
			})

		} catch (error) {
			showNotify("not_found", "Something went wrong?", error.response.data.message)
		}
	}

	async function deleteHandler(quiz_id) {
		const quizId = quiz_id
		if (!quizId) {
			showNotify("not_found", "Something went wrong?", "Quiz not found!")
			return
		}
		try {
			const res = await deleteQuiz(quizId, user.token)
			if (res.status === 200) {
				handlerCloseModelConfirmDeleteImage()
				showNotify("true", "Deleted successful", "Your quiz is now deleted!", () => {
					onGetQuizzes()
				})
			}

		} catch (error) {
			showNotify("not_found", "Something went wrong?", error.response.data.message)
		}
	}

	const [modalConfirmDeleteImage, setModalConfirmDeleteImage] = useState({
		show: false,
		title: null,
		imageUrl: null,
		index: null,
	});
	function handlerShowModelConfirmDeleteImage(quiz) {
		setModalConfirmDeleteImage({
			show: true,
			title: `Delete quiz (${quiz.name})`,
			imageUrl: quiz.imageUrl || onErrorQuizImageUrl,
			index: quiz._id,
		})
	}
	function handlerCloseModelConfirmDeleteImage() {
		setModalConfirmDeleteImage({
			show: false,
			title: null,
			imageUrl: null,
			index: null,
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
			<ModalConfirmDeleteImage
				index={modalConfirmDeleteImage.index}
				title={modalConfirmDeleteImage.title}
				show={modalConfirmDeleteImage.show}
				imageUrl={modalConfirmDeleteImage.imageUrl}
				handleConfirm={deleteHandler}
				handleCancle={handlerCloseModelConfirmDeleteImage}
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
						svg={"created"}
						label={"Created"}
					/>
					{quizzesCreated.map((quiz, index) => {
						return <QuizCard
							key={quiz.name + index}
							index={index}
							quiz={quiz}
							editHandler={editHandler}
							deployHandler={deployHandler}
							deleteQuizHandler={() => handlerShowModelConfirmDeleteImage(quiz)}
						/>
					})}
				</div>
			</div>
		</>
	);
};

export default Created;
