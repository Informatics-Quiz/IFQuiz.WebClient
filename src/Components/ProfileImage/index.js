import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { uploadUserProfile } from '../../Services/upload'

export default function ProfileImage({ userProfileImage }) {
	const [renderImage, setRenderImage] = useState(null)
	const user = useSelector((state) => state.user.authUser)

	async function onImageChange(e) {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('profile-image', file)
		try {
			const res = await uploadUserProfile(user.token, formData)
			console.log(res)
			if (res.status === 201) {
				const renderImage = URL.createObjectURL(file)
				setRenderImage(renderImage)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="profile">
			<img
				className="circle-img align-self-center object-fit-contain"
				width="140"
				height="140"
				src={renderImage || userProfileImage}
				alt={`profile`}
			/>
			<div className="bc_img"></div>
			<input type="file" accept="image/*" onChange={onImageChange} className="choose" />
		</div>
	)
}
