import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactRouterPrompt from 'react-router-prompt'
import PreventDialog from '../../Components/PreventDialog'
import { setCurrentQuiz } from '../../Reducers/quizReducer'
import { BsCheckCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router'

export default function TakeQuiz() {
	const currentQuiz = useSelector((state) => state.quiz.current)
	const user = useSelector((state) => state.user.authUser)
	const [userAnswers, setUserAnswers] = useState([])
	const [isFinished, setIsFinished] = useState(false)
	const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleChangeUserAnswers(e, index, type) {
		const { value } = e.target
		if (type === 'single-choice') {
			const newUserAnswers = [...userAnswers]
			newUserAnswers[index] = +value
			setUserAnswers(newUserAnswers)
		} else if (type === 'fill-choice') {
			const newUserAnswers = [...userAnswers]
			newUserAnswers[index] = value
			setUserAnswers(newUserAnswers)
		} else if (type === 'multiple-choice') {
			if (!userAnswers[index]) {
				const newUserAnswers = [...userAnswers]
				newUserAnswers[index] = [+value]
				setUserAnswers(newUserAnswers)
				return
			}

			if (userAnswers[index].includes(+value)) {
				const newUserAnswers = [...userAnswers]
				newUserAnswers[index] = newUserAnswers[index].filter((item) => item !== +value)
				setUserAnswers(newUserAnswers)
			} else {
				const newUserAnswers = [...userAnswers]
				newUserAnswers[index] = [...newUserAnswers[index], +value]
				setUserAnswers(newUserAnswers)
			}
		}
	}

	function handleSubmit() {
		console.log(userAnswers)
		setIsFinished(true)
		setIsOpenSuccessModal(true)
	}

	function onLeavingPage(isActive, onConfirm) {
		onConfirm(isActive)
		dispatch(setCurrentQuiz(null))
	}

	if (!currentQuiz) return null

	return (
		<div className="flex flex-col">
			<ReactRouterPrompt when={!isFinished}>
				{({ isActive, onConfirm, onCancel }) =>
					isActive && (
						<PreventDialog
							isActive={isActive}
							onConfirm={() => onLeavingPage(isActive, onConfirm)}
							onCancel={onCancel}
						/>
					)
				}
			</ReactRouterPrompt>
			<div className="flex justify-between bg-[#0d1117] py-2 px-6">
				<span>ยินดีต้อนรับ : {user.fullname}</span>
			</div>

			{isOpenSuccessModal ? (
				<div className="w-[600px] bg-[#0d1117] mt-20 mx-auto flex flex-col items-center py-12 rounded">
					<h4>ระบบได้ทำการส่งข้อสอบของท่านเรียบร้อยแล้ว</h4>
					<BsCheckCircle className="text-[100px] my-12" />
					<button onClick={() => navigate('/Home')} className="bg-[#171b21] px-3 py-2 rounded shadow">
						กลับสู่หน้าหลัก
					</button>
				</div>
			) : (
				<div className="flex flex-col mx-auto py-6 w-[600px]">
					<div className="bg-[#0d1117] flex items-center justify-center rounded mb-4">
						<h2 className="m-0 py-2">{currentQuiz.name}</h2>
					</div>
					{currentQuiz.questions.map((question, index) => (
						<div className="bg-[#0d1117] rounded my-3 py-4 px-12 flex flex-col" key={index}>
							<span>
								{index + 1}. {question.explanation.explain}
							</span>
							{question.explanation.imageUrl && (
								<img src={question.explanation.imageUrl} alt="question" className="w-[200px] object-cover mt-4" />
							)}
							<ChoiceOptions
								type={question.type}
								answers={question.answer.selectAnswers}
								userAnswers={userAnswers[index]}
								handleChangeUserAnswers={(e) => handleChangeUserAnswers(e, index, question.type)}
							/>
						</div>
					))}
					<button className="bg-[#238636] rounded py-2" onClick={handleSubmit}>
						ส่ง
					</button>
				</div>
			)}
		</div>
	)
}

function ChoiceOptions({ type, answers, userAnswers, handleChangeUserAnswers }) {
	let choice
	if (type === 'fill-choice') {
		choice = (
			<div className="mt-2">
				<input
					type="text"
					placeholder="Type your answer..."
					className="w-full border border-[#585e65] bg-inherit outline-none py-2 px-6 rounded"
					value={userAnswers || ''}
					onChange={handleChangeUserAnswers}
				/>
			</div>
		)
	} else if (type === 'single-choice') {
		choice = answers.map((answer, index) => (
			<div className="flex items-center mt-2 first:mt-0" key={index}>
				<input type="radio" value={index} checked={userAnswers === index} onChange={handleChangeUserAnswers} />
				<label className="ml-6">{answer.explain}</label>
			</div>
		))
	} else if (type === 'multiple-choice') {
		choice = answers.map((answer, index) => (
			<div className="flex items-center my-2 first:mt-0" key={index}>
				<input
					type="checkbox"
					value={index}
					checked={userAnswers?.includes(index) || false}
					onChange={handleChangeUserAnswers}
				/>
				<label className="ml-6">{answer.explain}</label>
			</div>
		))
	}

	return <div className="mt-2 flex flex-col">{choice}</div>
}
