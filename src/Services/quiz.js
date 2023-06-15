import client from '../Client'

export async function uploadQuiz(token, requestBody) {
	const res = await client.post('/quizzes/create', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	console.log(requestBody)
	return res
}

export async function getQuizzes() {
	const res = await client.get('/quizzes')
	return res
}

export async function getQuizById(id) {
	const res = await client.get(`/quizzes/${id}`)
	return res
}


export async function getQuizByCode(codeJoin){
	const res = await client.get(`/quizzes?codeJoin=${codeJoin}`)
	return res
}

export async function sendQuiz(token, requestBody) {
	const res = await client.post('/check_quizz', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}