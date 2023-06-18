import "./style.css";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { uploadUserProfile } from "../../services/upload";
import { onErrorProfileImageUrl } from "../../config/constraints";

export default function ProfileImage({notify}) {
  const [renderImage, setRenderImage] = useState(null);
  const user = useSelector((state) => state.user.authUser);
  const [profileImageUrl, setProfileImageUrl] = useState("");
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

  useEffect(() => {
    async function onGetProfileImage() {
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${user.token}`,
      };

      let reqOptions = {
        responseType: "arraybuffer",
        url: "http://localhost:3000/file/get/profile-image",
        method: "GET",
        headers: headersList,
      };

      try {
        let response = await axios.request(reqOptions);
        const blob = new Blob([response.data], {
          type: response.headers["Content-Type"],
        });
        const url = URL.createObjectURL(blob);
        setProfileImageUrl(response.data.byteLength === 0 ? null : url);
      } catch (error) {
		notify("Something went wrong?", error.response.data.message)
      }
    }

    onGetProfileImage();
  }, [user]);


  return (
    <>
      <div className="profile-image-container">
        <div className="image-container">
          <img
            src={renderImage || profileImageUrl || onErrorProfileImageUrl}
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
