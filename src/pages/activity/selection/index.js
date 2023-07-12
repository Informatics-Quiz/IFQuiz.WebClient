import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import { svgMap } from "../../../config/constraints";
import BottomButton from "../../../components/button/bottom";

const ActivitySelection = () => {
  const navigate = useNavigate();

  return (
    <>
        <Navbar />
        <BottomButton
            svgName="back"
            position="left"
            label={"Back"}
            cb={() => { navigate(-1) }}
        />
        <div className="activity__selection__container">
            <div className="header">
                <div className="image">
                    {svgMap.created}
                </div>
                <div className="label">
                    <div className="title">Select your activity</div>
                    <div className="description">Choose the section below</div>
                </div>
            </div>
            <div className="content">
                <div className="item" onClick={() => { navigate("created") }}>
                    {svgMap.activity}
                    <div className="label">Created</div>
                </div>
                <div className="item" onClick={() => { navigate("running") }}>
                    {svgMap.book}
                    <div className="label">Running</div>
                </div>
                <div className="item" onClick={() => { navigate("completed") }}>
                    {svgMap.true}
                    <div className="label">Completed</div>
                </div>
                <div className="item" onClick={() => { navigate("deployed") }}>
                    {svgMap.deployed}
                    <div className="label">Deployed</div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ActivitySelection;
