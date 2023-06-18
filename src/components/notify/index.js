
import './index.css'
import { svgMap } from '../../config/constraints'

export default function Notify({show, title, handleClose, message, cb}) {
    return show ? (
        <div className='notify__container' onClick={()=> {
            handleClose()
            if(cb){
                setTimeout(()=> {
                    cb(true)
                }, 100)
            }
        }}>
            <div className='notify__header'>
                {svgMap.what_happen}
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