import { useNavigate, useParams } from "react-router";
import "./summary.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSummarizedQuiz } from "../../../services/quiz";
import Notify from "../../../components/notify";
import Navbar from "../../../components/navbar";
import SummaryHeader from "./header/header";
import Instructor from "./instructor/instructor";
import SortSwtich from "./sort.switch/sort.swtich";
import { svgMap } from "../../../config/constraints";
import TitleValue from "./title.value/title.value";
import UserValue from "./user.value/user.value";
import AnalysisPercent from "./analysis.percent/analysis.percent";
import ActionSumButton from "./action.sum.button/action.sum.button";
import ProfileDetail from "./profile.detail/profile.detail";
import { getParticipantsProfileImage } from "../../../services/user";
import { current } from "@reduxjs/toolkit";

export default function Summary() {
	const user = useSelector((state) => state.user.authUser);
	const [summarizedQuizData, setSummarizedQuizData] = useState(null);
	const [watchParticipant, setWatchParticipant] = useState(null);

	const { id } = useParams();
	const navigate = useNavigate();
	const sortMapList = ["POINTS", "ATTENTION", "NAME"];
	// if (!id) {
	// 	navigate("/activity/deployed");
	// }

	// Notify
	const [notify, setNotify] = useState({
		show: false,
		title: "",
		message: "",
		cb: null,
	});
	function showNotify(svg, title, message, cb) {
		setNotify({
			svg: svg,
			title: title,
			show: true,
			message: message,
			cb: cb,
		});
	}
	function closeNotify() {
		setNotify({
			svg: null,
			title: "",
			show: false,
			message: "",
			cb: null,
		});
	}

	async function initializeOverallAvgScore(participants) {
		const totalParticipants = participants.length;
		const totalScores = participants.reduce(
			(sum, participant) => sum + participant.score,
			0
		);
		const overallAverageScore = totalScores / totalParticipants;
		return overallAverageScore.toFixed(2);
	}

	async function initializeQuizDifficulty(passPercentages) {
		if (passPercentages.passed >= 80) {
			return {
				text: "EASY",
				color: "#3EA573",
			};
		} else if (passPercentages.passed >= 50) {
			return {
				text: "MEDIUM",
				color: "#B99B2D",
			};
		} else {
			return {
				text: "HARD",
				color: "#A53E3E",
			};
		}
	}

	async function initializedOverallTaskPercentages(participants) {
		const totalTask = participants[0].questions.length || 0;
		if (totalTask < 1) return totalTask;
		const totalParticipants = participants.length;
		let totalTaskDone = 0;

		participants.forEach((participant) => {
			totalTaskDone += participant.taskDoneTotal;
		});

		const overallFinishedPercentage =
			(totalTaskDone / (totalTask * totalParticipants)) * 100;
		const overallNotFinishedPercentage = 100 - overallFinishedPercentage;

		return {
			finished: overallFinishedPercentage.toFixed(2), // Rounded to two decimal places
			notFinished: overallNotFinishedPercentage.toFixed(2), // Rounded to two decimal places
		};
	}

	async function initializeTimePressue(data) {
		if (data.finished >= 80) {
			return {
				text: "LOW",
				color: "#3EA573",
			};
		} else if (data.finished >= 50) {
			return {
				text: "MEDIUM",
				color: "#B99B2D",
			};
		} else {
			return {
				text: "HIGH",
				color: "#A53E3E",
			};
		}
	}

	async function initializedOverallPassPercentages(quizScore, participants) {
		const totalParticipants = participants.length;
		let passedCount = 0;

		participants.forEach((participant) => {
			if ("score" in participant) {
				if (participant.score >= quizScore * 0.5) {
					passedCount++;
				}
			}
		});

		const overallPassedPercentage = (passedCount / totalParticipants) * 100;
		const overallNotPassedPercentage = 100 - overallPassedPercentage;

		return {
			passed: overallPassedPercentage.toFixed(2), // Rounded to two decimal places
			notPass: overallNotPassedPercentage.toFixed(2), // Rounded to two decimal places
		};
	}

	async function initializedQuizScore(participants) {
		if (!participants[0]) return 0;
		const quiz = participants[0].questions;
		const totalScore = quiz.reduce(
			(sum, question) => sum + question.points,
			0
		);
		return totalScore;
	}

	async function initializedHighestPointsUser(participants) {
		if (participants.length < 2) return null;
		let highestPointsUser = participants[0];
		participants.forEach((participant) => {
			if (participant.score > highestPointsUser.score) {
				highestPointsUser = participant;
			}
		});
		return highestPointsUser;
	}

	async function initializedLowestPointsUser(participants) {
		if (participants.length < 2) return null;
		let lowestPointsUser = participants[0];
		participants.forEach((participant) => {
			if (participant.score < lowestPointsUser.score) {
				lowestPointsUser = participant;
			}
		});
		return lowestPointsUser;
	}

	async function calculateMetricsForParticipants(
		participants,
		questions
	) {
		const questionTotal = questions.length

		participants.forEach((participant) => {
			participant.correctRatio = (participant.correctTotal/questionTotal).toFixed(2)
			participant.attentionLevel = {}
			const correctPercentage = participant.correctTotal*100/questionTotal
			if(correctPercentage >= 75){
				participant.attentionLevel.text = "LOW"
				participant.attentionLevel.priority = "C"
				participant.attentionLevel.color = "#3EA573"
			}else if(correctPercentage >= 50){
				participant.attentionLevel.text = "MODERATE"
				participant.attentionLevel.priority = "B"
				participant.attentionLevel.color = "#B99B2D"
			}else{
				participant.attentionLevel.text = "HIGH"
				participant.attentionLevel.priority = "A"
				participant.attentionLevel.color = "#A53E3E"
			}

		})

		return participants
	}

	async function initialize(data) {
		let initData = data;
		for (let participant of initData.summarizedParticipants) {
			const newImageBlob = await getParticipantsProfileImage(
				user.token,
				participant.user.imageUrl
			);
			participant.user.imageUrl = newImageBlob;
		}

		if (initData.summarizedParticipants < 1) {
			showNotify(
				null,
				"No one take this quiz.",
				"So we can't analysis for you.",
				() => {
					navigate("/activity/deployed");
				}
			);
			return;
		}
		initData.overall = {};

		// initialize quiz score
		initData.quizScore = await initializedQuizScore(
			initData.summarizedParticipants
		);

		// initialize overall avg score
		initData.overall.avgScore = await initializeOverallAvgScore(
			initData.summarizedParticipants
		);

		// avg finished and not finished percent quiz
		initData.overall.taskPercentages =
			await initializedOverallTaskPercentages(
				initData.summarizedParticipants
			);

		// time pressure
		initData.overall.timePressure = await initializeTimePressue(
			initData.overall.taskPercentages
		);

		// avg pass and not pass percent quiz
		initData.overall.passPercentages =
			await initializedOverallPassPercentages(
				initData.quizScore,
				initData.summarizedParticipants
			);

		// quiz difficulty
		initData.overall.difficulty = await initializeQuizDifficulty(
			initData.overall.passPercentages
		);

		// highest points
		initData.overall.highestPointsUser = await initializedHighestPointsUser(
			initData.summarizedParticipants
		);

		// lowest points
		initData.overall.lowestPointsUser = await initializedLowestPointsUser(
			initData.summarizedParticipants
		);

		// sort by points
		initData.summarizedParticipants.sort((a, b) => {
			return b.score - a.score;
		});

		// calculateMetricsForParticipants
		initData.summarizedParticipants = await calculateMetricsForParticipants(initData.summarizedParticipants, initData.questions)
		console.log(initData.summarizedParticipants[0]);
		setWatchParticipant(initData.summarizedParticipants[0]);
		return initData;
	}

	useEffect(() => {
		async function onGetQuiz() {
			try {
				const res = await getSummarizedQuiz(id, user.token);
				let data = await initialize(res.data);
				setSummarizedQuizData((prev) => data);
			} catch (error) {
				showNotify(
					null,
					"Something went wrong?",
					error.response.data.message,
					() => {
						navigate("/activity/deployed");
					}
				);
			}
		}

		onGetQuiz();
	}, [id]);

	const [sortList, setSortList] = useState(sortMapList);
	const sortByHandler = (sortBy) => {
		let summarizedParticipants =
				summarizedQuizData.summarizedParticipants;
		if (sortBy === sortMapList[0]) {
			// sort by points
			summarizedParticipants.sort((a, b) => {
				return b.score - a.score;
			});
		}else if (sortBy === sortMapList[1]) {
			// sort by attention
			summarizedParticipants.sort((a, b) => {
				const attentionA = a.attentionLevel.priority.toLowerCase();
				const attentionB = b.attentionLevel.priority.toLowerCase();
				if (attentionA < attentionB) return -1;
				if (attentionA > attentionB) return 1;
				return 0;
			});
		}else if (sortBy === sortMapList[2]) {
			// sort by name from a to z
			summarizedParticipants.sort((a, b) => {
				const fullnameA = a.user.fullname.toLowerCase();
				const fullnameB = b.user.fullname.toLowerCase();
				if (fullnameA < fullnameB) return -1;
				if (fullnameA > fullnameB) return 1;
				return 0;
			});
		}

		setSummarizedQuizData((prev) => {
			return {
				...prev,
				summarizedParticipants: summarizedParticipants,
			};
		});
	};

	return (
		<div className="summarized__main__container">
			<Notify
				svg={notify.svg}
				show={notify.show}
				title={notify.title}
				handleClose={closeNotify}
				message={notify.message}
				cb={notify.cb}
			/>
			<Navbar />

			<div className="summarized__container">
				<div className="summarized__header">
					<div className="summarized__header__title">
						{summarizedQuizData?.name || "Not found"}‘s Summary
					</div>
					<div className="summarized__header__description">
						Analysis your quiz result with all participants that
						enroll your quiz.
					</div>
				</div>
				<div className="summarized__content">
					<div className="participants__summary">
						<SummaryHeader
							svgName={"participants"}
							title={"Participants Summary"}
						/>
						<div className="participants__summary__instructor">
							<Instructor
								svgName={"green_circle"}
								description={"Correct Answers (C)"}
							/>
							<Instructor
								svgName={"red_circle"}
								description={"Incorrect Answers (I)"}
							/>
						</div>
						<div className="participants__summary__container">
							<SortSwtich
								sortList={sortList}
								sortByHandler={sortByHandler}
							/>
							<div className="participants__summary__list">
								{summarizedQuizData?.summarizedParticipants.map(
									(participant, id) => {
										return (
											<div
												key={`participants-id-${id}`}
												className="participants__summary__list__item"
												onClick={() => {
													setWatchParticipant(
														participant
													);
												}}
											>
												<div className="participants__summary__list__prof__image">
													<img
														src={
															participant.user
																.imageUrl
														}
														alt="prof__image"
													/>
												</div>
												<div className="participants__summary__list__prof__name">
													{participant.user.fullname}
												</div>
												<div className="crop__grid">
													<div className="participants__summary__list__other__info">
														<div className="participants__summary__list__other__info__svg">
															{svgMap.task}
														</div>
														<div className="participants__summary__list__other__info__description">
															{
																participant.taskDoneTotal
															}
															/
															{
																participant
																	.questions
																	.length
															}{" "}
															Tasks
														</div>
													</div>
													<div className="participants__summary__list__other__info">
														<div className="participants__summary__list__other__info__svg">
															{
																svgMap.green_circle
															}
														</div>
														<div className="participants__summary__list__other__info__description">
															{
																participant.correctTotal
															}{" "}
															C
														</div>
													</div>
													<div className="participants__summary__list__other__info">
														<div className="participants__summary__list__other__info__svg">
															{svgMap.red_circle}
														</div>
														<div className="participants__summary__list__other__info__description">
															{
																participant.incorrectTotal
															}{" "}
															I
														</div>
													</div>
													<div className="participants__summary__list__other__info">
														<div className="participants__summary__list__other__info__svg">
															{svgMap.points}
														</div>
														<div className="participants__summary__list__other__info__description">
															{participant.score}{" "}
															Points
														</div>
													</div>
												</div>
											</div>
										);
									}
								)}
							</div>
						</div>
					</div>
					<div className="summarized_second_container">
						<div className="top-summarized-container">
							<SummaryHeader
								svgName={"summarized"}
								title={"Overall Summary"}
								description={
									"Analysis quiz for all students result."
								}
							/>
							<div className="top-summarized-content">
								<div className="left-summarized">
									<div className="three_item_average">
										<TitleValue
											title={"AVG POINTS"}
											value={
												summarizedQuizData?.overall
													.avgScore
											}
										/>
										<TitleValue
											title={"QUIZ DIFFICULTY"}
											value={
												summarizedQuizData?.overall
													.difficulty.text
											}
											color={
												summarizedQuizData?.overall
													.difficulty.color
											}
										/>
										<TitleValue
											title={"TIME PRESSURE"}
											value={
												summarizedQuizData?.overall
													.timePressure.text
											}
											color={
												summarizedQuizData?.overall
													.timePressure.color
											}
										/>
									</div>
									<div className="avg-prog-percent-container">
										<AnalysisPercent
											name={"AVG PASS"}
											values={[
												{
													color: "#34495E",
													description: "PASS",
													percent:
														summarizedQuizData
															?.overall
															.passPercentages
															.passed,
												},
												{
													color: "#E67E22",
													description: "NOT PASS",
													percent:
														summarizedQuizData
															?.overall
															.passPercentages
															.notPass,
												},
											]}
										/>
										<div className="average_item">
											<TitleValue
												title={"HIGHEST POINTS"}
											/>
											<UserValue
												user={
													summarizedQuizData?.overall
														.highestPointsUser
												}
											/>
										</div>
									</div>
									<div className="avg-prog-percent-container">
										<AnalysisPercent
											name={"AVG FISNISHED"}
											values={[
												{
													color: "#34495E",
													description: "FINISHED",
													percent:
														summarizedQuizData
															?.overall
															.taskPercentages
															.finished,
												},
												{
													color: "#E67E22",
													description: "NOT FINISHED",
													percent:
														summarizedQuizData
															?.overall
															.taskPercentages
															.notFinished,
												},
											]}
										/>
										<div className="average_item">
											<TitleValue
												title={"LOWEST POINTS"}
											/>
											<UserValue
												user={
													summarizedQuizData?.overall
														.lowestPointsUser
												}
											/>
										</div>
									</div>
								</div>
								<div className="right-summarized">
									<div className="right-summarized-content">
										<TitleValue
											title={"EXCEL EXPORTS"}
											svg={svgMap.excel}
										/>
										<ActionSumButton
											text={"COMPACT VERSION"}
											onClick={() => {}}
										/>
										<ActionSumButton
											text={"FULL VERSION"}
											onClick={() => {}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="bottom-summarized-container">
							<SummaryHeader
								svgName={"participants"}
								title={"Participants Summary"}
								description={
									"Select student for look up an analysis data."
								}
							/>
							<ProfileDetail
								user={{
									fullname: watchParticipant?.user.fullname,
									email: watchParticipant?.user.email,
									profileUrl: watchParticipant?.user.imageUrl,
								}}
							/>
							<div className="personal_summarized_grid">
								<TitleValue
									title={"TOTAL POINTS"}
									value={`${watchParticipant?.score}/${summarizedQuizData?.quizScore}`}
								/>
								<TitleValue
									title={"ATTEMPTED TASK"}
									value={`${watchParticipant?.taskDoneTotal}/${watchParticipant?.questions?.length}`}
								/>
								<TitleValue
									title={"CORRECTED TASK"}
									value={watchParticipant?.correctTotal}
								/>
								<TitleValue
									title={"INCORRECTED TASK"}
									value={watchParticipant?.incorrectTotal}
								/>
								<TitleValue
									title={"CORRECT RATIO"}
									value={`${watchParticipant?.correctRatio}`}
								/>
								<TitleValue
									title={"CORRECT STREAK"}
									value={watchParticipant?.highestCorrectStreak}
								/>
								<TitleValue
									title={"ATTENTION LEVEL"}
									value={
										watchParticipant?.attentionLevel
											?.text
									}
									color={
										watchParticipant?.attentionLevel
											?.color
									}
								/>
							</div>
							<div className="adjust_buttom_margin"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
