import "./style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../reducers/user";
import { getUserProfile, updateUserStatus } from "../../../services/user";
import { getQuizzes, getQuizCoverImage } from "../../../services/quiz";


import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";

const Home = () => {

  const user = useSelector((state) => state.user);
  const onErrorProfileImageUrl = "https://media.discordapp.net/attachments/1115338683671908462/1118152638756827166/image.png"
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
    const response = await updateUserStatus(user.authUser.token, editstatus);
    dispatch(setStatus(response.data.status));
    handleClose();
  }

  useEffect(() => {
  	async function onGetProfileImage() {
  		try {
        const res = await getUserProfile(user.authUser.token)
  			const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
  			const url = URL.createObjectURL(blob)
  			setProfileImageUrl(res.data.byteLength === 0 ? null : url)
  		} catch (error) {
        showNotify("Something went wrong?", error.response.data.message)
  		}
  	}

  	onGetProfileImage()
  }, [user])


  async function setImageCoverQuizzes(quizzes){
    let initializedQuiz = quizzes
    for(let quiz of initializedQuiz){
      if(quiz.imageUrl != null && quiz.imageUrl != ""){
        const res = await getQuizCoverImage(quiz.imageUrl)
        const blob = new Blob([res.data], { type: res.headers['Content-Type'] })
  			const url = URL.createObjectURL(blob)
        quiz.imageUrl = res.data.byteLength === 0 ? null : url
      }
    }
    return initializedQuiz
  }
  useEffect(() => {
    async function onGetQuizzes() {
      const response = await getQuizzes(user.authUser.token)
      const initializedQuiz = await setImageCoverQuizzes(response.data)
      setQuizzesCreated(initializedQuiz);
    }
    onGetQuizzes();
  }, []);



  // Notify
	const [notify, setNotify] = useState({
		show: false,
		title: "",
		message: ""
	  }); 
	  function showNotify(title, message) {
		setNotify({
			title: title,
			show: true,
			message: message
		})
	  }
	  function closeNotify() {
		setNotify({
			title: "",
			show: false,
			message: ""
		})
	}


  
  function editHandler(quiz){
    const quizId = quiz._id
    if(!quizId){
      showNotify("Something went wrong?", "Quiz not found!")
      return
    }
    navigate('/quiz/edit/' + quizId)
  }

  function deployHandler(quizId){
    
  }

  return (
    <>
    <Notify
				show={notify.show}
				title={notify.title}
				handleClose={closeNotify}
				message={notify.message}
			/>
      <ModalStatus
          show={show}
          handleClose={handleClose}
          status={user.authUser.status}
          setEditStatus={setEditStatus}
          handleEditStatus={handleEditStatus}
        />
        <Navbar />
        
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
              <button onClick={() => handleClickNavigate("/user/edit")}>
                Edit Profile
              </button>
              <button onClick={handleShow}>Edit Status</button>
            </div>
          </div>
        </div>
        <div className="quizzes__container">
          {quizzesCreated.map((quiz, index) => {
            return <QuizCard
              index={index}
              quiz={quiz}
              takeQuizHandler={() => handleClickNavigate("/quiz/" + quiz._id)}
            />
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
