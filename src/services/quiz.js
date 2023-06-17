import client from '../client'

export async function uploadQuiz(token, requestBody) {
	const res = await client.post('/quizzes/create', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}

export async function getQuizzes(token) {
	const res = await client.get('/quizzes', {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getQuizById(id) {
	const res = await client.get(`/quizzes/${id}`)
	return res
}


export async function getQuizByIdForEdit(id, token) {
	const res = await client.get(`/quizzes/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
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

export async function getOwnedQuiz(token) {
	const res = await client.get(`quizzes?owned=true`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}


export async function getQuizCoverImage(imageUrl){
	const res = await client.get(`/file/get/quiz-cover-image?imageUrl=${imageUrl}`, {
		responseType: 'arraybuffer',
	})
	return res
}