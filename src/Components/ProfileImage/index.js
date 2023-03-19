import React, { useState, useEffect } from 'react'

export default function ProfileImage({ userProfileImage }) {
	const [images, setImages] = useState([])
	const [imageURLs, setImageURLs] = useState([])

	useEffect(() => {
		if (images.length < 1) return
		const newImageUrls = []
		images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)))
		setImageURLs(newImageUrls)
	}, [images])

	function onImageChange(e) {
		setImages([...e.target.files])
	}

	async function handleClickUpload() {
		console.log(images[0])
		const formData = new FormData()
		formData.append('image', images[0])
		console.log(formData)
	}

	return (
		<div className="profile">
			<div className="bc_img">
				<img
					className="circle-img align-self-center object-fit-contain"
					style={{ height: '142.5px', width: '142.5px' }}
					width="200"
					height="200"
					src={userProfileImage}
					alt={`profile-`}
				/>
				{/* {imageURLs ? (
					imageURLs.map((imageSrc, idx) => (
						<img
							className="circle-img align-self-center object-fit-contain"
							style={{ height: '142.5px', width: '142.5px' }}
							key={idx}
							width="200"
							height="200"
							src={imageSrc}
							alt={`profile-${idx}`}
						/>
					))
				) : (
					<div className="circle-img align-self-center" style={{ height: '142.5px', width: '142.5px' }}></div>
				)} */}
			</div>
			<input type="file" accept="image/*" onChange={onImageChange} className="choose" />
			<button onClick={handleClickUpload}>Upload</button>
		</div>
	)
}
