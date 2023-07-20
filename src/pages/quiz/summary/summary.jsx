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

export default function Summary() {
	// const user = useSelector((state) => state.user.authUser);
	const [summarizedQuizData, setSummarizedQuizData] = useState(null);

	const { id } = useParams();
	const navigate = useNavigate();
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

	useEffect(() => {
		async function onGetQuiz() {
			try {
				// const res = await getSummarizedQuiz(id, user.token);
				// setSummarizedQuizData((current) => res.data);
			} catch (error) {
				// showNotify(
				// 	null,
				// 	"Something went wrong?",
				// 	error.response.data.message,
				// 	() => {
				// 		navigate("/activity/deployed");
				// 	}
				// );
			}
		}

		onGetQuiz();
	}, [id]);

	const [sortList, setSortList] = useState(["ATTENTION", "POINTS", "NAME"]);
	const sortByHandler = (sortBy) => {
		console.log(sortBy);
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
			{/* <Navbar /> */}

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
								<div className="participants__summary__list__item">
									<div className="participants__summary__list__prof__image">
										<img
											src={
												"https://images.summitmedia-digital.com/cosmo/images/2023/01/08/gyj-2-1673113544.jpg"
											}
											alt="prof__image"
										/>
									</div>
									<div className="participants__summary__list__prof__name">
										Jakkrit Choapron
									</div>
									<div className="crop__grid">
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.task}
											</div>
											<div className="participants__summary__list__other__info__description">
												{800}/{1000} Tasks
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.green_circle}
											</div>
											<div className="participants__summary__list__other__info__description">
												{0} C
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.red_circle}
											</div>
											<div className="participants__summary__list__other__info__description">
												{3000} C
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.points}
											</div>
											<div className="participants__summary__list__other__info__description">
												{3000} Points
											</div>
										</div>
									</div>
								</div>
								<div className="participants__summary__list__item">
									<div className="participants__summary__list__prof__image">
										<img
											src={
												"https://images.summitmedia-digital.com/cosmo/images/2023/01/08/gyj-2-1673113544.jpg"
											}
											alt="prof__image"
										/>
									</div>
									<div className="participants__summary__list__prof__name">
										Jakkrit Choapron
									</div>
									<div className="crop__grid">
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.task}
											</div>
											<div className="participants__summary__list__other__info__description">
												{0}/{1000} Tasks
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.green_circle}
											</div>
											<div className="participants__summary__list__other__info__description">
												{0} C
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.red_circle}
											</div>
											<div className="participants__summary__list__other__info__description">
												{3000} C
											</div>
										</div>
										<div className="participants__summary__list__other__info">
											<div className="participants__summary__list__other__info__svg">
												{svgMap.points}
											</div>
											<div className="participants__summary__list__other__info__description">
												{3000} Points
											</div>
										</div>
									</div>
								</div>
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
							<div className="left-summarized">
								<div className="three_item_average">
									<TitleValue
										title={"AVG POINTS"}
										value={"50.2/100"}
									/>
									<TitleValue
										title={"QUIZ DIFFICULTY"}
										value={"HARD"}
									/>
									<TitleValue
										title={"TIME PRESSURE"}
										value={"LOW"}
									/>
								</div>
								<div className="avg-prog-percent-container">
									<AnalysisPercent
										name={"AVG PASS"}
										values={
											[
												{
													color: "#34495E",
													description: "PASS",
													percent: "30%",
												},
												{
													color: "#E67E22",
													description: "NOT PASS",
													percent: "70%",
												}
											]
										}
									/>
									<div className="average_item">

										<TitleValue
											title={"HIGHEST POINTS"}
										/>
										<UserValue
											fullname={"Jakkrit Chaopron"}
											profileUrl={"https://images.summitmedia-digital.com/cosmo/images/2023/01/08/gyj-2-1673113544.jpg"}
											value={"60 Points"}
										/>
									</div>
								</div>
								<div className="avg-prog-percent-container">
									<AnalysisPercent
										name={"AVG FISNISHED"}
										values={
											[
												{
													color: "#34495E",
													description: "FINISHED",
													percent: "95%",
												},
												{
													color: "#E67E22",
													description: "NOT FINISHED",
													percent: "5%",
												}
											]
										}
									/>
									<div className="average_item">

										<TitleValue
											title={"LOWEST POINTS"}
										/>
										<UserValue
											fullname={"Jakkrit Chaopron"}
											profileUrl={"https://media.discordapp.net/attachments/1023711125017219103/1131511361483059200/image.png"}
											value={"5 Points"}
										/>
									</div>
								</div>
								{/* <div className="avg-prog-percent-container">
									<div className="avg_header">
										<div className="avg_header_title">
											AVG FISNISHED
										</div>
										<div className="avg-pass-instructor">
											<Instructor
												svgName={"blueReg"}
												description={"FINISHED"}
											/>
											<Instructor
												svgName={"orangeReg"}
												description={"NOT FINISHED"}
											/>
										</div>
										<div className="progress-bar-percent">
											<div className="prog-per-left-side">
												30%
											</div>
											<div className="prog-per-right-side">
												70%
											</div>
										</div>
									</div>
								</div> */}
							</div>
							<div className="right-summarized"></div>
						</div>
						<div className="bottom-summarized-container"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
