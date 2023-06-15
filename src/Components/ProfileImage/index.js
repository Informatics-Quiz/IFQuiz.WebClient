import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { uploadUserProfile } from "../../Services/upload";
import "./style.css";

export default function ProfileImage({notify}) {
  const [renderImage, setRenderImage] = useState(null);
  const user = useSelector((state) => state.user.authUser);
  const onErrorProfileImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png";
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
