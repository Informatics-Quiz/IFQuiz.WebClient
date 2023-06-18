import "./style.css";

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
      <div className="quiz__image">
        <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
      </div>
      <div className="quiz__info">
        <p className="quiz__title">{quiz.name}</p>
        <p className="quiz__description">{quiz.description}</p>
        <div className="quiz__deep__info">
          <div className="author">
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
              Hide Correct Answers
            </div>
          ) : (
            <div className="hide__show__correct__answer">
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
        </div>
      </div>
    </div>
  ) : (
    <div
      className="quiz__card"
      onClick={takeQuizHandler ? takeQuizHandler : () => {}}
    >
      <div className="quiz__image">
        <img src={quiz.imageUrl || onErrorQuizImageUrl}></img>
      </div>
      <div className="quiz__info">
        <p className="quiz__title">{quiz.name}</p>
        <p className="quiz__description">{quiz.description}</p>
        <div className="quiz__deep__info">
          <div className="author">
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
              Hide Correct Answers
            </div>
          ) : (
            <div className="hide__show__correct__answer">
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
        </div>
      </div>
    </div>
  );
}
