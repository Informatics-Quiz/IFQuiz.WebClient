import "./style.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeployedQuizById, getQuizCoverImage } from "../../../services/quiz";
import { useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../../reducers/quiz";
import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";

import { useSelector } from "react-redux";
import { getTimerLabel } from "../../../utils/functions/timer";
import { anonymousFullName, onErrorQuizImageUrl, svgMap } from "../../../config/constraints";

export default function Quiz() {
  const user = useSelector((state) => state.user);


  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [timerLabel, setTimerLabel] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function setImageCoverQuiz(quiz) {
    let initializedQuiz = quiz;
    try {
      if (initializedQuiz.imageUrl != null && initializedQuiz.imageUrl != "") {
        const res = await getQuizCoverImage(initializedQuiz.imageUrl);
        const blob = new Blob([res.data], {
          type: res.headers["Content-Type"],
        });
        const url = URL.createObjectURL(blob);
        initializedQuiz.imageUrl = res.data.byteLength === 0 ? null : url;
      }
      return initializedQuiz;
    } catch (e) {
      return quiz;
    }
  }

  useEffect(() => {
    async function onGetQuiz() {
      dispatch(setCurrentQuiz(null));
      if (!id) return;
      try {
        const res = await getDeployedQuizById(id, user.authUser.token);
        const finalQuiz = await setImageCoverQuiz(res.data);
        setQuiz(finalQuiz);
        setTimerLabel(getTimerLabel(finalQuiz.expiredAt))

      } catch (error) {
        showNotify("Something went wrong?", error.response.data.message, ()=>{
          navigate("/home");
        });
      }
    }

    onGetQuiz();
  }, [id, dispatch]);

  const navigateToTakeQuiz = (quiz) => {
    dispatch(setCurrentQuiz(quiz));
    navigate(`/quiz/take`);
  };

  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  function showNotify(title, message, cb) {
    setNotify({
      title: title,
      show: true,
      message: message,
      cb: cb
    });
  }
  function closeNotify() {
    setNotify({
      title: "",
      show: false,
      message: "",
      cb: null
    });
  }


  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      setTimerLabel(getTimerLabel(quiz?.expiredAt));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [quiz?.expiredAt]);

  return (
    <>
      <Notify
        show={notify.show}
        title={notify.title}
        handleClose={closeNotify}
        message={notify.message}
        cb={notify.cb}
      />
      <Navbar />
      {quiz ? (
        <div className="quiz__detail__container">
          <div className="quiz__detail__top">
            <div className="quiz__detail__image">
              <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
            </div>
            <div className="quiz__detail__paragraph">
              <div className="quiz__detail__title__and__description">
                <p className="title">{quiz.name}</p>
                <p className="description">{quiz.description}</p>
              </div>
              <div className="quiz__detail__deep__info">
                <p className="author">
                  {svgMap.user}
                  {quiz.user?.fullname || anonymousFullName}
                </p>
                <p className="total__task">
                  {svgMap.task}
                  {quiz.questions.length} Tasks
                </p>
                <p className="join__code">
                  {svgMap.code_quiz}
                  {quiz.codeJoin || "??????"}
                </p>
                {quiz.hideCorrectAnswer ? (
                  <p className="hide__show__correct__answer">
                    {svgMap.hide}
                    Hide Correct Answers
                  </p>
                ) : (
                  <p className="hide__show__correct__answer">
                    {svgMap.show}
                    Show Correct Answers
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            className="take__quiz__button"
            onClick={() => navigateToTakeQuiz(quiz)}
          >
            {svgMap.book}
            Take a Quiz
          </button>
          <div className="timer__detail__container">
            <p className="timer__animation">
              {svgMap.timer_blue}
              {timerLabel}
            </p>
            {quiz.hideCorrectAnswer ? (
              <p>
                This quiz not provides accurate answers, so you have to done
                before the duration.
              </p>
            ) : (
              <p>
                This quiz provides accurate answers, so you have to wait until
                the quiz duration is finished to see the correct answers.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
