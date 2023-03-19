import client from '../Client'

export async function registerAuthUser(requestBody) {
	const res = await client.post('/auth/signup', requestBody)
	return res
}

export async function loginWithEmail(requestBody) {
	const res = await client.post('/auth/login', requestBody)
	return res
}
