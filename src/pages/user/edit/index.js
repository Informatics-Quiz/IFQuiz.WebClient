import "./style.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../reducers/user";
import { useNavigate } from "react-router-dom";
import {
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} from "../../../services/user";

import ProfileImage from "../../../components/profile-image";
import ModalChangePassword from "../../../components/modals/change-password";
import ModalConfirmAction from "../../../components/modals/confirm-action";
import Notify from "../../../components/notify";
import HomeButton from "../../../components/button/home";
import Navbar from "../../../components/navbar";
import { svgMap } from "../../../config/constraints";

const EditUserProfile = () => {
  const user = useSelector((state) => state.user.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userProfileState, setUserProfileState] = useState({
    fullname: user.fullname,
    status: user.status,
    backgroundMusic: user.backgroundMusic,
    soundEffect: user.soundEffect,
  });

  const handleChangeProfileState = (e) => {
    const { name, value } = e.target;
    setUserProfileState({ ...userProfileState, [name]: value });
  };

  async function handleClickUpdateProfile() {
    if (!user.token) return;
    try {
      const res = await updateUserProfile(user.token, userProfileState);
      const { data } = res;
      const userProfile = {
        fullname: data.fullname,
        email: data.email,
        status: data.status,
        backgroundMusic: data.backgroundMusic,
        soundEffect: data.soundEffect,
      };
      dispatch(setUser({ ...user, ...userProfile }));
      navigate("/home");
    } catch (error) {
      showNotify("Something went wrong?", error.response.data.message);
    }
  }

  // Delete Account
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState(false);
  const [deleteAccountShow, setDeleteAccountShow] = useState(false);
  async function handleTriggerDeleteAccount() {
    if (!user.token) return;
    try {
      const res = await deleteUserAccount(user.token);
      const { data } = res;
      showNotify("Finally success your action!", data.message);
      setDeleteAccountSuccess(true)
    } catch (error) {
      showNotify("Something went wrong?", error.response.data.message);
    }
  }

  // Notify
  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  const showNotify = (title, message) => {
    setNotify({
      title: title,
      show: true,
      message: message,
    });
  }
  function closeNotify() {
    setNotify({
      title: "",
      show: false,
      message: "",
    });
    if (newPasswordUpdateSuccess) {
      dispatch(setUser(null));
      navigate("/login/email");
    }
    if(deleteAccountSuccess){
      dispatch(setUser(null));
      navigate("/");
    }
  }

  // Change Password
  const [newPasswordUpdateSuccess, setNewPasswordUpdateSuccess] =
    useState(false);
  const [changePasswordShow, setChangePasswordShow] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password: null,
  });
  const [newPasswordConfirm, setNewPasswordConfirm] = useState({
    password: null,
  });
  const handleCloseChangePasswordShow = () => setChangePasswordShow(false);
  const handleChangePasswordShow = () => setChangePasswordShow(true);
  const handleChangePassword = (e) => {
    const { value } = e.target;
    setNewPassword({
      password: value,
    });
  };
  const handleChangeConfirmPassword = (e) => {
    const { value } = e.target;
    setNewPasswordConfirm({
      password: value,
    });
  };
  function validateStrongPassword(password) {
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password);
  }
  function validateNewPassword() {
    if (!newPassword.password || !newPasswordConfirm.password) {
      // pls input some text
      showNotify(
        "Something went wrong?",
        "Password must not be empty in both fields"
      );
      return false;
    }
    if (newPassword.password !== newPasswordConfirm.password) {
      // password not match
      showNotify("Something went wrong?", "Password not match in both fields");
      return false;
    }
    if (!validateStrongPassword(newPassword.password)) {
      // password not strong
      showNotify(
        "Something went wrong?",
        "Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
      );
      return false;
    }
    return true;
  }
  async function handleClickUpdatePassword() {
    if (!user.token) return;
    if (!validateNewPassword()) {
      return;
    }

    try {
      const res = await updateUserPassword(user.token, newPassword);
      const { data } = res;
      handleCloseChangePasswordShow();
      closeNotify();
      setNewPasswordUpdateSuccess(true);
      showNotify("Finally success your action!", data.message);
    } catch (error) {
      showNotify("Something went wrong?", error.response.data.message);
    }
  }

  return (
    <>
      <Notify
        show={notify.show}
        title={notify.title}
        handleClose={closeNotify}
        message={notify.message}
      />
      <ModalChangePassword
        show={changePasswordShow}
        handleClose={handleCloseChangePasswordShow}
        handleChangePassword={handleChangePassword}
        handleChangeConfirmPassword={handleChangeConfirmPassword}
        handleClickUpdatePassword={handleClickUpdatePassword}
      />

      {/* Modal Delete Account */}
      <ModalConfirmAction
        show={deleteAccountShow}
        colorStyle={"error_color"}
        svgEnum={"trash_bin"}
        title={"Account deletion request"}
        description={"You will loss of all associated data"}
        buttonConfirmLabel={"SURE, DELETE IT"}
        handleConfirm={handleTriggerDeleteAccount}
        handleCancel={()=> setDeleteAccountShow(false)}
      />
      <Navbar />

      <div className="edit__profile__container">
        <div className="page__header">
          <div className="page__svg">
            {svgMap.edit_user}
          </div>
          <div className="page__info">
            <p className="page__title">Editing your profile</p>
            <p className="page__description">Just settings what you want!</p>
          </div>
        </div>
        
        {/* <button
          className="back__home__button"
          onClick={() => navigate("/home")}
        >
          <svg width="24" height="19" viewBox="0 0 24 19" fill="none">
            <path
              d="M11.6818 4.84171L4.00032 11.1683V17.9965C4.00032 18.1733 4.07055 18.3429 4.19556 18.4679C4.32058 18.5929 4.49013 18.6631 4.66693 18.6631L9.33574 18.6511C9.51196 18.6502 9.68066 18.5796 9.80495 18.4546C9.92925 18.3297 9.99902 18.1607 9.99902 17.9844V13.9968C9.99902 13.82 10.0693 13.6505 10.1943 13.5255C10.3193 13.4005 10.4888 13.3302 10.6656 13.3302H13.3321C13.5089 13.3302 13.6785 13.4005 13.8035 13.5255C13.9285 13.6505 13.9987 13.82 13.9987 13.9968V17.9815C13.9984 18.0692 14.0155 18.1562 14.0489 18.2373C14.0822 18.3184 14.1313 18.3921 14.1932 18.4542C14.2552 18.5164 14.3287 18.5657 14.4097 18.5993C14.4908 18.6329 14.5776 18.6502 14.6653 18.6502L19.3325 18.6631C19.5093 18.6631 19.6788 18.5929 19.8038 18.4679C19.9289 18.3429 19.9991 18.1733 19.9991 17.9965V11.1637L12.3193 4.84171C12.229 4.76893 12.1165 4.72925 12.0005 4.72925C11.8846 4.72925 11.7721 4.76893 11.6818 4.84171ZM23.8155 9.14179L20.3324 6.27077V0.499961C20.3324 0.367363 20.2797 0.240196 20.186 0.146435C20.0922 0.0526745 19.965 0 19.8324 0H17.4993C17.3667 0 17.2395 0.0526745 17.1457 0.146435C17.052 0.240196 16.9993 0.367363 16.9993 0.499961V3.52514L13.2692 0.456215C12.9112 0.161646 12.462 0.000588848 11.9984 0.000588848C11.5349 0.000588848 11.0857 0.161646 10.7277 0.456215L0.181444 9.14179C0.130818 9.18364 0.0889323 9.23505 0.0581813 9.29309C0.0274303 9.35112 0.00841634 9.41465 0.00222573 9.48004C-0.00396488 9.54543 0.00278923 9.6114 0.0221021 9.67417C0.041415 9.73695 0.0729083 9.79531 0.114782 9.84591L1.1772 11.1375C1.21896 11.1883 1.27033 11.2303 1.32835 11.2612C1.38638 11.2921 1.44994 11.3113 1.51538 11.3176C1.58082 11.3239 1.64686 11.3172 1.70973 11.298C1.77259 11.2787 1.83104 11.2473 1.88173 11.2054L11.6818 3.13351C11.7721 3.06073 11.8846 3.02105 12.0005 3.02105C12.1165 3.02105 12.229 3.06073 12.3193 3.13351L22.1198 11.2054C22.1704 11.2473 22.2287 11.2788 22.2915 11.2981C22.3543 11.3174 22.4202 11.3241 22.4856 11.3179C22.551 11.3118 22.6145 11.2927 22.6726 11.262C22.7306 11.2312 22.782 11.1894 22.8239 11.1387L23.8863 9.84716C23.9281 9.79626 23.9595 9.73761 23.9786 9.67455C23.9976 9.6115 24.0041 9.5453 23.9975 9.47975C23.9909 9.4142 23.9714 9.3506 23.9402 9.29261C23.909 9.23461 23.8666 9.18336 23.8155 9.14179Z"
              fill="white"
            />
          </svg>
          <p>Home</p>
        </button> */}
        <div className="settings__container">
          <ProfileImage
          notify={showNotify}
          />
          <div className="settings__identity__form">
            <div className="fullname__field">
              <p>Display Name</p>
              <input
                name="fullname"
                type="text"
                placeholder={user.fullname}
                onChange={handleChangeProfileState}
              ></input>
            </div>
            <div className="status__field">
              <p>Status</p>
              <input
                name="status"
                type="text"
                placeholder={user.status}
                onChange={handleChangeProfileState}
              ></input>
            </div>
          </div>
          <div className="settings__security__form">
            <div className="security__header">
              {svgMap.security}
              <p>Security</p>
            </div>
            <div className="button__action__contianer">
              <div className="svg__with__button">
                <div className="svg__icon">
                  {svgMap.change_password}
                </div>
                <div
                  className="button__label"
                  onClick={handleChangePasswordShow}
                >
                  Change Password
                </div>
              </div>
              <div className="svg__with__button">
                <div className="svg__icon">
                  {svgMap.delete}
                </div>
                <div className="button__label"
                  onClick={() => setDeleteAccountShow(true)}
                >Delete Account</div>
              </div>
            </div>
          </div>
          <button className="save__button" onClick={handleClickUpdateProfile}>
            SAVE
          </button>
        </div>
      </div>
      <HomeButton
          navigate={navigate}
        />
    </>
  );
};

export default EditUserProfile;
