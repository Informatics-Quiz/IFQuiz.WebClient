// Resources
import "./style.css";
import { choiceTypeMap, explanationAnswerTypeMap, onErrorProfileImageUrl, svgMap } from "../../../config/constraints";

// React Router | Components | Redux
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { setUserImageUrl } from "../../../reducers/user";
import { setSelectedQuestionId, setTakingQuiz, setSelectedChoiceId, setSelectedMultipleChoice, setFillChoice } from "../../../reducers/take";

// Services
import { getUserProfileImage } from "../../../services/user";

// Utils
import { getTimerLabel } from "../../../utils/functions/timer";

// Ours Components
import NavbarTakeQuiz from "../../../components/take-quiz-navbar";
import QuestionSelector from "../../../components/question.selector";
import SingleChoice from "../../../components/choice/single";
import MultipleChoice from "../../../components/choice/multiple";
import Notify from "../../../components/notify";
import { getQuestionImage, submitQuiz, updateTakeQuizAnswers } from "../../../services/quiz";
import { useRef } from "react";
import { getImageFromResponse } from "../../../utils/functions/image.blob";
import InputTextAreaChoice from "../../../components/input/text-area-choice";
import FillChoice from "../../../components/choice/fill";


export default function TakeQuiz() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const quiz = useSelector((state) => state.take.quiz);
	const user = useSelector((state) => state.user.authUser);

	const [selectedQuestionImages, setSelectedQuestionImages] = useState([]);
	const [timerLabel, setTimerLabel] = useState(getTimerLabel(quiz?.copyof?.expiredAt) || null); // [label, setLabel
	const [notify, setNotify] = useState({
		show: false,
		title: "",
		message: "",
	});

	function showNotify(svg, title, message, cb) {
		setNotify({
			svg: svg,
			title: title,
			show: true,
			message: message,
			cb: cb
		});
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



	useEffect(() => {

		if (!quiz) {
			showNotify('error', 'You have to take quiz first.', 'We will redirect you to home page.', () => navigate('/home'))
			return
		}

		async function fetchProfileImage() {
			await getUserProfileImage(user.token, (url) => {
				dispatch(setUserImageUrl(url));
			});
		}

		return () => fetchProfileImage(); // call once

	}, [])

	useEffect(() => {
		let intervalId = null;

		const handleTimerComplete = () => {
			showNotify('success', 'Time is up!', 'We will redirect you to the result page.', async () => {
				try {
					const completedQuiz = await submitQuiz(user.token, quiz?.copyof?._id)
					dispatch(setTakingQuiz(null));
					navigate(`/score/${completedQuiz._id}`);
				} catch (e) {
					dispatch(setTakingQuiz(null));
					navigate('/activity/completed');
				}

			});
			clearInterval(intervalId);
		};

		intervalId = setInterval(() => {
			setTimerLabel(getTimerLabel(quiz?.copyof?.expiredAt, handleTimerComplete));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);


	const isNowStateIsFillUpdate = useRef(false)
	const isUpdating = useRef(false)
	async function updateAnswersAndSelctedQuestionId() {
		if (quiz?.copyof?._id && quiz?.answers) {
			console.log('updateting...', quiz?.answers)
			const res = await updateTakeQuizAnswers(user.token, {
				selectedQuestionId: quiz.selectedQuestionId,
				quizId: quiz.copyof._id,
				answers: quiz.answers
			})
			if (res?.answers) {
				console.log('updated')
				isUpdating.current = false
			}
		}
	}

	function handlerSelectQuestion(index) {
		dispatch(setSelectedQuestionId(index))
	}

	function handlerSelectSingleChoice(answerId) {
		isUpdating.current = true
		dispatch(setSelectedChoiceId(answerId))
	}

	function handlerFillChoice(fillString) {
		isUpdating.current = true
		isNowStateIsFillUpdate.current = true
		dispatch(setFillChoice(fillString))
	}

	function handlerMultipleChoice(handler, selectId) {
		isUpdating.current = true
		const payload = {
			handler: handler,
			selectId: selectId
		}
		dispatch(setSelectedMultipleChoice(payload))
	}


	useEffect(() => {
		if (isNowStateIsFillUpdate.current) {
			isUpdating.current = false
			isNowStateIsFillUpdate.current = false
			return
		}
		updateAnswersAndSelctedQuestionId()
	}, [quiz])


	async function refreshQuestionImage(listImageUrl) {
		if (!listImageUrl) {
			setSelectedQuestionImages([])
			return
		}
		const newSelectedQuestionImages = []
		for (const imageUrl of listImageUrl) {
			const resImage = await getQuestionImage(imageUrl);
			const renderImage = getImageFromResponse(resImage)
			newSelectedQuestionImages.push(renderImage)
		}
		setSelectedQuestionImages(newSelectedQuestionImages)
	}

	function adjustTextareaHeight() {
		var textarea = document.getElementById(`answer-text-area-${quiz?.selectedQuestionId}`);
		if (!textarea) return
		textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
		textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
	}



	const [isLoading, setIsLoading] = useState(false)
	const timeoutRef = useRef(null);
	function loading(func) {
		console.log('loading')
		setIsLoading(current => true)
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		func()
		timeoutRef.current = setTimeout(() => {
			setIsLoading(false);
			console.log('loaded');
		}, 600);
	}

	const firstTimeRefreshImage = useRef(false)
	useEffect(() => {
		loading(() => {
			if (firstTimeRefreshImage.current) return
			firstTimeRefreshImage.current = true
			refreshQuestionImage(quiz?.questions[quiz.selectedQuestionId]?.explanation?.imageUrl)
		})
	}, [])

	useEffect(() => {
		loading(() => {
			refreshQuestionImage(quiz?.questions[quiz.selectedQuestionId]?.explanation?.imageUrl)
			adjustTextareaHeight()
		})
	}, [quiz?.selectedQuestionId])



	return (
		<>
			<Notify
				svg={notify.svg}
				title={notify.title}
				show={notify.show}
				message={notify.message}
				handleClose={closeNotify}
				cb={notify.cb}
			/>
			{quiz ? (

				<div className="take__quiz__main__container">
					<NavbarTakeQuiz
						imageUrl={user?.imageUrl || onErrorProfileImageUrl}
						fullname={user.fullname}
						quizName={quiz.copyof.name}
					/>
					<div className="take__quiz__container">
						<div className="question__selection">
							<div className="header">
								<div className="icon">
									{svgMap.question}
								</div>
								Question
							</div>
							<QuestionSelector
								answers={quiz.answers}
								selectedQuestionId={quiz.selectedQuestionId}
								handlerSelectQuestion={handlerSelectQuestion}
							/>
						</div>
						<div className="question__timer">
							<div className="icon">
								{svgMap.timer_blue}
							</div>
							<div className="timer_label">
								{timerLabel}
							</div>
						</div>
					</div>
					<div className="update-answer-content">
						<div className="interaction-btn-div">
							<button className="update-answer-btn" disabled={isUpdating.current} onClick={()=> {
								isUpdating.current = true
								updateAnswersAndSelctedQuestionId()
							}}>UPDATE ANSWER</button>
						</div>
					</div>
					{isUpdating.current === true ? (
						<div className="save-answer-info-container">
							<div className="loader"></div>
							<div className="save-label-info">
								Saving your answer...
							</div>
						</div>

					) : (
						<div className="save-answer-info-container">
							<div class="loader-eye">
								<span></span>
							</div>
							<div className="save-label-info">
								Watching
							</div>
						</div>
					)}

					{isLoading ? (
						<>
							<div className="loading-container">
								<div class="loader-content"></div>
							</div>
						</>
					) : (
						<div className="block-space-center">
							<div className="task__take__container">
								{selectedQuestionImages?.length > 0 ? (
									<div className='take-explanation-image'>
										{selectedQuestionImages.map((imageStream, i) => {
											return <div
												key={`question-image-${i}`}
												className="image-item"
											>
												<img src={imageStream} alt='question-image'></img>
											</div>
										})}
									</div>
								) : null}
								<div className="question">
									<div className="qustion-icon-svg">
										{svgMap.question}
									</div>
									<div className="question-explanation-text">
										{quiz?.questions[quiz.selectedQuestionId]?.explanation?.explain}
									</div>
								</div>
								<div className='question__property'>
									<div className="property">
										<div className="icon">
											{svgMap.category}
										</div>
										{choiceTypeMap[quiz?.questions[quiz.selectedQuestionId]?.type]}
									</div>
								</div>
								<div className="fill-explanation-icon-text">{explanationAnswerTypeMap[quiz?.questions[quiz.selectedQuestionId]?.type]}</div>
								{
									quiz?.questions[quiz.selectedQuestionId]?.type === 'single-choice' ? (
										<SingleChoice
											choices={quiz.questions[quiz.selectedQuestionId].answer}
											selectedId={quiz.answers[quiz.selectedQuestionId].selectedId}
											handlerSelectSingleChoice={handlerSelectSingleChoice}
										/>
									) : quiz?.questions[quiz.selectedQuestionId]?.type === 'multiple-choice' ? (
										<MultipleChoice
											choices={quiz.questions[quiz.selectedQuestionId].answer}
											selectedIds={quiz.answers[quiz.selectedQuestionId].selectedIds}
											handlerMultipleChoice={handlerMultipleChoice}
										/>
									) : quiz?.questions[quiz.selectedQuestionId]?.type === 'fill-choice' ? (
										// Fill Choice
										<FillChoice
											index={quiz.selectedQuestionId}
											handlerFillChoice={handlerFillChoice}
											handlerUpdate={updateAnswersAndSelctedQuestionId}
											value={quiz.answers[quiz.selectedQuestionId].matchString}
										/>
									) : null
								}

							</div>
						</div>
					)}

				</div>
			) : null}

		</>
	);
}
