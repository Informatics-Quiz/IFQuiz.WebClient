// Resources
import "./style.css";
import { onErrorProfileImageUrl, svgMap } from "../../../config/constraints";

// React Router | Components | Redux
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { setUserImageUrl } from "../../../reducers/user";
import { setSelectedQuestionId, setTakingQuiz, setSelectedChoiceId, setSelectedMultipleChoice } from "../../../reducers/take";

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
import { updateTakeQuizAnswers } from "../../../services/quiz";
import { useRef } from "react";


export default function TakeQuiz() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const quiz = useSelector((state) => state.take.quiz);
	const user = useSelector((state) => state.user.authUser);
	const updatingAnswersRef = useRef(false)

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

		return ()=> fetchProfileImage(); // call once

	}, [])

	useEffect(()=> {
		const intervalId = setInterval(() => {
			setTimerLabel(getTimerLabel(quiz?.copyof?.expiredAt, () => {
				showNotify('success', 'Time is up!', 'We will redirect you to result page.', () => {
					dispatch(setTakingQuiz(null))
					navigate('/activity/completed')
				})
			}))
		}, 1000);

		return () => {
			clearInterval(intervalId); // call once
		};
	})

	async function updateAnswers() {

		if (quiz?.copyof?._id && quiz?.answers) {
			console.log('updating...', quiz)
			const res = await updateTakeQuizAnswers(user.token, {
				quizId: quiz.copyof._id,
				answers: quiz.answers
			})
			if (res?.quiz) {
				console.log('updated', res.quiz)
			}
		}
	}

	function handlerSelectQuestion(index) {
		dispatch(setSelectedQuestionId(index))
	}

	function handlerSelectSingleChoice(answerId) {
		dispatch(setSelectedChoiceId(answerId))
		updateAnswers()
	}

	function handlerMultipleChoice(handler, selectId) {
		dispatch(setSelectedMultipleChoice({
			handler: handler,
			selectId: selectId
		}))
		updateAnswers()

	}


	useEffect(() => {
		if(updatingAnswersRef.current)return
		updatingAnswersRef.current = true
		updateAnswers()
	}, [quiz])


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
							{timerLabel}
						</div>
					</div>
					<div className="block-space-center">
						<div className="task__take__container">
							<div className="question">
								{quiz.questions[quiz.selectedQuestionId].explanation.explain}
							</div>

							{
								quiz.questions[quiz.selectedQuestionId].type === 'single-choice' ? (
									<SingleChoice
										choices={quiz.questions[quiz.selectedQuestionId].answer}
										selectedId={quiz.answers[quiz.selectedQuestionId].selectedId}
										handlerSelectSingleChoice={handlerSelectSingleChoice}
									/>
								) : quiz.questions[quiz.selectedQuestionId].type === 'multiple-choice' ? (
									<MultipleChoice
										choices={quiz.questions[quiz.selectedQuestionId].answer}
										selectedIds={quiz.answers[quiz.selectedQuestionId].selectedIds}
										handlerMultipleChoice={handlerMultipleChoice}
									/>
								) : quiz.questions[quiz.selectedQuestionId].type === 'fill-choice' ? (
									// Fill Choice
									<></>
								) : null
							}

						</div>
					</div>

				</div>
			) : null}

		</>
	);
}
