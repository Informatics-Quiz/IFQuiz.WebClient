import './style.css'

import { ReactComponent as ChangePassword } from '../../../assets/svg/change_password.svg'
import { ReactComponent as TrueSvg } from '../../../assets/svg/true.svg'

export default function ModalChangePassword({ show, handleClose, handleChangePassword, handleChangeConfirmPassword, handleClickUpdatePassword }) {
	return show ? (
		<div className='modal__container'>
			<div className='modal__info'>
				<div className='status__svg'>
					<ChangePassword />
				</div>
				<div className='status__edit__form'>
					<div className='status__label__container'>
						<p className='status__title'>Keep in touch with your security</p>
						<p className='status__description'>Don’t forgot your strong password</p>
					</div>
					<div className='status__edit__field'>
						<input type="password" placeholder="Password"
						onChange={handleChangePassword}></input>
					</div>
					<div className='status__edit__field'>
						<input type="password" placeholder="Confirm Password"
						onChange={handleChangeConfirmPassword}></input>
					</div>
					<div onClick={handleClickUpdatePassword} className='button__change__password__confirm'>
						<TrueSvg className='button__change__password__svg'/>
						Change password
					</div>
				</div>
				
			</div>
			<div className='tap__close' onClick={handleClose}>TAP TO CLOSE</div>
		</div>
	) : null
}
