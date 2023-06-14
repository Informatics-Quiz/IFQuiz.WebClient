import './ModalStatus.css'
import { ReactComponent as ThinkingSvg } from '../../Assets/svg/thinking.svg'
import { ReactComponent as TrueSvg } from '../../Assets/svg/true.svg'

export default function ModalStatus({ show, handleClose, status, setEditStatus, handleEditStatus }) {
	return show ? (
		<div className='modal__container'>
			<div className='modal__info'>
				<div className='status__svg'>
					<ThinkingSvg />
				</div>
				<div className='status__edit__form'>
					<div className='status__label__container'>
						<p className='status__title'>What is in your mind ?</p>
						<p className='status__description'>Just type it what is your thinking...</p>
					</div>
					<div className='status__edit__field'>
						<input type="text" placeholder={status}
						onChange={(e) => setEditStatus(e.target.value)}></input>
						<TrueSvg onClick={handleEditStatus} />
					</div>
				</div>
			</div>
			<div className='tap__close' onClick={handleClose}>TAP TO CLOSE</div>
		</div>
	) : null
}
