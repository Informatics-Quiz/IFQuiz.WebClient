import "./style.css";

import { useEffect, useState } from "react";
import { getTimerLabel } from "../../utils/functions/timer";
import { anonymousFullName, onErrorQuizImageUrl, svgMap } from "../../config/constraints";
import { current } from "@reduxjs/toolkit";

export default function QuizCard({
	index,
	score,
	quiz,
	editHandler,
	totalQuizScore,
	userAnswers,
	deleteQuizHandler,
	deployHandler,
	takeQuizHandler,
	enableQuizTimer,
	deleteHandler
}) {


	function getDurationLabel() {

		if (score !== undefined && score !== null) {
			const dateTime = new Date(quiz.expiredAt);
			const formattedDateTime = dateTime.toLocaleString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
			return formattedDateTime
		}

		let label = "";
		if (quiz.duration.hours > 0) {
			label += `${quiz.duration.hours} Hours `;
		}
		if (quiz.duration.minutes > 0) {
			label = `${label} ${quiz.duration.minutes} Minutes`;
		}
		return label;
	}

	const [timerLabel, setTimerLabel] = useState(
		enableQuizTimer ? getTimerLabel(quiz.expiredAt, deleteHandler) : getDurationLabel()
	);



	const [taskTotalDone, setTaskTotalDone] = useState(0)
	useEffect(() => {
		console.log('I do once')
		if (userAnswers) {
			setTaskTotalDone(current => 0)
			for (const answer of userAnswers) {
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
	}, [userAnswers])



	useEffect(() => {
		let intervalId;

		if (enableQuizTimer) {
			intervalId = setInterval(() => {
				setTimerLabel(getTimerLabel(quiz.expiredAt, deleteHandler));
			}, 1000);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [enableQuizTimer, quiz.expiredAt]);


	return (
		<div
			className="quiz__card"
			onClick={takeQuizHandler ? takeQuizHandler : () => { }}
		>
			<div className="quiz__image">
				<img src={quiz.imageUrl || onErrorQuizImageUrl} alt="quiz-image"></img>
			</div>
			<div className="quiz__info">
				<p className="quiz__title">{quiz.name}</p>
				<p className="quiz__description">{quiz.description}</p>
				<div className="quiz__deep__info">
					<div className="author">
						{svgMap.user}
						{quiz.user?.fullname || anonymousFullName}
					</div>
					<div className="total__task">
						{userAnswers ? svgMap.task_done : svgMap.task}
						{userAnswers ? `${taskTotalDone} of ` : null}{(quiz.questions.length)} Tasks

					</div>
					{(score !== null && score !== undefined) ? (
						<div className="join__code">
							{svgMap.points}
							{`${score} of ${totalQuizScore}`} Points
						</div>
					) : quiz.codeJoin ? (
						<div className="join__code">
							{svgMap.code_quiz}
							{quiz.codeJoin}
						</div>
					) : null}
					{quiz.hideCorrectAnswer ? (
						<div className="hide__show__correct__answer">
							{svgMap.hide}
							Hide Correct Answers
						</div>
					) : (
						<div className="hide__show__correct__answer">
							{svgMap.show}
							Show Correct Answers
						</div>
					)}
					{(score !== null && score !== undefined) ? (<div className="timer__info">
						{svgMap.date}
						{timerLabel}
					</div>) : (
						<div className="timer__info">
							{svgMap.timer_white}
							{timerLabel}
						</div>
					)}

					{editHandler && deployHandler && deleteQuizHandler ? (
						<div className="action__button">
							<button
								className="action__button__delete"
								onClick={() => {
									deleteQuizHandler(quiz);
								}}
							>
								Delete
							</button>
							<button
								className="action__button__edit"
								onClick={() => {
									editHandler(quiz);
								}}
							>
								Edit
							</button>
							<button
								className="action__button__deploy"
								onClick={() => {
									deployHandler(quiz);
								}}
							>
								Deploy
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div >
	);
}
