import "./style.css";

import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcNext, FcPrevious } from "react-icons/fc";
import ReactRouterPrompt from "react-router-prompt";

import PreventDialog from "../../../components/prevent-dialog";
import { setCurrentQuiz } from "../../../reducers/quiz";
import { sendQuiz } from "../../../services/quiz";

export default function TakeQuiz() {
  const currentQuiz = useSelector((state) => state.quiz.current);
  const user = useSelector((state) => state.user.authUser);

  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);

  const [timer, setTimer] = useState(600)
  const [isTimeup, setIsTimeUp] = useState(false)

  const [userAnswers, setUserAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  function startTimer() {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setIsTimeUp(true);
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return interval;
  }

  useEffect(() => {
    const interval = startTimer();

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (days > 0) {
      return `${days}D [ ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")} ]`;
    } else if (hours > 0) {
      return `${hours}H ${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  }

  function handleChangeUserAnswers(e, index, type) {
    const { value } = e.target;

    if (type === "single-choice") {
      const newUserAnswers = [...userAnswers];
      if (newUserAnswers[index] === value) {
        newUserAnswers.splice(index, 1);
        setUserAnswers(newUserAnswers);
        return;
      }
      newUserAnswers[index] = +value;
      setUserAnswers(newUserAnswers);
    } else if (type === "fill-choice") {
      const newUserAnswers = [...userAnswers];
      newUserAnswers[index] = value;
      setUserAnswers(newUserAnswers);
    } else if (type === "multiple-choice") {
      if (!userAnswers[index]) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = [+value];
        setUserAnswers(newUserAnswers);
        return;
      }
      if (userAnswers[index].includes(+value)) {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = newUserAnswers[index].filter(
          (item) => item !== +value
        );
        setUserAnswers(newUserAnswers);
      } else {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[index] = [...newUserAnswers[index], +value];
        setUserAnswers(newUserAnswers);
      }
    }
  }

  function isLastQuestion() {
    // eslint-disable-next-line
    return number === currentQuiz.questions.length - 1;
  }

  function changeQuestion(number) {
    setNumber(number);
  }

  function nextButton() {
    if (number + 1 < currentQuiz.questions.length) {
      setNumber((number + 1))
    }
  }

  function previousButton() {
    if (number !== 0) {
      setNumber((number - 1))
    }
  }

  async function handleSubmit() {
    try {
      const requestBody = {
        userAnswers: userAnswers,
        roomInformation: currentQuiz,
      };
      const res = await sendQuiz(user.token, requestBody);
      setScore(res.data.score);
      setIsFinished(true);
      setIsOpenSuccessModal(true);
    } catch (error) {
      console.log(error)
    }
  }

  function getChoiceTypeLabel(type) {
    // eslint-disable-next-line
    if (type == "multiple-choice") return "Multiple Choice";
    // eslint-disable-next-line
    if (type == "single-choice") return "Single Choice";
    return "Fill Choice";
  }

  function isMultipleSelect(choiceId) {
    if (!userAnswers[number]) return false;
    for (const answerId of userAnswers[number]) {
      if (answerId === choiceId) return true;
    }
    return false;
  }

  function onLeavingPage(isActive, onConfirm) {
    onConfirm(isActive);
    dispatch(setCurrentQuiz(null));
  }

  function getScoreOfQuiz() {
    let score = 0;
    for (const question of currentQuiz.questions) {
      score += question.points;
    }
    return score;
  }

  if (!currentQuiz) return null;

  return (
    <div className="flex flex-col">
      <ReactRouterPrompt when={!isFinished}>
        {({ isActive, onConfirm, onCancel }) =>
          isActive && (
            <PreventDialog
              isActive={isActive}
              onConfirm={() => onLeavingPage(isActive, onConfirm)}
              onCancel={onCancel}
            />
          )
        }
      </ReactRouterPrompt>
      <div className="flex justify-between bg-[#0d1117] py-2 px-6">
        <span style={{ marginLeft: "90px" }}>
          ยินดีต้อนรับ : {user.fullname}
        </span>
      </div>

      {isOpenSuccessModal ? (
        <div className="w-[600px] bg-[#0d1117] mt-20 mx-auto flex flex-col items-center py-12 rounded">
          <h4>ระบบได้ทำการตรวจคะเเนนข้อสอบของท่านเรียบร้อยเเล้ว</h4>
          <BsCheckCircle className="text-[100px] my-12" />
          <h1>
            {score} / {getScoreOfQuiz()}
          </h1>
          <button
            onClick={() => navigate("/home")}
            className="bg-[#171b21] px-3 py-2 rounded shadow mt-5"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col py-3 w-[1000px]"
          style={{ marginLeft: "35%" }}

        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>

            <button onClick={previousButton}><FcPrevious style={{ width: '55px', height: '55px' }} /></button>
            <button onClick={nextButton}><FcNext style={{ width: '55px', height: '55px' }} /></button>
          </div>

          <div>
            <div className="question">
              <h4>Questions</h4>
            </div>
            <div className="timer">
              <h1>{formatTime(timer)}</h1>
            </div>
            <div className="select__question">
              {currentQuiz.questions.map((question, index) => (
                <button
                  key={index}
                  onClick={(e) => changeQuestion(e.target.value)}
                  value={index}
                  className={
                    // eslint-disable-next-line
                    index == number
                      ? "selected__question__button"
                      : "select__question__button"
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0d1117] flex items-center justify-center rounded mb-4">
            <h2 className="m-0 py-2">{currentQuiz.name}</h2>
          </div>

          <div
            className="bg-[#0d1117]"
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              padding: "2.5%",
            }}
          >
            <h1 style={{ display: "inline", fontSize: "1.15vw" }}>
              {currentQuiz.questions[number].explanation.explain}
            </h1>



          </div>
          <div
            className="choice"
            style={{ width: "100%", height: "285px", marginTop: "20px" }}
          >
            {currentQuiz.questions[number].type !== "fill-choice" ? (
              <div>
                <h5 style={{ marginTop: "10px" }}>
                  {getChoiceTypeLabel(currentQuiz.questions[number].type)}
                </h5>
                <br />
                <div className="fill__choice">
                  {currentQuiz.questions[number].answer.map(
                    (answer, index) => (
                      <button
                        key={index}
                        onClick={(e) =>
                          handleChangeUserAnswers(
                            e,
                            number,
                            currentQuiz.questions[number].type
                          )
                        }
                        value={index}
                        className={
                          currentQuiz.questions[number].type ===
                            "multiple-choice"
                            ? isMultipleSelect(index)
                              ? "fill__choice__selected"
                              : "fill__choice__unselect"
                            : userAnswers[number] === index
                              ? "fill__choice__selected"
                              : "fill__choice__unselect"
                        }
                      >
                        {answer.explain}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div>
                <h5 style={{ marginTop: "10px" }}>
                  {getChoiceTypeLabel(currentQuiz.questions[number].type)}
                </h5>
                <br />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your answer..."
                    className="w-full border border-[#585e65] bg-inherit outline-none py-2 px-6 rounded"
                    value={userAnswers[number] || ""}
                    onChange={(e) =>
                      handleChangeUserAnswers(
                        e,
                        number,
                        currentQuiz.questions[number].type
                      )
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {isLastQuestion() ? (
            <button
              className="bg-[#238636] rounded py-2 mt-3"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
