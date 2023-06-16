import "./style.css";

import { ReactComponent as QuestionSvg } from "../../../assets/svg/question.svg";
import { ReactComponent as AddButtonSvg } from "../../../assets/svg/add_button.svg";
import { ReactComponent as DeleteSvg } from "../../../assets/svg/delete.svg";
import { ReactComponent as NextSvg } from "../../../assets/svg/next.svg";
import { ReactComponent as PointsSvg } from "../../../assets/svg/./points.svg";
import { ReactComponent as CategorySvg } from "../../../assets/svg/category.svg";
import { ReactComponent as ContainsSvg } from "../../../assets/svg/contains.svg";
import { ReactComponent as ExactlySvg } from "../../../assets/svg/exactly.svg";

import React, { useState, useEffect } from "react";
import { uploadQuiz } from "../../../services/quiz";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/navbar";
import InputTextAreaFillBlank from "../../../components/input/text-area-fill-blank";
import InputTextAreaChoice from "../../../components/input/text-area-choice";
import Notify from "../../../components/notify";

const CreateQuiz = () => {
  const user = useSelector((state) => state.user.authUser);
  const navigate = useNavigate();

  const [editingQuizDetail, setEditingQuizDetail] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const emptyQuestion = {
    type: "single-choice",
    points: 1,
    explanation: {
      explain: "",
      imageUrl: "",
    },
    answer: {
      correctAnswer: [{ explain: "", checked: false }],
    },
  };

  const [questionList, setQuestionList] = useState([emptyQuestion]);
  const [quiz, setQuiz] = useState({
    name: "",
    description: "something like this in the future",
    imageUrl: "",
    hideCorrectAnswer: false,
    questions: questionList,
  });

  function validateAllQuestion() {
    for (let questionId = 0; questionId < questionList.length; questionId++) {
      const question = questionList[questionId];

      // validate question explanation
      if (question.explanation.explain.length < 1) {
        showNotify(
          "Are you serious?",
          `Question (${questionId + 1}) explanation must not be empty`,
          () => {
            setSelectedQuestion(questionId);
          }
        );
        return false;
      }

      // validate question type
      if (
        question.type !== "fill-choice" &&
        question.type !== "single-choice" &&
        question.type !== "multiple-choice"
      ) {
        showNotify(
          "Are you serious?",
          `Question (${questionId + 1}) type must be in correct format`,
          () => {
            setSelectedQuestion(questionId);
          }
        );
        setSelectedQuestion(questionId);
        return false;
      }

      // validate question points
      if (question.points < 1) {
        showNotify(
          "Are you serious?",
          `Question (${questionId + 1}) points must be greater than 0`,
          () => {
            setSelectedQuestion(questionId);
          }
        );
        setSelectedQuestion(questionId);
        return false;
      }

      // validate question answer
      if (question.type === "fill-choice") {
        if (question.answer.correctAnswer.length < 1) {
          showNotify(
            "Are you serious?",
            `Question (${questionId + 1}) must have at least 1 correct answer`,
            () => {
              setSelectedQuestion(questionId);
            }
          );
          setSelectedQuestion(questionId);
          return false;
        }
        for (const answer of question.answer.correctAnswer) {
          if (answer.matchString.length < 1) {
            showNotify(
              "Are you serious?",
              `Question (${questionId + 1}) answer must not be empty`,
              () => {
                setSelectedQuestion(questionId);
              }
            );
            setSelectedQuestion(questionId);
            return false;
          }
        }
      } else if (
        question.type === "single-choice" ||
        question.type === "multiple-choice"
      ) {
        let foundOneCorrectAnswer = false;
        for (const answer of question.answer.correctAnswer) {
          if (answer.explain.length < 1) {
            showNotify(
              "Are you serious?",
              `Question (${questionId + 1}) answer must not be empty`,
              () => {
                setSelectedQuestion(questionId);
              }
            );
            setSelectedQuestion(questionId);
            return false;
          }
          if (answer.checked) {
            foundOneCorrectAnswer = true;
            break;
          }
        }
        if (!foundOneCorrectAnswer) {
          showNotify(
            "Are you serious?",
            `Question (${questionId + 1}) must have at least 1 correct answer`,
            () => {
              setSelectedQuestion(questionId);
            }
          );
          return false;
        }
      }
    }

    return true;
  }

  function editQuizDetail() {
    if (!validateAllQuestion()) {
      return;
    }
    setEditingQuizDetail(true);
  }

  function addMoreQuestion() {
    const newQuestion = [...questionList];
    newQuestion.push(emptyQuestion);
    setQuestionList(newQuestion);
  }

  function removeCurrentQuestion() {
    const newQuestion = [...questionList];
    newQuestion.splice(selectedQuestion, 1);
    if (newQuestion.length <= 0) {
      newQuestion.push(emptyQuestion);
    }
    setQuestionList(newQuestion);
    setSelectedQuestion(selectedQuestion - 1 < 0 ? 0 : selectedQuestion - 1);
  }

  function deleteChoice(index) {
    const newQuestion = [...questionList];
    if (newQuestion[selectedQuestion].type == "fill-choice") {
      if (newQuestion[selectedQuestion].answer.correctAnswer.length < 2) {
        // Notify at least 1 choice
        showNotify("Are you serious?", "Question must have at least 1 choice");
        return;
      }
      newQuestion[selectedQuestion].answer.correctAnswer.splice(index, 1);
    } else {
      if (newQuestion[selectedQuestion].answer.correctAnswer.length < 2) {
        showNotify("Are you serious?", "Question must have at least 1 choice");
        return;
      }
      newQuestion[selectedQuestion].answer.correctAnswer.splice(index, 1);
    }
    setQuestionList(newQuestion);
  }

  function addChoice() {
    const newQuestion = [...questionList];
    if (newQuestion[selectedQuestion].type == "fill-choice") {
      newQuestion[selectedQuestion].answer.correctAnswer.push({
        type: "contains",
        matchString: "",
      });
    } else {
      newQuestion[selectedQuestion].answer.correctAnswer.push({
        explain: "",
        checked: false,
      });
    }
    setQuestionList(newQuestion);
  }

  function validateQuestionType(type) {
    if (
      type !== "fill-choice" &&
      type !== "single-choice" &&
      type != "multiple-choice"
    ) {
      // notify question type in correct
      showNotify(
        "Something went wrong?",
        "It's look like question type is incorrect."
      );
      return false;
    }
    return true;
  }
  function changeQuestionType(e) {
    const questionType = e.target.value;
    if (!validateQuestionType(questionType)) return;
    const newQuestion = [...questionList];
    newQuestion[selectedQuestion].type = questionType;
    if (questionType == "fill-choice") {
      newQuestion[selectedQuestion].answer = {
        correctAnswer: [
          {
            type: "contains",
            matchString: "",
          },
        ],
      };
    } else {
      newQuestion[selectedQuestion].answer = {
        correctAnswer: [{ explain: "", checked: false }],
      };
    }
    setQuestionList(newQuestion);
  }

  function changeQuestionPoints(e) {
    const newQuestion = [...questionList];
    try {
      const points = parseInt(e.target.value);
      newQuestion[selectedQuestion].points = points;
      setQuestionList(newQuestion);
    } catch (e) {
      // notify points incorrect type
      showNotify(
        "Something went wrong?",
        "It's look like points is not a number."
      );
      return;
    }
  }

  function changeTypeFillChoice(index, type) {
    if (type !== "contains" && type !== "is-exactly") return;
    const newQuestion = [...questionList];
    if (!newQuestion[selectedQuestion].answer.correctAnswer[index]) {
      console.log(`not found answer index ${index}`);
      return;
    }
    newQuestion[selectedQuestion].answer.correctAnswer[index].type = type;
    setQuestionList(newQuestion);
  }

  function changeAnswerTextFillChoice(index, text) {
    const newQuestion = [...questionList];
    if (!newQuestion[selectedQuestion].answer.correctAnswer[index]) {
      console.log(`not found correctAnswer index ${index}`);
      return;
    }
    newQuestion[selectedQuestion].answer.correctAnswer[index].matchString =
      text;
    setQuestionList(newQuestion);
  }

  function changeAnswerTextSelectChoice(index, text) {
    const newQuestion = [...questionList];
    if (!newQuestion[selectedQuestion].answer.correctAnswer[index]) {
      console.log(`not found correctAnswer index ${index}`);
      return;
    }
    newQuestion[selectedQuestion].answer.correctAnswer[index].explain = text;
    setQuestionList(newQuestion);
  }

  function changeQuestionExplanation(e) {
    const newQuestion = [...questionList];
    newQuestion[selectedQuestion].explanation.explain = e.target.value;
    setQuestionList(newQuestion);
  }

  function changeCorrectAnswerSelectChoice(index) {
    const newQuestion = [...questionList];
    if (!newQuestion[selectedQuestion].answer.correctAnswer[index]) {
      console.log(`not found correctAnswer index ${index}`);
      return;
    }

    if (newQuestion[selectedQuestion].type === "single-choice") {
      for (let answer of newQuestion[selectedQuestion].answer.correctAnswer) {
        answer.checked = false;
      }
      newQuestion[selectedQuestion].answer.correctAnswer[index].checked = true;
    } else if (newQuestion[selectedQuestion].type === "multiple-choice") {
      newQuestion[selectedQuestion].answer.correctAnswer[index].checked =
        !newQuestion[selectedQuestion].answer.correctAnswer[index].checked;
    }
    setQuestionList(newQuestion);
  }

  function adjustTextareaHeight() {
    var textarea = document.getElementById("questionTextArea");
    textarea.style.height = "370px"; // Reset height to allow scrollHeight calculation
    textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
  }

  async function handleSubmit() {
    // const newQuestionList = quiz.questions.map((obj) => {
    //   if (obj.type === "fill-choice") {
    //     return { ...obj };
    //   }
    //   const { selectAnswers, ...rest } = obj.answer;
    //   const newSelectAnswers = selectAnswers.map(
    //     ({ checked, ...rest }) => rest
    //   );
    //   return { ...obj, answer: { ...rest, selectAnswers: newSelectAnswers } };
    // });
    // let data = { ...quiz, questions: newQuestionList };
    // let arrs = [];
    // // eslint-disable-next-line
    // data.questions.map((quest, index) => {
    //   if (quest.type !== "") {
    //     arrs.push(quest);
    //   }
    // });
    // data.questions = arrs;
    // const res = await uploadQuiz(user.token, data);
    // if (res.status === 201) {
    //   navigate("/activity/created");
    // }
  }

  // Notify
  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  function showNotify(title, message, cb) {
    if (cb) {
      setNotify({
        title: title,
        show: true,
        message: message,
        cb: cb,
      });
      return;
    }
    setNotify({
      title: title,
      show: true,
      message: message,
    });
  }
  function closeNotify() {
    setNotify({
      title: "",
      show: false,
      message: "",
    });
  }

  useEffect(() => {
    setQuiz({ ...quiz, questions: questionList });
    // eslint-disable-next-line
  }, [questionList]);

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

      {editingQuizDetail ? (
        <>
        
          TODO EDIT QUIZ DETAIL
        </>
      ) : (
        <div className="create__main__continer">
          <div className="create__container">
            <div className="question__container">
              <div className="header">
                <div className="img">
                  <QuestionSvg />
                </div>
                <div className="title">Question</div>
              </div>
              <div className="items">
                {questionList.map((_, i) => (
                  <div className="item">
                    <button
                      onClick={() => setSelectedQuestion(i)}
                      className={
                        selectedQuestion === i
                          ? "question__active"
                          : "question__unactive"
                      }
                    >
                      {" "}
                      <span
                        className={
                          questionList[i].explanation.explain == ""
                            ? "not__has__explanation"
                            : "has__explanation"
                        }
                      >
                        {questionList[i].explanation.explain == ""
                          ? `(${i + 1}) Editing Question...`
                          : `(${i + 1}) ${questionList[i].explanation.explain}`}
                      </span>
                    </button>

                    {selectedQuestion === i ? (
                      <DeleteSvg onClick={removeCurrentQuestion} />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
              <div className="action">
                <button onClick={addMoreQuestion} className="add">
                  <AddButtonSvg />
                  Add Question
                </button>
              </div>
            </div>
          </div>
          <button className="edit__detail" onClick={editQuizDetail}>
            Edit quiz detail
            <NextSvg />
          </button>
          <div className="question__content">
            <div className="settings">
              <div className="item">
                <div className="header">
                  <PointsSvg />
                  <div className="label">Points</div>
                </div>
                <select
                  id="if-select"
                  name="points"
                  onChange={changeQuestionPoints}
                  value={quiz.questions[selectedQuestion].points}
                >
                  <option value={1}>1 Points</option>
                  <option value={2}>2 Points</option>
                  <option value={3}>3 Points</option>
                  <option value={5}>5 Points</option>
                  <option value={10}>10 Points</option>
                </select>
              </div>
              <div className="item">
                <div className="header">
                  <CategorySvg />
                  <div className="label2">Type</div>
                </div>
                <select
                  name="type"
                  onChange={changeQuestionType}
                  value={quiz.questions[selectedQuestion].type}
                >
                  <option value={"single-choice"}>Single Choice</option>
                  <option value={"multiple-choice"}>Multiple Choice</option>
                  <option value={"fill-choice"}>Fill Choice</option>
                </select>
              </div>
            </div>
            <textarea
              name="explain"
              id="questionTextArea"
              onInput={adjustTextareaHeight}
              value={quiz.questions[selectedQuestion].explanation.explain}
              onChange={changeQuestionExplanation}
              placeholder="Write your question here... "
            ></textarea>
            {JSON.stringify(quiz)}
            {questionList[selectedQuestion].type === "fill-choice" ? (
              <>
                <div className="explanation__type">
                  <div className="item">
                    <ContainsSvg />
                    Contains
                  </div>
                  <div className="item">
                    <ExactlySvg />
                    Exactly
                  </div>
                </div>
                <div className="answers">
                  {quiz.questions[selectedQuestion].answer.correctAnswer.map(
                    (data, index) => {
                      return (
                        <InputTextAreaFillBlank
                          index={index}
                          type={data.type}
                          value={data.matchString}
                          onChange={changeAnswerTextFillChoice}
                          changeType={changeTypeFillChoice}
                          deleteItem={deleteChoice}
                        />
                      );
                    }
                  )}
                  <div className="add__choice">
                    <button onClick={addChoice}>
                      <AddButtonSvg />
                      Add Choice
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="answers">
                  {quiz.questions[selectedQuestion].answer.correctAnswer.map(
                    (data, index) => {
                      return (
                        <InputTextAreaChoice
                          index={index}
                          checked={data.checked}
                          onChange={changeAnswerTextSelectChoice}
                          setCorrectAnswer={changeCorrectAnswerSelectChoice}
                          deleteItem={deleteChoice}
                          value={data.explain}
                        />
                      );
                    }
                  )}
                  <div className="add__choice">
                    <button onClick={addChoice}>
                      <AddButtonSvg />
                      Add Choice
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
