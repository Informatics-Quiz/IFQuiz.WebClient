import client from '../client'

export async function uploadUserProfile(token, postData) {
	const res = await client.post('/file/upload/profile-image', postData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}


export async function uploadQuizCoverImage(token, postData) {
	const res = await client.post('/file/upload/quiz-cover-image', postData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}