import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { uploadUserProfile } from '../../Services/upload'
import './style.css'

export default function ProfileImage({ userProfileImage, firstLetter }) {
	const [renderImage, setRenderImage] = useState(null)
	const user = useSelector((state) => state.user.authUser)
	const onErrorProfileImageUrl = 'https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png'
	async function onImageChange(e) {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('profile-image', file)
		try {
			const res = await uploadUserProfile(user.token, formData)
			if (res.status === 201) {
				const renderImage = URL.createObjectURL(file)
				setRenderImage(renderImage)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="profile-image-container">
			<div className="image-container">
				{!renderImage && !userProfileImage ? (
					<img src={onErrorProfileImageUrl} alt="profile" />
				) : (
					<img src={renderImage || userProfileImage} alt="profile" />
				)}
			</div>

			<label htmlFor="file-upload" className="custom-file-upload">
				Upload
			</label>
			<input id="file-upload"  type="file" accept="image/*" onChange={onImageChange} />
		</div>
	)
}
