import { useNavigate } from 'react-router';
import { anonymousFullName, anonymousQuizName } from '../../config/constraints';
import './style.css';

export default function NavbarTakeQuiz({imageUrl, fullname, quizName}){
    const navigate = useNavigate();
    return (
        <div className="navbar__take__quiz">
            <div className='user__profile' onClick={()=> {
                navigate('/home')
            }}>
                <div className='image'>
                    <img src={imageUrl} alt='user-profile-image'></img>
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