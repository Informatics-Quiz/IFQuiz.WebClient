import client from '../client'

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

export async function getUserProfileImage(token, handlerSetUserImageUrl) {
	const res = await client.get('/file/get/profile-image', {
		responseType: 'arraybuffer',
		headers: {
			Authorization: `Bearer ${token}`,
		}
	})
	const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
	const url = URL.createObjectURL(blob)
	handlerSetUserImageUrl(url)
}

export async function updateUserStatus(token, status) {
	const res = await client.patch('/accounts/status', {
		status: status
	},
	{
		headers: {
			Authorization:`Bearer ${token}`
		}
	})
	return res
}