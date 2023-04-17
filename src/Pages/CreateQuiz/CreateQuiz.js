import React, { useState } from 'react'
import { BsImage, BsEyeFill } from 'react-icons/bs'
import './CreateQuiz.css'
import FillBlankChoice from '../../Components/Choice/FillBlank'
import NormalChoice from '../../Components/Choice/Normal'

const CreateQuiz = () => {
	const [selectedQuestion, setSelectedQuestion] = useState(0)

	const [questionList, setQuestionList] = useState([
		{
			type: '',
			timer: 0,
			points: 0,
			explanation: {
				explain: 'q1',
				imageUrl: '',
			},
			answer: {
				selectAnswers: [],
				correctAnswer: 0,
			},
		},
		{
			type: '',
			timer: 0,
			points: 0,
			explanation: {
				explain: 'q2',
				imageUrl: '',
			},
			answer: {
				selectAnswers: [],
				correctAnswer: 0,
			},
		},
		{
			type: '',
			timer: 0,
			points: 0,
			explanation: {
				explain: 'q3',
				imageUrl: '',
			},
			answer: {
				selectAnswers: [],
				correctAnswer: 0,
			},
		},
	])

	const [selectedFillBlankChoice, setSelectedFillBlankChoice] = useState([
		{
			type: 'is-exactly',
			matchString: [],
		},
	])

	const [selectedNormalChoices, setSelectedNormalChoices] = useState([
		{
			answer: '',
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
				answer: '',
				checked: false,
			},
		])
	}

	function handleChangeInput(e) {
		const { name, value } = e.target
		const basicsData = ['type', 'timer', 'points']
		const newQuestionList = [...questionList]
		const index = selectedQuestion
		if (basicsData.includes(name)) {
			newQuestionList[index][name] = value
		} else {
			if (name === 'explain' || name === 'imageUrl') {
				newQuestionList[index].explanation[name] = value
			}
		}
		setQuestionList(newQuestionList)
	}

	return (
		<div>
			<div className="flex justify-between bg-[#4A5059] p-2">
				<input type="text" placeholder="Untitled Quiz" className="p-2 w-72 rounded bg-[#161B22]" />
				<div className="flex items-center">
					<label>Hide Correct Answer</label>
					<div className="form-check form-switch mb-0 mx-2">
						<input
							name="backgroundMusic"
							className="form-check-input bg-[#238636]"
							type="checkbox"
							role="switch"
							id="flexSwitchCheckDefault"
						></input>
					</div>
					<button className="px-8 py-2 rounded bg-[#238636] text-[#C9D1D9] ml-6">SAVE</button>
				</div>
			</div>

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
						{[...Array(3)].map((_, i) => (
							<option className="bg-[#161B22]" value={i} key={i}>
								Question {i + 1}
							</option>
						))}
					</select>
				</div>

				{questionList[selectedQuestion] && (
					<div className="flex-1 flex flex-col py-3 pr-3">
						<div className="h-[450px] bg-[#161B22] rounded flex-col items-center justify-center relative">
							<div className="flex justify-between p-2">
								<BsEyeFill className="text-xl text-[#4A5059]" />
								<div className="flex items-center">
									<select
										defaultValue={0}
										name="timer"
										value={questionList[selectedQuestion].timer}
										className="bg-[#161B22] border p-1.5 rounded text-slate-300"
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
										defaultValue={''}
										name="points"
										value={questionList[selectedQuestion].points}
										className="bg-[#161B22] border p-1.5 rounded text-slate-300 mx-3"
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
										defaultValue={''}
										name="type"
										value={questionList[selectedQuestion].type}
										className="bg-[#161B22] border p-1.5 rounded text-slate-300"
										onChange={handleClickChoiceType}
									>
										<option value={''} disabled>
											Choice
										</option>
										<option value={'single-choice'}>Single Choice</option>
										<option value={'multiple-choice'}>Multiple Choice</option>
										<option value={'fill-blank'}>Fill Blank</option>
									</select>
								</div>
							</div>
							<input
								type="text"
								name="explain"
								value={questionList[selectedQuestion].explanation.explain}
								placeholder="Type a question..."
								onChange={handleChangeInput}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-slate-400 text-center border-none outline-none bg-transparent w-4/5"
							/>
						</div>

						{questionList[selectedQuestion].type === 'fill-blank' ? (
							<FillBlankChoice
								selectedFillBlankChoice={selectedFillBlankChoice}
								setSelectedFillBlankChoice={setSelectedFillBlankChoice}
							/>
						) : (
							(questionList[selectedQuestion].type === 'single-choice' ||
								questionList[selectedQuestion].type === 'multiple-choice') && (
								<NormalChoice
									choiceType={questionList[selectedQuestion].type}
									selectedChoices={selectedNormalChoices}
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
