import "./style.css";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getTimerLabel } from "../../utils/functions/timer";
import { anonymousFullName, onErrorQuizImageUrl, svgMap } from "../../config/constraints";

export default function QuizCard({
  index,
  quiz,
  editHandler,
  deployHandler,
  takeQuizHandler,
  enableQuizTimer,
}) {

=======
import { ReactComponent as UserSvg } from "../../assets/svg/user.svg";
import { ReactComponent as TaskSvg } from "../../assets/svg/task.svg";
import { ReactComponent as CodeQuizSvg } from "../../assets/svg/code_quiz.svg";
import { ReactComponent as HideSvg } from "../../assets/svg/hide.svg";
import { ReactComponent as ShowSvg } from "../../assets/svg/show.svg";
import { ReactComponent as TimerWhiteSvg } from "../../assets/svg/timer_white.svg";

import { useNavigate } from "react-router-dom";

export default function QuizCard({ index, quiz, editHandler, deployHandler, takeQuizHandler }) {
  const navigate = useNavigate();

  const onErrorQuizImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118138703580237844/image.png";
  const anonymousFullName = "Anonymous";
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76

  function getDurationLabel() {
    let label = "";
    if (quiz.duration.hours > 0) {
      label += `${quiz.duration.hours} Hours `;
    }
    if (quiz.duration.minutes > 0) {
      label = `${label} ${quiz.duration.minutes} Minutes`;
    }
    return label;
  }

<<<<<<< HEAD
  const [timerLabel, setTimerLabel] = useState(
    enableQuizTimer ? getTimerLabel(quiz.expiredAt) : getDurationLabel()
  );

  useEffect(() => {
    let intervalId;

    if (enableQuizTimer) {
      intervalId = setInterval(() => {
        setTimerLabel(getTimerLabel(quiz.expiredAt));
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [enableQuizTimer, quiz.expiredAt]);


  return index === 0 ? (
    <div
      className="first__card"
      onClick={takeQuizHandler ? takeQuizHandler : () => {}}
    >
=======
  return index === 0 ? (
    <div className="first__card" onClick={takeQuizHandler ? takeQuizHandler : ()=>{}}>
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
      <div className="quiz__image">
        <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
      </div>
      <div className="quiz__info">
        <p className="quiz__title">{quiz.name}</p>
        <p className="quiz__description">{quiz.description}</p>
        <div className="quiz__deep__info">
          <div className="author">
<<<<<<< HEAD
            {svgMap.user}
            {quiz.user?.fullname || anonymousFullName}
          </div>
          <div className="total__task">
            {svgMap.task}
            {quiz.questions.length} Tasks
          </div>
          {quiz.codeJoin ? (
            <div className="join__code">
              {svgMap.code_quiz}
              {quiz.codeJoin}
            </div>
          ) : null}
          {quiz.hideCorrectAnswer ? (
            <div className="hide__show__correct__answer">
              {svgMap.hide}
=======
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
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
              Hide Correct Answers
            </div>
          ) : (
            <div className="hide__show__correct__answer">
<<<<<<< HEAD
              {svgMap.show}
=======
              <ShowSvg />
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
              Show Correct Answers
            </div>
          )}
          <div className="timer__info">
<<<<<<< HEAD
              {svgMap.timer_white}
              {timerLabel}
            </div>
          {editHandler && deployHandler ? (
            <div className="action__button">
              <button
                className="action__button__edit"
                onClick={() => {
                  editHandler(quiz);
                }}
              >
                Edit
              </button>
              <button
                className="action__button__delete"
                onClick={() => {
                  deployHandler(quiz);
                }}
              >
                Deploy
              </button>
            </div>
          ) : null}
=======
            <TimerWhiteSvg />
            {getDurationLabel()}
          </div>

          {editHandler && deployHandler ? <div className="action__button">
          <button className="action__button__edit" onClick={()=>{
              editHandler(quiz)
            }}>
              Edit
            </button>
            <button className="action__button__delete" onClick={()=>{
              deployHandler(quiz)
            }}>
              Deploy
            </button>
          </div> : null}
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
        </div>
      </div>
    </div>
  ) : (
<<<<<<< HEAD
    <div
      className="quiz__card"
      onClick={takeQuizHandler ? takeQuizHandler : () => {}}
    >
=======
    <div className="quiz__card" onClick={takeQuizHandler ? takeQuizHandler : ()=>{}}> 
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
      <div className="quiz__image">
        <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
      </div>
      <div className="quiz__info">
        <p className="quiz__title">{quiz.name}</p>
        <p className="quiz__description">{quiz.description}</p>
        <div className="quiz__deep__info">
          <div className="author">
<<<<<<< HEAD
            {svgMap.user}
            {quiz.user?.fullname || anonymousFullName}
          </div>
          <div className="total__task">
            {svgMap.task}
            {quiz.questions.length} Tasks
          </div>
          {quiz.codeJoin ? (
            <div className="join__code">
              {svgMap.code_quiz}
              {quiz.codeJoin}
            </div>
          ) : null}
          {quiz.hideCorrectAnswer ? (
            <div className="hide__show__correct__answer">
              {svgMap.hide}
=======
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
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
              Hide Correct Answers
            </div>
          ) : (
            <div className="hide__show__correct__answer">
<<<<<<< HEAD
              {svgMap.show}
              Show Correct Answers
            </div>
          )}
           <div className="timer__info">
              {svgMap.timer_white}
              {timerLabel}
            </div>
          {editHandler && deployHandler ? (
            <div className="action__button">
              <button
                className="action__button__edit"
                onClick={() => {
                  editHandler(quiz);
                }}
              >
                Edit
              </button>
              <button
                className="action__button__delete"
                onClick={() => {
                  deployHandler(quiz);
                }}
              >
                Deploy
              </button>
            </div>
          ) : null}
=======
              <ShowSvg />
              Show Correct Answers
            </div>
          )}
          <div className="timer__info">
            <TimerWhiteSvg />
            {getDurationLabel()}
          </div>
          {editHandler && deployHandler ? <div className="action__button">
          <button className="action__button__edit" onClick={()=>{
              editHandler(quiz)
            }}>
              Edit
            </button>
            <button className="action__button__delete" onClick={()=>{
              deployHandler(quiz)
            }}>
              Deploy
            </button>
          </div> : null}
>>>>>>> 160bcadcc5155c5f274c7ff35353b1745e605b76
        </div>
      </div>
    </div>
  );
}
