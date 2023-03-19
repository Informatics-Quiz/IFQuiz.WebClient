import client from '../Client'

export default async function updateUserProfile(token, bodyRequest) {
	const res = await client.patch('/accounts/edit', bodyRequest, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}
