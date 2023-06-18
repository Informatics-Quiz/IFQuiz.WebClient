import "./style.css";
import { svgMap } from "../../../config/constraints";
import { ReactComponent as TrueSvg } from "../../../assets/svg/true.svg";

export default function ModalStatus({
  show,
  handleClose,
  status,
  setEditStatus,
  handleEditStatus,
}) {
  return show ? (
    <>
      <div className="modal__container">
	  	<div className="tap__close__stataus" onClick={handleClose}>
          <div className="tap__close__status__label">TAB TO CLOSE</div>
        </div>
        <div className="modal__info">
          <div className="status__svg">{svgMap.thinking}</div>
          <div className="status__edit__form">
            <div className="status__label__container">
              <p className="status__title">What is in your mind ?</p>
              <p className="status__description">
                Just type it what is your thinking...
              </p>
            </div>
            <div className="status__edit__field">
              <input
                type="text"
                placeholder={status}
                onChange={(e) => setEditStatus(e.target.value)}
              ></input>
              <TrueSvg onClick={handleEditStatus} />
            </div>
          </div>
        </div>
        
      </div>
    </>
  ) : null;
}
