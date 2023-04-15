import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { uploadUserProfile } from '../../Services/upload'
import './style.css'

export default function ProfileImage({ userProfileImage, firstLetter }) {
	const [renderImage, setRenderImage] = useState(null)
	const user = useSelector((state) => state.user.authUser)

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
					<div className="profile-image-null">
						<h1>{firstLetter}</h1>
					</div>
				) : (
					<img src={renderImage || userProfileImage} alt="profile" />
				)}
			</div>
			<label for="file-upload" class="custom-file-upload">
				Upload
			</label>
			<input id="file-upload" type="file" accept="image/*" onChange={onImageChange} />
		</div>
	)
}
