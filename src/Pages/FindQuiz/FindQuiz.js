import "./style.css";
import { useState } from "react";
import ModalStatus from "../../Components/ModalStatus";
import Navbar from "../../Components/Navbar";
import { ReactComponent as FindQuizSvg } from "../../Assets/svg/find_quiz.svg";
import { ReactComponent as CodeQuizSvg } from "../../Assets/svg/code_quiz.svg";
const Home = () => {

  return (
    <>
       <Navbar/>
        <div className="find__quiz__container">
            <div className="header">
                <div className="header__content">
                    <FindQuizSvg/>
                    <div className="label">
                        <div className="title">Find a quiz and join it</div>
                        <div className="description">Use code of quiz to find below</div>
                    </div>
                </div>
            </div>
            <div className="search__content">
                <CodeQuizSvg/>
                <input type="text" placeholder="Input quiz code"></input>
            </div>
            <div className="button__content">
                <button>Find</button>
            </div>
        </div>
    </>
  );
};

export default Home;
