import client from '../Client'

export async function uploadUserProfile(token, postData) {
	const res = await client.post('/file/upload/profile-image', postData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}
