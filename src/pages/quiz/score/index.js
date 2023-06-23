import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCompletedQuiz, getQuizCoverImage, takeQuiz } from "../../../services/quiz";
import { useDispatch } from "react-redux";
import { setTakingQuiz } from "../../../reducers/take";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";

import { useSelector } from "react-redux";
import { getTimerLabel } from "../../../utils/functions/timer";
import { anonymousFullName, onErrorQuizImageUrl, svgMap } from "../../../config/constraints";
import { useDebugValue } from "react";
import { setReveal } from "../../../reducers/reveal";

export default function Score() {
	const user = useSelector((state) => state.user.authUser);
	const reveal = useSelector((state) => state.reveal)
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { revealId } = useParams();
	const [quiz, setQuiz] = useState(null);
	const [timerLabel, setTimerLabel] = useState(null);



	async function setImageCoverQuiz(quiz) {
		let initializedQuiz = quiz;
		try {
			if (initializedQuiz.copyof.imageUrl !== null && initializedQuiz.copyof.imageUrl !== "") {
				const res = await getQuizCoverImage(initializedQuiz.copyof.imageUrl);
				const blob = new Blob([res.data], {
					type: res.headers["Content-Type"],
				});
				const url = URL.createObjectURL(blob);
				initializedQuiz.copyof.imageUrl = res.data.byteLength === 0 ? null : url;
			}
			return initializedQuiz;
		} catch (e) {
			return quiz;
		}
	}

	useEffect(() => {
		async function onGetQuiz() {
			dispatch(setTakingQuiz(null));
			if (!revealId) return;
			try {
				const res = await getCompletedQuiz(revealId, user.token);
				if (res.data.length < 1) return navigate("/home");
				const quiz = res.data[0]
				const finalQuiz = await setImageCoverQuiz(quiz);
				setQuiz(finalQuiz);
			} catch (error) {
				showNotify(null, "Something went wrong?", error.response.data.message, () => {
					navigate("/home");
				});
			}
		}

		onGetQuiz();
	}, [revealId, dispatch]);

	const navigateToTakeQuiz = async (requestTakeQuizId) => {

		takeQuiz(requestTakeQuizId, user.token).then((quiz) => {
			if (quiz.message) {
				showNotify("not_found", "Ensuring Fair Play for Quizers!", quiz.message, () => {
					dispatch(setTakingQuiz(quiz.runninQuiz));
					navigate(`/quiz/take`);
				})
				return
			}
			dispatch(setTakingQuiz(quiz));
			navigate(`/quiz/take`);
		}).catch((error) => {
			showNotify("time_up", "Time's up!", error.response.data.message, () => {
				navigate(-1)
			})
		})


	};
	const [taskTotalDone, setTaskTotalDone] = useState(0)
	const [totalQuizPoints, setTotalQuizPoints] = useState(0)

	useEffect(() => {
		if (quiz?.answers) {
			setTaskTotalDone(current => 0)
			for (const answer of quiz?.answers) {
				if (answer?.selectedId !== undefined && answer?.selectedId !== null) {
					setTaskTotalDone(current => current + 1)
					continue
				}

				if (answer?.selectedIds?.length !== undefined && answer?.selectedIds?.length !== null && answer?.selectedIds?.length > 0) {
					setTaskTotalDone(current => current + 1)
					continue
				}

				if (answer?.matchString !== null && answer?.matchString !== undefined && answer?.matchString !== "") {
					setTaskTotalDone(current => current + 1)
					continue
				}
			}
		}

		if(quiz?.questions){
			setTotalQuizPoints(current => 0)
			for(const question of quiz?.questions){
				setTotalQuizPoints(current => current + question?.points)
			}
		}
	}, [quiz?.answers])


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
		});
	}

	const [dateDone, setDateDone] = useState(null)

	useEffect(() => {

		function getDateDone() {
			if (!quiz) return
			const dateTime = new Date(quiz.copyof.expiredAt);
			const formattedDateTime = dateTime.toLocaleString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
			setDateDone(formattedDateTime)
		}

		return () => getDateDone()
	})


	function navigteToReveal(quiz, answers){
		dispatch(setReveal({
			quiz: quiz,
			answers: answers,
			selectedId: 0
		}))
		navigate(`/quiz/reveal`)
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
			<Navbar />
			{quiz ? (
				<div className="quiz__detail__container">
					<div className="quiz__detail__top">
						<div className="quiz__detail__image">
							<img src={quiz.copyof.imageUrl || onErrorQuizImageUrl}></img>
						</div>
						<div className="quiz__detail__paragraph">
							<div className="quiz__detail__title__and__description">
								<p className="title">{quiz.copyof.name}</p>
								<p className="description">{quiz.copyof.description}</p>
							</div>
							<div className="quiz__detail__deep__info">
								<p className="author">
									{svgMap.user}
									{quiz.copyof.user?.fullname || anonymousFullName}
								</p>
								<p className="total__task">
									{svgMap.task_done}
									{taskTotalDone} of {quiz.copyof.questions.length} Tasks
								</p>
								{quiz.copyof.hideCorrectAnswer ? (
									<p className="hide__show__correct__answer">
										{svgMap.hide}
										Hide Correct Answers
									</p>
								) : (
									<p className="hide__show__correct__answer">
										{svgMap.show}
										Show Correct Answers
									</p>
								)}
								<p className="total__task">
									{svgMap.date}
									{dateDone}
								</p>
							</div>
						</div>
					</div>
					<div className="score__result">
						<div className="score__svg">
							{svgMap.points}
						</div>
						<div className="score__description">
							{`${quiz?.score} of ${totalQuizPoints} Points`}
						</div>
					</div>

					<div className="bottom__it">
						<div className="footer_detail_container">
							{!quiz.copyof.hideCorrectAnswer ? (
								<button
									className="reveal__quiz__button"
									onClick={() => navigteToReveal(quiz?.copyof, quiz?.answers)}
								>
									{svgMap.show}
									Reveal Quiz
								</button>
							):null}
							{quiz.copyof.hideCorrectAnswer ? (
								<div className="footer__socre">
									This quiz is not show correct answer <div className="footer__score__focus">{svgMap.hide} if you want to see ask quiz owned.</div>
								</div>
							) : (
								<div className="footer__socre">
									This quiz provides accurate answers, you can see the correct answers click on the <div className="footer__score__focus">{svgMap.show} Reveal Quiz</div>
								</div>
							)}
						</div>
					</div>

				</div>
			) : null}
		</>
	);
}
