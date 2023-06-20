import "./style.css";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


import { getDeployedQuizByCodeJoin } from "../../../services/quiz";

import Navbar from "../../../components/navbar";
import Notify from "../../../components/notify";
import { svgMap } from "../../../config/constraints";
import BottomButton from "../../../components/button/bottom";

const FindQuiz = () => {
  const user = useSelector((state) => state.user.authUser);
  const navigate = useNavigate();
  const [findQuizCode, setFindQuizCode] = useState("");

  function validateQuizCode() {
    if (findQuizCode.length !== 6) {
      showNotify(
        "not_found",
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
      const res = await getDeployedQuizByCodeJoin(findQuizCode, user.token);
      navigate(`/quiz/${res.data._id}`);
    } catch (error) {
      showNotify(null, "Something went wrong?", error.response.data.message);
    }
  }

  // Notify
  const [notify, setNotify] = useState({
    show: false,
    title: "",
    message: "",
  });
  const showNotify = (svg, title, message, cb) => {
    setNotify({
      svg: svg,
      title: title,
      show: true,
      message: message,
      cb: cb,
    });
  };
  function closeNotify() {
    setNotify({
      svg: null,
      title: "",
      show: false,
      message: "",
      cb: null,
    });
  }
  return (
    <>
      <Notify
        svg={notify.svg}
        cb={notify.cb}
        show={notify.show}
        title={notify.title}
        handleClose={closeNotify}
        message={notify.message}
      />
      <Navbar />
      <BottomButton
            svgName="back"
            position="left"
            label={"Back"}
            cb={() => { navigate(-1) }}
        />
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
