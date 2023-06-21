import { svgMap } from "../../../config/constraints";
import "./index.css";

export default function ModalConfirmDeleteImage({
	index,
	show,
	imageUrl,
	handleConfirm,
	handleCancle
}) {

	return show ? (
		<>
			<div className="modal-delete-question-image-container">
				<div className="modal-delete-header">
					<div className="modal-delete-header-svg">{svgMap.trash_bin}</div>
					<div className="modal-delete-text-container">
						<p className="modal-delete-title">Delete question image</p>
						<p className="modal-delete-descp">We just want to confirm.</p>
					</div>
				</div>
				<div className="image__modal__confirm">
					<img src={imageUrl} alt={`confirm-delete-image-question-${index}`}></img>
				</div>
				<div className="modal-delete-question-image-btn">
					<button className='error_color' onClick={() => handleConfirm(index)}>
						SURE, I WANT TO DELETE
					</button>
				</div>
			</div>
			<div
				className="modal-delete-question-close-text"
				onClick={handleCancle}
			>
			</div>
		</>
	) : null;
}
