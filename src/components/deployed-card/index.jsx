import "./style.css";

import { useEffect, useState } from "react";
import { getTimerLabel } from "../../utils/functions/timer";
import {
	anonymousFullName,
	onErrorQuizImageUrl,
	svgMap,
} from "../../config/constraints";

export default function DeployedQuizCard({
	index,
	gotoSummarizedHandler,
	quiz,
}) {
	function getDateLabel() {
		const dateTime = new Date(quiz.expiredAt);
		const formattedDateTime = dateTime.toLocaleString("en-US", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
		return formattedDateTime;
	}

	const [dateLabel, setDateLabel] = useState(getDateLabel(quiz.expiredAt));

	return (
		<div
			className="quiz__card"
			onClick={() => {
				gotoSummarizedHandler(quiz);
			}}
		>
			<div className="quiz__image">
				<img
					src={quiz.imageUrl || onErrorQuizImageUrl}
					alt="quiz-image"
				></img>
			</div>
			<div className="quiz__info">
				<p className="quiz__title">{quiz.name}</p>
				<p className="quiz__description">{quiz.description}</p>
				<div className="quiz__deep__info">
					<div className="author">
						{svgMap.participants}
						{quiz.participants} Participants
					</div>
					<div className="total__task">
						{svgMap.task}
						{quiz.questions.length} Tasks
					</div>
					{quiz.success && (
						<div className="timer__info">
							{svgMap.date}
							{dateLabel}
						</div>
					)}
					<div className="join__code">
						{svgMap.points}
						{quiz.points} Points
					</div>
					<div className="join_code">
						{quiz.success ? svgMap.summarized : svgMap.red_circle}
						{quiz.success ? "Summarized" : "Running"}
					</div>
				</div>
			</div>
		</div>
	);
}
