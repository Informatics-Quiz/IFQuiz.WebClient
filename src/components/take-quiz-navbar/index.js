import { useNavigate } from 'react-router';
import { anonymousFullName, anonymousQuizName } from '../../config/constraints';
import './style.css';
import { getUserProfileImage } from '../../services/user';
import { setUserImageUrl } from '../../reducers/user';
import { useDispatch, useSelector } from 'react-redux';

export default function NavbarTakeQuiz({imageUrl, fullname, quizName}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.authUser);

    async function onErrorImage(e){
        await getUserProfileImage(user.token, (url)=> {
            dispatch(setUserImageUrl(url));
            e.onerror = null
            e.src = url
        })
    }

    return (
        <div className="navbar__take__quiz">
            <div className='user__profile' onClick={()=> {
                navigate('/home')
            }}>
                <div className='image'>
                    <img src={imageUrl} onError={onErrorImage} alt='user-profile-image'></img>
                </div>
                <div className='fullname'>
                    {fullname || anonymousFullName} 
                </div>
            </div>
            
            <div className='quiz__name'>
                {quizName || anonymousQuizName}
            </div>
        </div>
    )
}