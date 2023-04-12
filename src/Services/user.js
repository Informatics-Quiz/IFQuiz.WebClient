import client from '../Client'

export async function updateUserProfile(token, bodyRequest) {
	const res = await client.patch('/accounts/edit', bodyRequest, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}

export async function updateUserPassword(token, bodyRequest) {
	const res = await client.patch('/accounts/change-password', bodyRequest, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}

export async function deleteUserAccount(token) {
	const res = await client.delete('/accounts', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	return res
}