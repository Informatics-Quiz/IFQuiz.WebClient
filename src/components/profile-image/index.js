import "./style.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserProfile } from "../../services/upload";
import { onErrorProfileImageUrl } from "../../config/constraints";

export default function ProfileImage({notify}) {
  const [renderImage, setRenderImage] = useState(null);
  const user = useSelector((state) => state.user.authUser);
  async function onImageChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profile-image", file);
    try {
      const res = await uploadUserProfile(user.token, formData);
      if (res.status === 201) {
        const renderImage = URL.createObjectURL(file);
        setRenderImage(renderImage);
      }
    } catch (error) {
		notify("Something went wrong?", error.response.data.message)
    }
  }

  return (
    <>
      <div className="profile-image-container">
        <div className="image-container">
          <img
            src={renderImage || user.imageUrl || onErrorProfileImageUrl}
            alt="profile"
          />
        </div>

        <label htmlFor="file-upload" className="custom-file-upload">
          Upload
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
    </>
  );
}
