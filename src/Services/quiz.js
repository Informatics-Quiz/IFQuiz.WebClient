import client from '../Client'

export async function uploadQuiz(token, requestBody) {
	const res = await client.post('/quizzes/create', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
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


export async function sendQuiz(token, requestBody) {
	const res = await client.post('/check_quizz', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}