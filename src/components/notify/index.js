import "./index.css";
import { svgMap } from "../../config/constraints";

export default function Notify({ svg, show, title, handleClose, message, cb }) {
  return show ? (
    <>
      <div
        className="tap__close__label"
        onClick={() => {
          handleClose();
          if (cb) {
            setTimeout(() => {
              cb();
            }, 400);
          }
        }}
      >
      </div>
      <div
        className="notify__container"
        onClick={() => {
          handleClose();
          if (cb) {
            setTimeout(() => {
              cb();
            }, 400);
          }
        }}
      >
        <div className="notify__header">
          {svgMap[svg] || svgMap.what_happen}
        </div>
        <div className="notify__body">
          <div className="notify__title__container">
            <p className="notify__title">{title}</p>
            <p className="notify__description">{message}</p>
          </div>
          <div className="tap__to__close__div">TAP TO CLOSE</div>
        </div>
        
      </div>
      
    </>
  ) : null;
}
