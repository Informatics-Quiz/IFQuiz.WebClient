import '../global.style.css'

import { ReactComponent as DeleteSvg } from "../../../assets/svg/delete.svg";

import React, { useState, useEffect, useRef } from "react";
import { getQuestionImage, uploadQuiz } from "../../../services/quiz";
import { uploadQuestionImage, uploadQuizCoverImage } from "../../../services/upload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/navbar";
import InputTextAreaFillBlank from "../../../components/input/text-area-fill-blank";
import InputTextAreaChoice from "../../../components/input/text-area-choice";
import Notify from "../../../components/notify";
import { onErrorQuizImageUrl, svgMap } from "../../../config/constraints";
import BottomButton from "../../../components/button/bottom";
import { getImageFromResponse } from '../../../utils/functions/image.blob';
import ModalConfirmDeleteImage from '../../../components/modals/confirm-delete-image';

const CreateQuiz = () => {
	const user = useSelector((state) => state.user.authUser);
	const navigate = useNavigate();

	const [editingQuizDetail, setEditingQuizDetail] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState(0);
	const [selectedQuestionImages, setSelectedQuestionImages] = useState([]);
	const emptyQuestion = {
		type: "single-choice",
		points: 1,
		explanation: {
			explain: "",
		},
		answer: [{ explain: "", checked: false }],
	};

	const [questionList, setQuestionList] = useState([emptyQuestion]);
	const [quiz, setQuiz] = useState({
		name: null,
		description: null,
		points: 0,
		duration: {
			hours: 0,
			minutes: 1,
		},
		hideCorrectAnswer: false,
		questions: questionList,
	});

	function setQuizName(e) {
		const quizName = e.target.value;
		setQuiz((current) => {
			return { ...current, name: quizName };
		});
	}

	function setQuizDescription(e) {
		const quizDescription = e.target.value;
		setQuiz((current) => {
			return { ...current, description: quizDescription };
		});
	}

	function handlerHideCorrectAnswer(){
		setQuiz((current) => {
			return { ...current, hideCorrectAnswer: !current.hideCorrectAnswer };
		})
		console.log(quiz.hideCorrectAnswer)
	}

	function validateDuration(duration) {
		// Check if `hours` and `minutes` are not null
		if (duration.hours !== null && duration.minutes !== null) {
			// Check if `minutes` is greater than or equal to 1
			if (duration.minutes >= 1) {
				return true; // Duration is valid
			} else {
				if (duration.hours < 1) {
					showNotify("error", "Are you serious?", "Duration must be at least 1 minute."); // Minutes must be at least 1
					return false; // Minutes must be at least 1
				}
				return true; // Duration is valid
			}
		} else {
			showNotify("error", "Are you serious?", "Hours and Minutes can't be empty."); // Hours and minutes must not be null
			return false; // Hours and minutes must not be null
		}
	}

	function validateQuiz() {
		if (!quiz.name || quiz.name.length < 3) {
			showNotify("error",
				"Are you serious?",
				"Quiz name must be at least 3 characters."
			);
			return false;
		}

		if (!quiz.description || quiz.description.length < 3) {
			showNotify("error",
				"Are you serious?",
				"Quiz description must be at least 3 characters."
			);
			return false;
		}

		if (!validateDuration(quiz.duration)) return false;

		return true;
	}

	function validateAllQuestion() {
		let totalPoints = 0;
		for (let questionId = 0; questionId < questionList.length; questionId++) {
			const question = questionList[questionId];

			// validate question explanation
			if (question.explanation.explain.length < 1) {
				showNotify("error",
					"Are you serious?",
					`Question (${questionId + 1}) explanation must not be empty`,
					() => {
						setSelectedQuestion(questionId);
					}
				);
				return false;
			}

			// validate question type
			if (
				question.type !== "fill-choice" &&
				question.type !== "single-choice" &&
				question.type !== "multiple-choice"
			) {
				showNotify("error",
					"Are you serious?",
					`Question (${questionId + 1}) type must be in correct format`,
					() => {
						setSelectedQuestion(questionId);
					}
				);
				setSelectedQuestion(questionId);
				return false;
			}

			// validate question points
			if (question.points < 1) {
				showNotify("error",
					"Are you serious?",
					`Question (${questionId + 1}) points must be greater than 0`,
					() => {
						setSelectedQuestion(questionId);
					}
				);
				setSelectedQuestion(questionId);
				return false;
			}
			totalPoints += question.points;

			// validate question answer
			if (question.type === "fill-choice") {
				if (question.answer.length < 1) {
					showNotify("error",
						"Are you serious?",
						`Question (${questionId + 1}) must have at least 1 correct answer`,
						() => {
							setSelectedQuestion(questionId);
						}
					);
					setSelectedQuestion(questionId);
					return false;
				}
				for (const answer of question.answer) {
					if (answer.matchString.length < 1) {
						showNotify("error",
							"Are you serious?",
							`Question (${questionId + 1}) answer must not be empty`,
							() => {
								setSelectedQuestion(questionId);
							}
						);
						setSelectedQuestion(questionId);
						return false;
					}
				}
			} else if (
				question.type === "single-choice" ||
				question.type === "multiple-choice"
			) {
				let foundOneCorrectAnswer = false;
				for (const answer of question.answer) {
					if (answer.checked) {
						foundOneCorrectAnswer = true;
						break;
					}
				}
				if (!foundOneCorrectAnswer) {
					showNotify("error",
						"Are you serious?",
						`Question (${questionId + 1}) must have at least 1 correct answer`,
						() => {
							setSelectedQuestion(questionId);
						}
					);
					return false;
				}

				// validate question answer explanation
				for (const answer of question.answer) {
					if (answer.explain.length < 1) {
						showNotify("error",
							"Are you serious?",
							`Question (${questionId + 1}) answer must not be empty`,
							() => {
								setSelectedQuestion(questionId);
							}
						);
						setSelectedQuestion(questionId);
						return false;
					}
				}
			}
		}

		let finalQuestionList = questionList
		for(let question of finalQuestionList) {
			if(question.type === "fill-choice") {
				for(let answer of question.answer) {
					delete answer?.checked
					delete answer?.explain
				}
			}else if(question.type === 'single-choice' || question.type === 'multiple-choice') {
				for(let answer of question.answer) {
					delete answer?.matchString
					delete answer?.type
				}
			}
		}

		setQuiz({ ...quiz, points: totalPoints, questions: finalQuestionList });
		return true;
	}

	function editQuizDetail() {
		if (!validateAllQuestion()) {
			return;
		}
		setEditingQuizDetail(true);
	}

	function addMoreQuestion() {
		const newQuestion = [...questionList];
		newQuestion.push(emptyQuestion);
		setQuestionList(newQuestion);
	}

	function removeCurrentQuestion() {
		const newQuestion = [...questionList];
		newQuestion.splice(selectedQuestion, 1);
		if (newQuestion.length <= 0) {
			newQuestion.push(emptyQuestion);
		}
		setQuestionList(newQuestion);
		setSelectedQuestion(selectedQuestion - 1 < 0 ? 0 : selectedQuestion - 1);
	}

	function deleteChoice(index) {
		const newQuestion = [...questionList];
		if (newQuestion[selectedQuestion].type == "fill-choice") {
			if (newQuestion[selectedQuestion].answer.length < 2) {
				// Notify at least 1 choice
				showNotify("error", "Are you serious?", "Question must have at least 1 choice");
				return;
			}
			newQuestion[selectedQuestion].answer.splice(index, 1);
		} else {
			if (newQuestion[selectedQuestion].answer.length < 2) {
				showNotify("error", "Are you serious?", "Question must have at least 1 choice");
				return;
			}
			newQuestion[selectedQuestion].answer.splice(index, 1);
		}
		setQuestionList(newQuestion);
	}

	function addChoice() {
		const newQuestion = [...questionList];
		if (newQuestion[selectedQuestion].type == "fill-choice") {
			newQuestion[selectedQuestion].answer.push({
				type: "contains",
				matchString: "",
			});
		} else {
			newQuestion[selectedQuestion].answer.push({
				explain: "",
				checked: false,
			});
		}
		setQuestionList(newQuestion);
	}

	function validateQuestionType(type) {
		if (
			type !== "fill-choice" &&
			type !== "single-choice" &&
			type != "multiple-choice"
		) {
			showNotify("error",
				"Something went wrong?",
				"It's look like question type is incorrect."
			);
			return false;
		}
		return true;
	}
	function changeQuestionType(e) {
		const questionType = e.target.value;
		if (!validateQuestionType(questionType)) return;
		let newQuestion = [...questionList];
		const oldQuestionType = newQuestion[selectedQuestion].type;
		if (oldQuestionType == questionType) return;
		newQuestion[selectedQuestion].type = questionType;
		if (questionType == "fill-choice") {
			for(let answer of newQuestion[selectedQuestion].answer){
				answer.type = "contains";
				answer.matchString = answer.explain;
			}
		}else{
			for(let answer of newQuestion[selectedQuestion].answer){
				answer.explain = answer?.explain || answer?.matchString || "";
				answer.checked = false;
			}
		}
		setQuestionList(newQuestion);
	}

	function changeQuestionPoints(e) {
		const newQuestion = [...questionList];
		try {
			const points = parseInt(e.target.value);
			newQuestion[selectedQuestion].points = points;
			setQuestionList(newQuestion);
		} catch (e) {
			showNotify("error",
				"Something went wrong?",
				"It's look like points is not a number."
			);
			return;
		}
	}

	function changeTypeFillChoice(index, type) {
		if (type !== "contains" && type !== "is-exactly") return;
		const newQuestion = [...questionList];
		if (!newQuestion[selectedQuestion].answer[index]) {
			console.log(`not found answer index ${index}`);
			return;
		}
		newQuestion[selectedQuestion].answer[index].type = type;
		setQuestionList(newQuestion);
	}

	function changeAnswerTextFillChoice(index, text) {
		const newQuestion = [...questionList];
		if (!newQuestion[selectedQuestion].answer[index]) {
			console.log(`not found answer index ${index}`);
			return;
		}
		newQuestion[selectedQuestion].answer[index].matchString = text;
		setQuestionList(newQuestion);
	}

	function changeAnswerTextSelectChoice(index, text) {
		const newQuestion = [...questionList];
		if (!newQuestion[selectedQuestion].answer[index]) {
			console.log(`not found answer index ${index}`);
			return;
		}
		newQuestion[selectedQuestion].answer[index].explain = text;
		setQuestionList(newQuestion);
	}

	function changeQuestionExplanation(e) {
		const newQuestion = [...questionList];
		newQuestion[selectedQuestion].explanation.explain = e.target.value;
		setQuestionList(newQuestion);
	}

	function changeCorrectAnswerSelectChoice(index) {
		const newQuestion = [...questionList];
		if (!newQuestion[selectedQuestion].answer[index]) {
			console.log(`not found answer index ${index}`);
			return;
		}

		if (newQuestion[selectedQuestion].type === "single-choice") {
			for (let ans of newQuestion[selectedQuestion].answer) {
				ans.checked = false;
			}
			newQuestion[selectedQuestion].answer[index].checked = true;
		} else if (newQuestion[selectedQuestion].type === "multiple-choice") {
			newQuestion[selectedQuestion].answer[index].checked =
				!newQuestion[selectedQuestion].answer[index].checked;
		}
		setQuestionList(newQuestion);
	}

	function adjustTextareaHeight() {
		var textarea = document.getElementById("questionTextArea");
		if(!textarea)return
		textarea.style.height = "100px"; // Reset height to allow scrollHeight calculation
		textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
		for(let index = 0; index < questionList[selectedQuestion].answer.length; index++){
			var textarea = document.getElementById(`answer-text-area-${index}`);
			textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
			textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
			console.log(index, textarea.scrollHeight)
		}
	}


	function resizeDescription() {
		var textarea = document.getElementById("quizDescriptionTextArea");
		textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
		textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
	}

	const [quizCoverImage, setQuizCoverImage] = useState(null);
	const [quizImageFile, setQuizImageFile] = useState(null);

	function onSelectImageFromLocal(e) {
		const imageFile = e.target.files[0];
		if (!imageFile) {
			return;
		}
		setQuizImageFile(imageFile);
		const renderImage = URL.createObjectURL(imageFile);
		setQuizCoverImage(renderImage);
	}

	async function saveQuiz() {
		if (!validateQuiz()) return;

		const saveQuiz = {};
		saveQuiz._id = quiz?._id;
		saveQuiz.name = quiz.name;
		saveQuiz.hideCorrectAnswer = quiz.hideCorrectAnswer;
		saveQuiz.description = quiz.description;
		saveQuiz.points = quiz.points;
		saveQuiz.duration = quiz.duration;
		saveQuiz.questions = quiz.questions;

		try {
			const res = await uploadQuiz(user.token, saveQuiz);
			if (res.status === 201) {
				setQuiz(res.data);
				if (!quizImageFile) {
					showNotify("success", "Success", "Quiz saved successfully.", () => {
						navigate("/activity/created");
					});
					return;
				}
				const fd = new FormData();
				fd.append("quiz-cover-image", quizImageFile);
				fd.append("quizId", res.data._id);
				const resUploadImageCover = await uploadQuizCoverImage(user.token, fd);
				if (resUploadImageCover.status === 201) {
					showNotify("success", "Success", "Quiz saved successfully.", () => {
						navigate("/activity/created");
					});
				}
			}
		} catch (e) {
			showNotify(null, "Something went wrong?", e.response.data.message);
		}
	}

	// Notify
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

	function validateNumber(value) {
		const pattern = /^[0-9]+$/;
		return pattern.test(value);
	}

	function onChangeHours(e) {
		let value = e.target.value;
		const newQuiz = { ...quiz };
		if (value == "") {
			newQuiz.duration.hours = 0;
			if (newQuiz.duration.minutes < 1) {
				newQuiz.duration.minutes = 1;
			}
			setQuiz(newQuiz);
			return;
		}
		if (!validateNumber(value)) {
			return;
		}
		const hours = parseInt(value);
		newQuiz.duration.hours = hours;
		if (newQuiz.duration.hours < 1 && newQuiz.duration.minutes < 1) {
			newQuiz.duration.minutes = 1;
		}
		setQuiz(newQuiz);
	}

	function onChangeMinutes(e) {
		let value = e.target.value;
		const newQuiz = { ...quiz };

		if (value == "") {
			if (newQuiz.duration?.hours > 0) {
				newQuiz.duration.minutes = 0;
			} else {
				newQuiz.duration.minutes = 1;
			}
			setQuiz(newQuiz);
			return;
		}

		if (!validateNumber(value)) {
			return;
		}
		const minutes = parseInt(value);
		newQuiz.duration.minutes = minutes;
		if (newQuiz.duration.minutes < 1) {
			if (newQuiz.duration?.hours > 0) {
				newQuiz.duration.minutes = 0;
			} else {
				newQuiz.duration.minutes = 1;
			}
			setQuiz(newQuiz);
			return;
		}
		newQuiz.duration.minutes =
			newQuiz.duration.minutes > 59 ? 59 : newQuiz.duration.minutes;
		setQuiz(newQuiz);
	}

	async function removeQuestionImages(index) {
		const newQuestion = [...questionList];
		newQuestion[selectedQuestion].explanation.imageUrl.splice(index, 1);
		setQuestionList(newQuestion);
		handlerCloseModelConfirmDeleteImage();
	}

	async function uploadQuestionImageFile(e) {
		const file = e.target.files[0];
		if (!file) return
		const formData = new FormData();
		formData.append("questionId", selectedQuestion);
		formData.append("question-image", file);

		try {

			const res = await uploadQuestionImage(user.token, formData);
			console.log(res.status)
			if (res.status === 201) {
				const newQuestion = [...questionList];
				if (!newQuestion[res.data.questionId].explanation.imageUrl) {
					newQuestion[res.data.questionId].explanation.imageUrl = [res.data.imageUrl]
				} else {
					newQuestion[res.data.questionId].explanation.imageUrl.push(res.data.imageUrl)
				}
				refreshQuestionImage(newQuestion[res.data.questionId].explanation.imageUrl)
				setQuestionList(newQuestion);
			}
		} catch (error) {
			console.log(error)
			// notify("Something went wrong?", error.response.data.message)
		}
	}

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


	const [modalConfirmDeleteImage, setModalConfirmDeleteImage] = useState({
		show: false,
		title: null,
		imageUrl: null,
		index: null,
	});
	function handlerShowModelConfirmDeleteImage(imageUrl, index)  {
		setModalConfirmDeleteImage({
			show: true,
			title: "Delete question image",
			imageUrl: imageUrl,
			index: index,
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

	useEffect(() => {
		refreshQuestionImage(questionList[selectedQuestion].explanation.imageUrl)
		adjustTextareaHeight()
	}, [selectedQuestion, modalConfirmDeleteImage.show])

	useEffect(() => {

		setQuiz({ ...quiz, questions: questionList });
		adjustTextareaHeight()
		// eslint-disable-next-line
	}, [questionList]);

	
	useEffect(() => {
		adjustTextareaHeight()
	}, [editingQuizDetail])

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
				handleConfirm={removeQuestionImages}
				handleCancle={handlerCloseModelConfirmDeleteImage}
			/>

			<Navbar />

			{!editingQuizDetail ? (
				<BottomButton
					svgName="back"
					position="left"
					label={"Back"}
					cb={() => {
						navigate(-1);
					}}
				/>
			) : null}

			{editingQuizDetail ? (
				<>
					<div className="bottom__action__edit__quiz">
						<BottomButton
							svgName="next"
							position="right"
							label={"Save Quiz"}
							cb={saveQuiz}
						/>

						<BottomButton
							svgName="back"
							position="left"
							label={"Edit question"}
							cb={() => {
								setEditingQuizDetail(false);
							}}
						/>
					</div>

					<div className="edit__detail__quiz__main">
						<div className="edit__quiz__detail__container">
							<div className="cover__image__container">
								<div className="image__cover">
									<img
										src={quizCoverImage ? quizCoverImage : onErrorQuizImageUrl}
									></img>
								</div>
								<label htmlFor="file-upload" className="custom-file-upload">
									Upload Quiz Cover Image
								</label>
								<input
									id="file-upload"
									type="file"
									accept="image/*"
									onChange={onSelectImageFromLocal}
								/>
							</div>
							<div className="quiz__detail__content">
								<div className="quiz__name">
									<div className="title">Quiz Name</div>
									<input
										onChange={setQuizName}
										value={quiz.name}
										placeholder="Please enter the name for your quiz here."
									></input>
								</div>
								<div className="quiz__detail__description">
									<div className="title">Description</div>
									<textarea
										value={quiz.description}
										onChange={setQuizDescription}
										id="quizDescriptionTextArea"
										placeholder="Please enter the description for your quiz here."
										onInput={resizeDescription}
									></textarea>
								</div>
								<div className='edit-detail-action-fixed'>
									<div className="quiz__duration">
										<div className="title">
											{svgMap.timer_white}
											Durations
										</div>
										<div className="form">
											<div className="field">
												<input
													type="text"
													value={
														quiz.duration.hours == null ? "" : quiz.duration.hours
													}
													onChange={onChangeHours}
													placeholder="0"
												/>
												Hours
											</div>
											<div className="field">
												<input
													type="text"
													value={
														quiz.duration.minutes == null
															? ""
															: quiz.duration.minutes
													}
													onChange={onChangeMinutes}
													placeholder="1"
												/>
												Minutes
											</div>
										</div>
									</div>
									<div className="quiz__duration">
										<div className="title">
											<label class="switch">
												<input class="chk" type="checkbox" checked={!quiz?.hideCorrectAnswer} onChange={handlerHideCorrectAnswer} />
												<span class="slider"></span>
												
											</label>
											<div className='title-show-correct-ans'>
													Show Correct Answer
												</div>
										</div>
										<div className="form">
											<div className='switch_label'>
												Enable it will show correct answer on reveal page.
											</div>
										</div>
									</div>
								</div>
								<div className="quiz__short__info">
									<div className="item">
										<div className="header">
											{svgMap.points}
											Total Score
										</div>
										{quiz.points}
									</div>
									<div className="item">
										<div className="header">
											{svgMap.task}
											Tasks
										</div>
										{quiz.questions.length}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="create__main__continer">
					<div className="create__container">
						<div className="question__container">
							<div className="header">
								<div className="img">{svgMap.question}</div>
								<div className="title">Question</div>
							</div>
							<div className="items">
								{questionList.map((question, i) => (
									<div key={`${question.type}-div-${i}`} className="item">
										<button
											key={`${question.type}-button-${i}`}
											onClick={() => setSelectedQuestion(i)}
											className={
												selectedQuestion === i
													? "question__active"
													: "question__unactive"
											}
										>
											{" "}
											<span
												className={
													questionList[i].explanation.explain == ""
														? "not__has__explanation"
														: "has__explanation"
												}
											>
												{questionList[i].explanation.explain == ""
													? `(${i + 1}) Editing Question...`
													: `(${i + 1}) ${questionList[i].explanation.explain}`}
											</span>
										</button>

										{selectedQuestion === i ? (
											<DeleteSvg onClick={removeCurrentQuestion} />
										) : (
											<></>
										)}
									</div>
								))}
							</div>
							<div className="action">
								<button onClick={addMoreQuestion} className="add">
									{svgMap.add_button}
									Add Question
								</button>
							</div>
						</div>
					</div>
					<BottomButton
						svgName="next"
						position="right"
						label={"Edit quiz detail"}
						cb={editQuizDetail}
					/>
					<div className="question__content">
						<div className="settings">
							<div className='item'>
								<div className="header">
									{svgMap.image}
									<div className="label">Image</div>
								</div>
								<label htmlFor="file-upload" className="custom-file-upload">
									Upload
								</label>
								<input
									id="file-upload"
									type="file"
									accept="image/*"
									onChange={uploadQuestionImageFile}
								/>
							</div>
							<div className="item">
								<div className="header">
									{svgMap.points}
									<div className="label">Points</div>
								</div>
								<select
									id="if-select"
									name="points"
									onChange={changeQuestionPoints}
									value={quiz.questions[selectedQuestion].points}
								>
									<option value={1}>1 Points</option>
									<option value={2}>2 Points</option>
									<option value={3}>3 Points</option>
									<option value={5}>5 Points</option>
									<option value={10}>10 Points</option>
								</select>
							</div>
							<div className="item">
								<div className="header">
									{svgMap.category}
									<div className="label2">Type</div>
								</div>
								<select
									name="type"
									onChange={changeQuestionType}
									value={quiz.questions[selectedQuestion].type}
								>
									<option value={"single-choice"}>Single Choice</option>
									<option value={"multiple-choice"}>Multiple Choice</option>
									<option value={"fill-choice"}>Fill Choice</option>
								</select>
							</div>
						</div>

						{selectedQuestionImages.length > 0 ? (
							<div className='question__explanation__image'>
								{selectedQuestionImages.map((imageStream, i) => {
									return <div
										key={`question-image-${i}`}
										className='image__item'
										onClick={() => handlerShowModelConfirmDeleteImage(imageStream, i)}
									>
										<img src={imageStream} alt='question-image'></img>
										<div className='remove__label'>CLICK TO DELETE</div>
									</div>
								})}
							</div>
						) : null}
						<textarea
							name="explain"
							id="questionTextArea"
							onInput={adjustTextareaHeight}
							value={quiz.questions[selectedQuestion].explanation.explain}
							onChange={changeQuestionExplanation}
							placeholder="Write your question here... "
						></textarea>
						{/* {JSON.stringify(quiz)} */}
						{questionList[selectedQuestion].type === "fill-choice" ? (
							<>
								<div className="explanation__type">
									<div className="item">
										{svgMap.contains}
										Contains
									</div>
									<div className="item">
										{svgMap.exactly}
										Exactly
									</div>
								</div>
								<div className="answers">
									{quiz.questions[selectedQuestion].answer.map(
										(data, index) => {
											return (
												<InputTextAreaFillBlank
													index={index}
													type={data.type}
													value={data.matchString}
													onChange={changeAnswerTextFillChoice}
													changeType={changeTypeFillChoice}
													deleteItem={deleteChoice}
												/>
											);
										}
									)}
									<div className="add__choice">
										<button onClick={addChoice}>
											{svgMap.add_button}
											Add Choice
										</button>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="answers">
									{quiz.questions[selectedQuestion].answer.map(
										(data, index) => {
											return (
												<InputTextAreaChoice
													key={`input-text-area-choice-${index}`}
													index={index}
													checked={data.checked}
													onChange={changeAnswerTextSelectChoice}
													setCorrectAnswer={changeCorrectAnswerSelectChoice}
													deleteItem={deleteChoice}
													value={data.explain}
												/>
											);
										}
									)}
									<div className="add__choice">
										<button onClick={addChoice}>
											{svgMap.add_button}
											Add Choice
										</button>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CreateQuiz;
