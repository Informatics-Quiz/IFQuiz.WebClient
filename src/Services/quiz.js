import client from '../Client'

export async function uploadQuiz(token, requestBody) {
	const res = await client.post('/quizzes/create', requestBody, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}
