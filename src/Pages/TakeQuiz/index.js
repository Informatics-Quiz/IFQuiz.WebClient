import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactRouterPrompt from 'react-router-prompt'
import PreventDialog from '../../Components/PreventDialog'
import { setCurrentQuiz } from '../../Reducers/quizReducer'
import { BsCheckCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { sendQuiz } from '../../Services/quiz'


export default function TakeQuiz() {
	const currentQuiz = useSelector((state) => state.quiz.current)
	const user = useSelector((state) => state.user.authUser)
	const [number, setNumber] = useState(0)
	const [score, setScore] = useState(0)
	const [userAnswers, setUserAnswers] = useState([])
	const [isFinished, setIsFinished] = useState(false)
	const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	function handleChangeUserAnswers(e, index, type) {


		const { value } = e.target


		if (type === 'single-choice') {
			const newUserAnswers = [...userAnswers]
			if (newUserAnswers[index] == value) {
				newUserAnswers.splice(index, 1)
				setUserAnswers(newUserAnswers)
				return
			}
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
				console.log(newUserAnswers)
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

	function changeQuestion(number) {
		setNumber(number)
	}

	async function handleSubmit() {
		console.log('userAnswers : ' + userAnswers)
		try {
			const requestBody = {
				userAnswers: userAnswers,
				roomInformation: currentQuiz
			}
			const res = await sendQuiz(user.token, requestBody)
			setScore(res.data.score)
			setIsFinished(true)
			setIsOpenSuccessModal(true)
		} catch (error) {
			console.log('eror : ' + error)
		}

	}

	function isMultipleSelect(choiceId) {
		if(!userAnswers[number]) return false
		for(const answerId of userAnswers[number]){
			if (answerId === choiceId) return true
		}
		return false
	}

	function onLeavingPage(isActive, onConfirm) {
		onConfirm(isActive)
		dispatch(setCurrentQuiz(null))
	}

	function getScoreOfQuiz(){
		let score = 0
		for (const question of currentQuiz.questions){
			score += question.points
		}
		return score
	}

	if (!currentQuiz) return null

	// console.log(JSON.stringify(userAnswers))
	// console.log(JSON.stringify(currentQuiz))

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
				<span style={{ marginLeft: '90px' }}>ยินดีต้อนรับ : {user.fullname}</span>
			</div>

			{isOpenSuccessModal ? (
				<div className="w-[600px] bg-[#0d1117] mt-20 mx-auto flex flex-col items-center py-12 rounded">
					<h4>ระบบได้ทำการตรวจคะเเนนข้อสอบของท่านเรียบร้อยเเล้ว</h4>
					<BsCheckCircle className="text-[100px] my-12" />
					<h1>{score} / { getScoreOfQuiz() }</h1>
					<button onClick={() => navigate('/Home')} className="bg-[#171b21] px-3 py-2 rounded shadow mt-5">
						กลับสู่หน้าหลัก
					</button>
				</div>
			) : (
				<div className="flex flex-col py-5 w-[1000px]" style={{ marginLeft: '35%' }}>
					<div style={{ width: '450px', height: '150px', position: 'absolute', top: '9.425%', left: '2.15%', borderRadius: '10px', display: 'flex', flexWrap: 'wrap' }}>
						{currentQuiz.questions.map((question, index) => (
							<button key={index} onClick={(e) => setNumber(e.target.value)} value={index} style={{ backgroundColor: '#161B22', height: '30px', width: '45px', borderRadius: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{index + 1}</button>
						))}
					</div>

					<div className="bg-[#0d1117] flex items-center justify-center rounded mb-4">
						<h2 className="m-0 py-2">{currentQuiz.name}</h2>
					</div>
					<div className='bg-[#000000]' style={{ width: '100%', height: '400px', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', padding: '2.5%' }}>
						<h1 style={{ display: 'inline', fontSize: '1.15vw' }}>{currentQuiz.questions[number].explanation.explain}</h1>
					</div>
					<div className='choice' style={{ width: '100%', height: '285px', marginTop: '20px' }}>

						{currentQuiz.questions[number].type !== 'fill-choice' ? (
							<div style={{ width: '100%', height: '100%' }}>
								<div className='row1' style={{ width: '100%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
									<button onClick={(e) => handleChangeUserAnswers(e, number, currentQuiz.questions[number].type)} value={0} style={{ height: '70%', width: '30%', backgroundColor: '#0d1117', borderRadius: '10px', fontSize: '0.75vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px', overflow: 'hidden' }}>{currentQuiz.questions[number].answer.selectAnswers[0].explain}</button>
									<button onClick={(e) => handleChangeUserAnswers(e, number, currentQuiz.questions[number].type)} value={1} style={{ height: '75%', width: '30%', backgroundColor: '#0d1117', borderRadius: '10px', fontSize: '0.75vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px', overflow: 'hidden' }}>{currentQuiz.questions[number].answer.selectAnswers[1].explain}</button>
								</div>
								<div className='row2' style={{ width: '100%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
									<button onClick={(e) => handleChangeUserAnswers(e, number, currentQuiz.questions[number].type)} value={2} style={{ height: '70%', width: '30%', backgroundColor: '#0d1117', borderRadius: '10px', fontSize: '0.75vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px', overflow: 'hidden' }}>{currentQuiz.questions[number].answer.selectAnswers[2].explain}</button>
									<button onClick={(e) => handleChangeUserAnswers(e, number, currentQuiz.questions[number].type)} value={3} style={{ height: '75%', width: '30%', backgroundColor: '#0d1117', borderRadius: '10px', fontSize: '0.75vw', wordWrap: 'break-word', paddingLeft: '4px', paddingRight: '4px', overflow: 'hidden' }}>{currentQuiz.questions[number].answer.selectAnswers[3].explain}</button>
								</div>
							</div>
						) : (
							<div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
								<input
									type="text"
									placeholder="Type your answer..."
									className="w-full border border-[#585e65] bg-inherit outline-none py-2 px-6 rounded"
									value={userAnswers[number] || ''}
									onChange={(e) => handleChangeUserAnswers(e, number, currentQuiz.questions[number].type)}
								/>
							</div>
						)
						}
					</div>

					<button className="bg-[#238636] rounded py-2 mt-3" onClick={handleSubmit}>
						ส่ง
					</button>
				</div>
			)
			}
		</div >
	)
}