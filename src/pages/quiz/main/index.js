import "./style.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeployedQuizById, getQuizCoverImage, takeQuiz } from "../../../services/quiz";
import { useDispatch } from "react-redux";
import { setTakingQuiz } from "../../../reducers/take";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";

import { useSelector } from "react-redux";
import { getTimerLabel } from "../../../utils/functions/timer";
import { anonymousFullName, onErrorQuizImageUrl, svgMap } from "../../../config/constraints";

export default function Quiz() {
	const user = useSelector((state) => state.user.authUser);

	const { id } = useParams();
	const [quiz, setQuiz] = useState(null);
	const [timerLabel, setTimerLabel] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	async function setImageCoverQuiz(quiz) {
		let initializedQuiz = quiz;
		try {
			if (initializedQuiz.imageUrl !== null && initializedQuiz.imageUrl !== "") {
				const res = await getQuizCoverImage(initializedQuiz.imageUrl);
				const blob = new Blob([res.data], {
					type: res.headers["Content-Type"],
				});
				const url = URL.createObjectURL(blob);
				initializedQuiz.imageUrl = res.data.byteLength === 0 ? null : url;
			}
			return initializedQuiz;
		} catch (e) {
			return quiz;
		}
	}

	useEffect(() => {
		async function onGetQuiz() {
			dispatch(setTakingQuiz(null));
			if (!id) return;
			try {
				const res = await getDeployedQuizById(id, user.token);
				const finalQuiz = await setImageCoverQuiz(res.data);
				setQuiz(finalQuiz);
				setTimerLabel(getTimerLabel(finalQuiz.expiredAt, forceExitHandler))

			} catch (error) {
				showNotify(null, "Something went wrong?", error.response.data.message, () => {
					navigate("/home");
				});
			}
		}

		onGetQuiz();
	}, [id, dispatch]);

	const navigateToTakeQuiz = async (requestTakeQuizId) => {

		takeQuiz(requestTakeQuizId, user.token).then((quiz) => {
			if(quiz.message){
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


	function forceExitHandler() {
		showNotify("time_up", "Time's up!", "You can't take this quiz anymore.", () => {
			navigate("/home");
		});
	}

	useEffect(() => {
		let intervalId;

		intervalId = setInterval(() => {
			setTimerLabel(getTimerLabel(quiz?.expiredAt, forceExitHandler));
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [quiz?.expiredAt]);

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
							<img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
						</div>
						<div className="quiz__detail__paragraph">
							<div className="quiz__detail__title__and__description">
								<p className="title">{quiz.name}</p>
								<p className="description">{quiz.description}</p>
							</div>
							<div className="quiz__detail__deep__info">
								<p className="author">
									{svgMap.user}
									{quiz.user?.fullname || anonymousFullName}
								</p>
								<p className="total__task">
									{svgMap.task}
									{quiz.questions.length} Tasks
								</p>
								<p className="join__code">
									{svgMap.code_quiz}
									{quiz.codeJoin || "??????"}
								</p>
								{quiz.hideCorrectAnswer ? (
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
							</div>
						</div>
					</div>
					<button
						className="take__quiz__button"
						onClick={() => navigateToTakeQuiz(quiz._id)}
					>
						{svgMap.book}
						Take a Quiz
					</button>
					<div className="timer__detail__container">
						<p className="timer__animation">
							{svgMap.timer_blue}
							{timerLabel}
						</p>
						{quiz.hideCorrectAnswer ? (
							<p>
								This quiz not provides accurate answers, so you have to done
								before the duration.
							</p>
						) : (
							<p>
								This quiz provides accurate answers, so you have to wait until
								the quiz duration is finished to see the correct answers.
							</p>
						)}
					</div>
				</div>
			) : null}
		</>
	);
}
