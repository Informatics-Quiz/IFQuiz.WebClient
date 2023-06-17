import "./style.css";

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

  return index === 0 ? (
    <div className="first__card" onClick={takeQuizHandler ? takeQuizHandler : ()=>{}}>
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
        </div>
      </div>
    </div>
  ) : (
    <div className="quiz__card" onClick={takeQuizHandler ? takeQuizHandler : ()=>{}}> 
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
        </div>
      </div>
    </div>
  );
}
