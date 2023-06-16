import "./style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../reducers/user";
import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import { ReactComponent as UserSvg } from "../../../assets/svg/user.svg";
import { ReactComponent as TaskSvg } from "../../../assets/svg/task.svg";
import { ReactComponent as CodeQuizSvg } from "../../../assets/svg/code_quiz.svg";
import { ReactComponent as HideSvg } from "../../../assets/svg/hide.svg";
import { ReactComponent as ShowSvg } from "../../../assets/svg/show.svg";
import { ReactComponent as TimerWhiteSvg } from "../../../assets/svg/timer_white.svg";

const Created = () => {
  const onErrorQuizImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118138703580237844/image.png";
  const onErrorProfileImageUrl = "https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png"
    const anonymousFullName = "Anonymous";

  const user = useSelector((state) => state.user);
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [editstatus, setEditStatus] = useState("");
  const [quizzesCreated, setQuizzesCreated] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClickNavigate(url) {
    navigate(url);
  }

  async function handleEditStatus() {
    const authToken = user.authUser.token;
    const response = await axios.patch(
      "http://localhost:3000/accounts/status",
      { status: editstatus },
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    );

    dispatch(setStatus(response.data.status));
    handleClose();
  }

  useEffect(() => {
  	async function onGetProfileImage() {
  		let headersList = {
  			Accept: '*/*',
  			Authorization: `Bearer ${user.authUser.token}`,
  		}

  		let reqOptions = {
  			responseType: 'arraybuffer',
  			url: 'http://localhost:3000/file/get/profile-image',
  			method: 'GET',
  			headers: headersList,
  		}

  		try {
  			let response = await axios.request(reqOptions)
  			const blob = new Blob([response.data], { type: response.headers['Content-Type'] })
  			const url = URL.createObjectURL(blob)
  			setProfileImageUrl(response.data.byteLength === 0 ? null : url)
  		} catch (error) {
  			console.log(error)
  		}
  	}

  	onGetProfileImage()
  }, [user])

  useEffect(() => {
    async function onGetQuizzes() {
      const response = await axios.get(`http://localhost:3000/quizzes?owned=${user.authUser._id}`);
      console.log(response)
      setQuizzesCreated(response.data);
    }
    onGetQuizzes();
  }, []);

  return (
    <>
        <Navbar />
        <ModalStatus
          show={show}
          handleClose={handleClose}
          status={user.authUser.status}
          setEditStatus={setEditStatus}
          handleEditStatus={handleEditStatus}
        />
      <div className="home__container">
        <div className="profile__container">
          <div className="profile__image">
            <img
              src={profileImageUrl || onErrorProfileImageUrl}
              alt="profile"
            />
          </div>
          <div className="profile__info">
            <p className="profile__info__fullname">{user.authUser.fullname}</p>
            <p className="profile__info__status">{user.authUser.status.length < 1 ? "Think nothing..." : user.authUser.status}</p>
            <div className="profile__info__settings">
              <button onClick={() => handleClickNavigate("user/edit")}>
                Edit Profile
              </button>
              <button onClick={handleShow}>Edit Status</button>
            </div>
          </div>
        </div>
        <div className="quizzes__container">
          {quizzesCreated.map((quiz, index) => {
            if (index === 0) {
              return (
                <div
                  className="first__card"
                >
                  <div className="quiz__image">
                    <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
                  </div>
                  <div className="quiz__info">
                    <p className="quiz__title">{quiz.name}</p>
                    <p className="quiz__description">{quiz.description}</p>
                    <div className="quiz__deep__info">
                      <div className="author">
                        <UserSvg />
                        {quiz.user?.fullname || anonymousFullName}
                      </div>
                      <div className="total__task">
                        <TaskSvg />
                        {quiz.questions.length} Tasks
                      </div>
                      <div className="join__code">
                        <CodeQuizSvg />
                        {quiz.codeJoin || "S8DXE7"}
                      </div>
                      {quiz.hideCorrectAnswer ? (
                        <div className="hide__show__correct__answer">
                          <HideSvg />
                          Hide Correct Answers
                        </div>
                      ) : (
                        <div className="hide__show__correct__answer">
                          <ShowSvg />
                          Show Correct Answers
                        </div>
                      )}
                      <div className="timer__info">
                        <TimerWhiteSvg />
                        1 Hours
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                className="quiz__card"
              >
                <div className="quiz__image">
                  <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
                </div>
                <div className="quiz__info">
                  <p className="quiz__title">{quiz.name}</p>
                  <p className="quiz__description">{quiz.description}</p>
                  <div className="quiz__deep__info">
                    <div className="author">
                      <UserSvg />
                      {quiz.user?.fullname || anonymousFullName}
                    </div>
                    <div className="total__task">
                      <TaskSvg />
                      {quiz.questions.length} Tasks
                    </div>
                    <div className="join__code">
                      <CodeQuizSvg />
                      {quiz.codeJoin || "S8DXE7"}
                    </div>
                    {quiz.hideCorrectAnswer ? (
                      <div className="hide__show__correct__answer">
                        <HideSvg />
                        Hide Correct Answers
                      </div>
                    ) : (
                      <div className="hide__show__correct__answer">
                        <ShowSvg />
                        Show Correct Answers
                      </div>
                    )}
                    <div className="timer__info">
                        <TimerWhiteSvg />
                        2 Hours 30 Minutes
                      </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Created;
