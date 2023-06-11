import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getQuizById } from '../../Services/quiz'
import { useDispatch } from 'react-redux'
import { setCurrentQuiz } from '../../Reducers/quizReducer'

export default function Quiz() {
	const { id } = useParams()
	const [quiz, setQuiz] = useState(null)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		async function onGetQuiz() {
			dispatch(setCurrentQuiz(null))
			if (!id) return
			try {
				const res = await getQuizById(id)
				console.log(res.data)
				setQuiz(res.data)
			} catch (error) {
				console.log(error)
			}
		}

		onGetQuiz()
	}, [id, dispatch])

	const navigateToTakeQuiz = (quiz) => {
		dispatch(setCurrentQuiz(quiz))
		navigate(`/Quiz/Take`)
	}

	if (!quiz) return null
	return (
		<div className="p-6 w-[600px] mx-auto text-center">
			<h2>
				{quiz.name} ({quiz.questions.length} Tasks)
			</h2>
			<h5>{quiz.description}</h5>
			<img
				src="https://img.freepik.com/free-vector/wild-nature-exploring-banner-template_23-2148943835.jpg"
				alt="quiz"
				width={'600px'}
				className="my-6"
			></img>
			<h5>Category: {quiz.category}</h5>
			<div>
				Created By: {quiz.user.fullname}
			</div>
			<button
				onClick={() => navigateToTakeQuiz(quiz)}
				className="px-5 py-3 bg-[#238636] rounded mt-3 hover:scale-[1.05] duration-200"
			>
				Take a quiz
			</button>


			{!quiz.hideCorrectAnswer ? (
				<div className='not__hide__correct_answer'>
					ข้อสอบนี้เป็นข้อสอบที่มีการเเสดงคำตอบที่ถูกต้อง
					<br/>
					สามารถดูคำตอบได้ในอีก <span className='timer__show__correct_answer'>10 ชั่วโมง 20 นาที 00 วินาที</span> 
				</div>
			) : (
				<div className='hide__correct_answer'>
					ข่อสอบนี้เป็นข้อสอบที่ไม่มีการเเสดงคำตอบที่ถูกต้อง
					<br/>
					<span className='timer__not__show__correct_answer'>ไม่สามารถดูคำตอบที่ถูกต้องได้</span> 
				</div>
			)}
			
		</div>
	)
}
