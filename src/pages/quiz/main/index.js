import "./style.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../../services/quiz";
import { useDispatch } from "react-redux";
import { setCurrentQuiz } from "../../../reducers/quiz";
import { ReactComponent as UserSvg } from "../../../assets/svg/user.svg";
import { ReactComponent as TaskSvg } from "../../../assets/svg/task.svg";
import { ReactComponent as CodeQuizSvg } from "../../../assets/svg/code_quiz.svg";
import { ReactComponent as HideSvg } from "../../../assets/svg/hide.svg";
import { ReactComponent as ShowSvg } from "../../../assets/svg/show.svg";
import { ReactComponent as BookSvg } from "../../../assets/svg/book.svg";
import { ReactComponent as TimerBlueSvg } from "../../../assets/svg/timer_blue.svg";
import Navbar from "../../../components/navbar";

export default function Quiz() {
  const onErrorQuizImageUrl =
    "https://media.discordapp.net/attachments/1115338683671908462/1118138703580237844/image.png";
  const anonymousFullName = "Anonymous";

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function onGetQuiz() {
      dispatch(setCurrentQuiz(null));
      if (!id) return;
      try {
        const res = await getQuizById(id);
        console.log(res.data);
        setQuiz(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    onGetQuiz();
  }, [id, dispatch]);

  const navigateToTakeQuiz = (quiz) => {
    dispatch(setCurrentQuiz(quiz));
    navigate(`/quiz/take`);
  };

  if (!quiz) return null;
  return (
    <>
      <Navbar/>
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
                <UserSvg />
                {quiz.user?.fullname || anonymousFullName}
              </p>
              <p className="total__task">
                <TaskSvg />
                {quiz.questions.length} Tasks
              </p>
              <p className="join__code">
                <CodeQuizSvg />
                {quiz.codeJoin || "S8DXE7"}
              </p>
              {quiz.hideCorrectAnswer ? (
                <p className="hide__show__correct__answer">
                  <HideSvg />
                  Hide Correct Answers
                </p>
              ) : (
                <p className="hide__show__correct__answer">
                  <ShowSvg />
                  Show Correct Answers
                </p>
              )}
            </div>
          </div>
        </div>
        <button className="take__quiz__button" onClick={() => navigateToTakeQuiz(quiz)}>
          <BookSvg />
          Take a Quiz
        </button>
        <div className="timer__detail__container">
          <p className="timer__animation">
            <TimerBlueSvg />
            48 : 58 : 02
          </p>
          {quiz.hideCorrectAnswer ? (
            <p>
              This quiz not provides accurate answers, so you have to done
              before the duration.
            </p>
          ) : (
            <p>
              This quiz provides accurate answers, so you have to wait until the
              quiz duration is finished to see the correct answers.
            </p>
          )}
        </div>
      </div>
    </>

    // <div className="p-6 w-[600px] mx-auto text-center">
    // 	<h2>
    // 		{quiz.name} ({quiz.questions.length} Tasks)
    // 	</h2>
    // 	<h5>{quiz.description}</h5>
    // 	<img
    // 		src="https://img.freepik.com/free-vector/wild-nature-exploring-banner-template_23-2148943835.jpg"
    // 		alt="quiz"
    // 		width={'600px'}
    // 		className="my-6"
    // 	></img>
    // 	<h5>Category: {quiz.category}</h5>
    // 	<div>
    // 		Created By: {quiz.user.fullname}
    // 	</div>
    // 	<button
    // 		onClick={() => navigateToTakeQuiz(quiz)}
    // 		className="px-5 py-3 bg-[#238636] rounded mt-3 hover:scale-[1.05] duration-200"
    // 	>
    // 		Take a quiz
    // 	</button>

    // 	{!quiz.hideCorrectAnswer ? (
    // 		<div className='not__hide__correct_answer'>
    // 			ข้อสอบนี้เป็นข้อสอบที่มีการเเสดงคำตอบที่ถูกต้อง
    // 			<br/>
    // 			สามารถดูคำตอบได้ในอีก <span className='timer__show__correct_answer'>10 ชั่วโมง 20 นาที 00 วินาที</span>
    // 		</div>
    // 	) : (
    // 		<div className='hide__correct_answer'>
    // 			ข่อสอบนี้เป็นข้อสอบที่ไม่มีการเเสดงคำตอบที่ถูกต้อง
    // 			<br/>
    // 			<span className='timer__not__show__correct_answer'>ไม่สามารถดูคำตอบที่ถูกต้องได้</span>
    // 		</div>
    // 	)}

    // </div>
  );
}
