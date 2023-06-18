import "./style.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar";
import { svgMap } from "../../../config/constraints";

const ActivitySelection = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
        <Navbar />
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
            </div>
        </div>
    </>
  );
};

export default ActivitySelection;
