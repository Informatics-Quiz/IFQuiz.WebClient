
import './index.css'
import { ReactComponent as WhatHappenSvg } from '../../assets/svg/what_happen.svg'
export default function Notify({show, title, handleClose, message}) {
    return show ? (
        <div className='notify__container' onClick={handleClose}>
            <div className='notify__header'>
                <WhatHappenSvg />
            </div>
            <div className='notify__body'>
                <div className='notify__title__container'>
                    <p className='notify__title'>{title}</p>
                    <p className='notify__description'>{message}</p>
                </div>
            </div>
            <div className='tap__close__label'>
                TAP TO CLOSE
            </div>
        </div>
    ) : null

}