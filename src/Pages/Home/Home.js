import "./Home.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../Reducers/userReducer";
import ModalStatus from "../../Components/ModalStatus";
import QuizCard from "../../Components/QuizCard";
import Navbar from "../../Components/Navbar";
import { ReactComponent as UserSvg } from "../../Assets/svg/user.svg";
import { ReactComponent as TaskSvg } from "../../Assets/svg/task.svg";
import { ReactComponent as CodeQuizSvg } from "../../Assets/svg/code_quiz.svg";
import { ReactComponent as HideSvg } from "../../Assets/svg/hide.svg";
import { ReactComponent as ShowSvg } from "../../Assets/svg/show.svg";

const Home = () => {
  const onErrorQuizImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118138703580237844/image.png";
  const onUserProfileImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png";
  const anonymousFullName = "Anonymous";

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [editstatus, setEditStatus] = useState("");
  const [quizzes, setQuizzes] = useState([]);

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

  // useEffect(() => {
  // 	async function onGetProfileImage() {
  // 		let headersList = {
  // 			Accept: '*/*',
  // 			Authorization: `Bearer ${user.authUser.token}`,
  // 		}

  // 		let reqOptions = {
  // 			responseType: 'arraybuffer',
  // 			url: 'http://localhost:3000/file/get/profile-image',
  // 			method: 'GET',
  // 			headers: headersList,
  // 		}

  // 		try {
  // 			let response = await axios.request(reqOptions)
  // 			const blob = new Blob([response.data], { type: response.headers['Content-Type'] })
  // 			const url = URL.createObjectURL(blob)
  // 			setProfileImage(response.data.byteLength === 0 ? null : url)
  // 		} catch (error) {
  // 			console.log(error)
  // 		}
  // 	}

  // 	onGetProfileImage()
  // }, [user])

  useEffect(() => {
    async function onGetQuizzes() {
      const response = await axios.get("http://localhost:3000/quizzes");
      setQuizzes(response.data);
    }
    onGetQuizzes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home__container">
        <div className="profile__container">
          <div className="profile__image">
            <img
              src={user.authUser.imageUrl || onUserProfileImageUrl}
              alt="profile"
            />
          </div>
          <div className="profile__info">
            <p className="profile__info__fullname">Jakkrit Chaopron</p>
            <p className="profile__info__status">🧠 doing some test ...</p>
            <div className="profile__info__settings">
              <button onClick={() => handleClickNavigate("/EditUserProfile")}>
                Edit Profile
              </button>
              <button onClick={handleShow}>Edit Status</button>
            </div>
          </div>
        </div>
        <div className="quizzes__container">
          {quizzes.map((quiz, index) => {
            if (index == 0) {
              return (
                <div
                  className="first__card"
                  onClick={() => navigate(`/Quiz/${quiz._id}`)}
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
                        S8DXE7
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
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div 
              className="quiz__card" 
              onClick={() => navigate(`/Quiz/${quiz._id}`)}
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
                        S8DXE7
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ModalStatus
          show={show}
          handleClose={handleClose}
          status={user.authUser.status}
          setEditStatus={setEditStatus}
          handleEditStatus={handleEditStatus}
        />
      </div>
      {/*       
      <div className="home-container">
        <div className="home-sidebar">
          <div className="home-profile">
            <div className="profile-image-container">
              {!user.authUser.imageUrl ? (
                <div className="profile-image-null">
                  <h1>{user.authUser.fullname[0]}</h1>
                </div>
              ) : (
                <img src={user.authUser.imageUrl} alt="profile" />
              )}
            </div>
            <div className="profile-desc-container">
              <p className="profile__name">{user.authUser.fullname}</p>
              <p className="under__description">{user.authUser.status}</p>
              <button onClick={() => handleClickNavigate("/EditUserProfile")}>
                Edit profile
              </button>
              <button onClick={handleShow}>Edit Status</button>
            </div>
          </div>
          <div className="find-quiz-container">
            <h4>Find Quiz</h4>
            <input placeholder="Enter code"></input>
            <button>JOIN</button>
          </div>
          <div className="make-quiz-container">
            <h4>Make a Quiz</h4>
            <button onClick={() => handleClickNavigate("/CreateQuiz")}>
              CREATE
            </button>
          </div>
        </div>

       

      </div> */}
    </>
  );
};

export default Home;
