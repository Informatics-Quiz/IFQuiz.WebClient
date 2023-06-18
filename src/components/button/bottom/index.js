import "./style.css";
import { svgMap } from "../../../config/constraints";
export default function BottomButton({ svgName, position, label, cb }) {
  return (
    <button
      className={
        position === "left" ? "back__home__button" : "back__home__button__right"
      }
      onClick={cb}
    >
      {position === "right" ? (
        <div>{label}</div>
      ) : null}
      <div className="svg_image">{svgMap[svgName]}</div>
      {position === "left" ? (
        <div>{label}</div>
      ) : null}
    </button>
  );
}
