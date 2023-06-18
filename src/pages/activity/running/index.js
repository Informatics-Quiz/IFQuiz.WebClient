import "./style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStatus } from "../../../reducers/user";
import { getUserProfile, updateUserStatus } from "../../../services/user";
import { getOwnedQuiz, getQuizCoverImage, deployQuiz } from "../../../services/quiz";

import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import QuizCard from "../../../components/quiz-card";
import { ActivityHeader } from "../../../components/activity-header";
import { onErrorProfileImageUrl } from "../../../config/constraints";

import ModalStatus from "../../../components/modals/edit-status";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";

const Running = () => {

  const user = useSelector((state) => state.user);
  const [profileImageUrl, setProfileImageUrl] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [editstatus, setEditStatus] = useState("");
  const [quizzesRunning, setQuizzesRunning] = useState([]);

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
      const response = await getOwnedQuiz(user.authUser.token)
      const initializedQuiz = await setImageCoverQuizzes(response.data)
      setQuizzesRunning(initializedQuiz);
    }
    onGetQuizzes();
  }, []);



  // Notify
	const [notify, setNotify] = useState({
		show: false,
		title: "",
		message: "",
    cb: null
	  }); 
	  function showNotify(title, message, cb) {
		setNotify({
			title: title,
			show: true,
			message: message,
      cb: cb
		})
	  }
	  function closeNotify() {
		setNotify({
			title: "",
			show: false,
			message: "",
      cb: null
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

  async function deployHandler(quiz){
    const quizId = quiz._id
    if(!quizId){
      showNotify("Something went wrong?", "Quiz not found!")
      return
    }
    try{
      const response = await deployQuiz(quizId, user.authUser.token)
      showNotify("Deployed!", "Your quiz is now available for everyone to play!", ()=> {
        navigate('/quiz/' + response.data._id)
      })

    }catch(error){
      showNotify("Something went wrong?", error.response.data.message)
    }
  }

  return (
    <>
    <Notify
				show={notify.show}
				title={notify.title}
				handleClose={closeNotify}
				message={notify.message}
        cb={notify.cb}
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
          <ActivityHeader
            svg={"book"}
            label={"Running"}
          />
          {quizzesRunning.map((quiz, index) => {
            return <QuizCard
              index={index}
              quiz={quiz}
              editHandler={editHandler}
              deployHandler={deployHandler}
            />
          })}
        </div>
      </div>
    </>
  );
};

export default Running;
