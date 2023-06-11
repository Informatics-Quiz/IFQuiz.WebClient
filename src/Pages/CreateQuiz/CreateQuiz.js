import React, { useState, useEffect } from 'react'
import { BsImage, BsEyeFill } from 'react-icons/bs'
import './CreateQuiz.css'
import FillBlankChoice from '../../Components/Choice/FillBlank'
import NormalChoice from '../../Components/Choice/Normal'
import { uploadQuiz } from '../../Services/quiz'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateQuiz = () => {
	const user = useSelector((state) => state.user.authUser)
	const navigate = useNavigate()
	const [selectedQuestion, setSelectedQuestion] = useState(0)

	const [questionList, setQuestionList] = useState([
		{
			type: '',
			timer: 0,
			points: 0,
			explanation: {
				explain: '',
				imageUrl: '',
			},
			answer: {
				correctAnswer: 0,
				selectAnswers: [],
			},
		}
	])

	function addMoreQuestion(){
		const newQuestion = [...questionList]
		newQuestion.push({
			type: '',
			timer: 0,
			points: 0,
			explanation: {
				explain: '',
				imageUrl: '',
			},
			answer: {
				correctAnswer: 0,
				selectAnswers: [],
			},
		})
		setQuestionList(newQuestion)
	}
	])

	const [quiz, setQuiz] = useState({
		name: '',
		description: 'something like this in the future',
		category: 'Mathematics',
		hideCorrectAnswer: false,
		questions: questionList,
	})

	const [selectedFillBlankChoice, setSelectedFillBlankChoice] = useState([
		{
			type: 'is-exactly',
			matchString: [],
		},
	])

	const [selectedNormalChoices, setSelectedNormalChoices] = useState([
		{
			explain: '',
			checked: false,
		},
	])

	function handleClickChoiceType(e) {
		handleChangeInput(e)
		setSelectedFillBlankChoice([
			{
				type: 'is-exactly',
				matchString: [],
			},
		])
		setSelectedNormalChoices([
			{
				explain: '',
				checked: false,
			},
		])
	}

	function handleChangeInput(e) {
		const { name, value } = e.target
		const basicsData = ['type', 'points']
		const newQuestionList = [...questionList]
		const index = selectedQuestion
		if (basicsData.includes(name)) {
			newQuestionList[index][name] = name === 'type' ? value : +value
		} else {
			if (name === 'explain' || name === 'imageUrl') {
				newQuestionList[index].explanation[name] = value
			}
		}
		setQuestionList(newQuestionList)
	}

	function handleChangeQuiz(e) {
		const { name, value } = e.target
		switch (name) {
			case 'hideCorrectAnswer':
				setQuiz({ ...quiz, [name]: !quiz.hideCorrectAnswer })
				break
			default:
				setQuiz({ ...quiz, [name]: value })
	}

	async function handleSubmit() {
		const newQuestionList = quiz.questions.map((obj) => {
			if (obj.type === 'fill-choice') {
				return { ...obj }
			}
			const { selectAnswers, ...rest } = obj.answer
			const newSelectAnswers = selectAnswers.map(({ checked, ...rest }) => rest)
			return { ...obj, answer: { ...rest, selectAnswers: newSelectAnswers } }
		})

		let data = { ...quiz, questions: newQuestionList }
		let arrs = []

		// eslint-disable-next-line
		data.questions.map((quest, index) => {

			if (quest.type !== "") {
				arrs.push(quest)
			}
		})

		data.questions = arrs
		console.log(JSON.stringify(data))

		const res = await uploadQuiz(user.token, data)

		if (res.status === 201) {
			navigate('/Home')
		}
	}

	useEffect(() => {
		function handleChangeAnswer() {
			const newQuestionList = [...questionList]
			const index = selectedQuestion
			const questionType = questionList[selectedQuestion].type
			if (questionType === 'fill-choice') {
				newQuestionList[index].answer.correctAnswer = selectedFillBlankChoice
				delete newQuestionList[index].answer.selectAnswers
			} else if (['single-choice', 'multiple-choice'].includes(questionType)) {
				newQuestionList[index].answer.selectAnswers = selectedNormalChoices
				newQuestionList[index].answer.correctAnswer =
					questionType === 'single-choice'
						? selectedNormalChoices.findIndex((choice) => choice.checked)
						: selectedNormalChoices
							.filter((choice) => choice.checked)
							.map((choice) => selectedNormalChoices.indexOf(choice))
			}
			setQuestionList(newQuestionList)
		}

		handleChangeAnswer()
		// eslint-disable-next-line
	}, [selectedFillBlankChoice, selectedNormalChoices])

	useEffect(() => {
		setQuiz({ ...quiz, questions: questionList })
		// eslint-disable-next-line
	}, [questionList])

	return (
		<div>
			<div className="flex justify-between bg-[#4A5059] p-2">
				<input
					type="text"
					name="name"
					placeholder="Untitled Quiz"
					className="p-2 w-72 rounded bg-[#161B22]"
					value={quiz.name}
					onChange={handleChangeQuiz}
				/>
				<div className="flex items-center">
					<label>Hide Correct Answer</label>
					<div className="form-check form-switch mb-0 mx-2">
						<input
							name="hideCorrectAnswer"
							className="form-check-input bg-[#238636]"
							type="checkbox"
							value={quiz.hideCorrectAnswer}
							checked={quiz.hideCorrectAnswer}
							onChange={handleChangeQuiz}
						/>
					</div>
					<button onClick={handleSubmit} className="px-8 py-2 rounded bg-[#238636] text-[#C9D1D9] ml-6">
						SAVE
					</button>
				</div>
			</div>
			<button className='add__question__button' onClick={addMoreQuestion}>
				Add more question
			</button>
			<div className="flex">
				<div className="flex flex-col p-3">
					<div className="flex flex-col items-center bg-[#161B22] px-4 py-3 rounded">
						<BsImage className="text-7xl" />
						<span>Image</span>
					</div>
					<select
						defaultValue={0}
						className="border p-1.5 rounded mt-3 text-slate-300 bg-[#010409]"
						onChange={(e) => {
							let index = parseInt(e.target.value)
							setSelectedQuestion(index)
						}}
					>
						{[...Array(50)].map((_, i) => (
							<option className="bg-[#161B22]" value={i} key={i}>
								Question {i + 1}
							</option>
						))}
					</select>
				</div>

				{quiz.questions[selectedQuestion] && (
					<div className="flex-1 flex flex-col py-3 pr-3">
						<div className="h-[450px] bg-[#161B22] rounded flex-col items-center justify-center relative">
							<div className="flex justify-between p-2">
								<BsEyeFill className="text-xl text-[#4A5059]" />
								<div className="flex items-center">
									<select
										className="bg-[#161B22] border p-1.5 rounded text-slate-300"
										name="timer"
										value={quiz.questions[selectedQuestion].timer}
										onChange={handleChangeInput}
									>
										<option value={0} disabled>
											Timer
										</option>
										<option value={30}>30 sec</option>
										<option value={60}>1 min</option>
										<option value={120}>2 min</option>
									</select>
									<select
										className="bg-[#161B22] border p-1.5 rounded text-slate-300 mx-3"
										name="points"
										value={quiz.questions[selectedQuestion].points}
										onChange={handleChangeInput}
									>
										<option value={0} disabled>
											Point
										</option>
										<option value={1}>1 Point</option>
										<option value={3}>3 Points</option>
										<option value={10}>10 Points</option>
									</select>
									<select
										className="bg-[#161B22] border p-1.5 rounded text-slate-300"
										name="type"
										value={quiz.questions[selectedQuestion].type}
										onChange={handleClickChoiceType}
									>
										<option value={''} disabled>
											Choice
										</option>
										<option value={'single-choice'}>Single Choice</option>
										<option value={'multiple-choice'}>Multiple Choice</option>
										<option value={'fill-choice'}>Fill Choice</option>
									</select>
								</div>
							</div>
							<input
								type="text"
								name="explain"
								value={quiz.questions[selectedQuestion].explanation.explain}
								placeholder="Type a question..."
								onChange={handleChangeInput}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-slate-400 text-center border-none outline-none bg-transparent w-4/5"
							/>
						</div>

						{questionList[selectedQuestion].type === 'fill-choice' ? (
							<FillBlankChoice
								selectedFillBlankChoice={selectedFillBlankChoice}
								setSelectedFillBlankChoice={setSelectedFillBlankChoice}
							/>
						) : (
							(questionList[selectedQuestion].type === 'single-choice' ||
								questionList[selectedQuestion].type === 'multiple-choice') && (
								<NormalChoice
									choiceType={questionList[selectedQuestion].type}
									selectedChoices={questionList[selectedQuestion].answer.selectAnswers}
									setSelectedChoices={setSelectedNormalChoices}
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CreateQuiz
