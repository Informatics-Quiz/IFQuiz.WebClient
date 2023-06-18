import "./style.css";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByCode } from "../../../services/quiz";

import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import { svgMap } from "../../../config/constraints";

const FindQuiz = () => {
  const navigate = useNavigate();
  const [findQuizCode, setFindQuizCode] = useState("");

  function validateQuizCode() {
    if (findQuizCode.length !== 6) {
      showNotify(
        "Invalid quiz join code.",
        "Quiz join code must be 6 characters long."
      );
      return;
    }
    return true;
  }

  async function findQuizByJoinCode() {
    if (!validateQuizCode()) {
      return;
    }

    try {
      const res = await getQuizByCode(findQuizCode);
      console.log(res.data);
      if (res.data.length > 0) {
        navigate(`/quiz/${res.data[0]._id}`);
      }
    } catch (error) {
      showNotify("Something went wrong?", error.response.data.message);
    }
  }

  // Notify
  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  const showNotify = (title, message) => {
    setNotify({
      title: title,
      show: true,
      message: message,
    });
  };
  function closeNotify() {
    setNotify({
      title: "",
      show: false,
      message: "",
    });
  }
  return (
    <>
      <Notify
        show={notify.show}
        title={notify.title}
        handleClose={closeNotify}
        message={notify.message}
      />
      <Navbar />
      <div className="find__quiz__container">
        <div className="header">
          <div className="header__content">
            {svgMap.find_quiz}
            <div className="label">
              <div className="title">Find a quiz and join it</div>
              <div className="description">Use code of quiz to find below</div>
            </div>
          </div>
        </div>
        <div className="search__content">
          {svgMap.code_quiz}
          <input
            type="text"
            placeholder="Input quiz code here."
            maxLength={6}
            onChange={(e) => {
              setFindQuizCode(e.target.value.toLocaleUpperCase());
            }}
          ></input>
        </div>
        <div className="button__content">
          <button onClick={findQuizByJoinCode}>Find</button>
        </div>
      </div>
    </>
  );
};

export default FindQuiz;
