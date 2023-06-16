import "./index.css";

import { ReactComponent as TrashBinSvg } from "../../../assets/svg/trash_bin.svg";

export default function ModalConfirmAction({
  show,
  colorStyle,
  svgEnum,
  title,
  description,
  buttonConfirmLabel,
  handleConfirm,
  handleCancel,
}) {
  const mapSvgs = {
    TRASH_BIN: <TrashBinSvg />,
  };
  return show ? (
    <>
      <div className="modal__confirm__action__container">
        <div className="modal__header__container">
          <div className="modal__header__svg">{mapSvgs[svgEnum]}</div>
          <div className="modal__header__text__container">
            <p className="modal__header__title">{title}</p>
            <p className="modal__header__description">{description}</p>
          </div>
        </div>
        <div className="modal__button__confirm__container">
          <button className={colorStyle} onClick={handleConfirm}>
            {buttonConfirmLabel}
          </button>
        </div>
      </div>
      <div
        className="modal__confirm__action__container__close"
        onClick={handleCancel}
      >
        <p>TAP TO CLOSE</p>
      </div>
    </>
  ) : null;
}
