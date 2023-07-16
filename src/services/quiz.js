import client from '../client'

export async function uploadQuiz(token, requestBody) {
	const res = await client.post('/quizzes/create', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}

export async function updateQuiz(token, quiz, quizId){
	const res = await client.put(`/quizzes/${quizId}`, quiz, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}

export async function deployQuiz(deployData, token){
	const res = await client.post('/quizzes/deploy', deployData, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getDeployedQuizById(quizId, token){
	const res = await client.get(`/quizzes/deployed?quizId=${quizId}`,{
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getDeployedQuizByCodeJoin(codeJoin, token){
	const res = await client.get(`/quizzes/deployed?codeJoin=${codeJoin}`,{
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	
	return res
}

export async function getDeployedQuizzes(token) {
	const res = await client.get('/quizzes/deployed', {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getSummarizedQuizzes(token){
	const res = await client.get('/quizzes/summarized', {
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

export async function getCompletedQuizzes(token){
	const res = await client.get(`/quizzes/completed`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function submitQuiz(token, quizId){
	const res = await client.post(`/quizzes/take/submit`, {
		quizId: quizId
	},{
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	return res.data
}

export async function getCompletedQuiz(quizId, token){
	const res = await client.get(`/quizzes/completed?quizId=${quizId}`,{
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getQuizRunning(token){
	const res = await client.get(`quizzes/running`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}

export async function getSummarizedQuiz(id, token){

	const res = await client.get(`quizzes/summarized/quiz/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	return res
}


export async function getQuizCoverImage(imageUrl){
	const res = await client.get(`/file/get/quiz-cover-image?imageUrl=${imageUrl}`, {
		responseType: 'arraybuffer',
	})
	return res
}

export async function getQuestionImage(imageUrl){
	const res = await client.get(`/file/get/question-image?imageUrl=${imageUrl}`, {
		responseType: 'arraybuffer',
	})
	return res
}

export async function takeQuiz(deployedQuizId, token){
	const res = await client.get(`/quizzes/take?quizId=${deployedQuizId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	return res.data
}

export async function updateTakeQuizAnswers(token, requestBody){
	const res = await client.post(`/quizzes/take/update-answer`,requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})

	return res.data
}

export async function deleteQuiz(quizId, token) {
	const res = await client.delete(`/quizzes/${quizId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	return res
}