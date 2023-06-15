import "./style.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import { ReactComponent as ActivitySvg } from "../../../Assets/svg/activity.svg";
import { ReactComponent as CreateQuizSvg } from "../../../Assets/svg/create_quiz.svg";
import { ReactComponent as BookSvg } from "../../../Assets/svg/book.svg";
import { ReactComponent as TrueSvg } from "../../../Assets/svg/true.svg";

const ActivitySelection = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
        <Navbar />
        <div className="activity__selection__container">
            <div className="header">
                <div className="image">
                    <ActivitySvg/>
                </div>
                <div className="label">
                    <div className="title">Select your activity</div>
                    <div className="description">Choose the section below</div>
                </div>
            </div>
            <div className="content">
                <div className="item" onClick={() => { navigate("created") }}>
                    <CreateQuizSvg/> 
                    <div className="label">Created</div>
                </div>
                <div className="item" onClick={() => { navigate("running") }}>
                    <BookSvg/>
                    <div className="label">Running</div>
                </div>
                <div className="item" onClick={() => { navigate("completed") }}>
                    <TrueSvg/>
                    <div className="label">Completed</div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ActivitySelection;
