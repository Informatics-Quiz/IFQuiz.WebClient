import './Welcome.css'
import Navbar from '../../Components/Navbar'
import { ReactComponent as ReactLogo } from '../../logo.svg'
const Welcome = () => {
    return (
        <>
			<Navbar />
            <div className='welcome__container'>
                <ReactLogo className='logo'/>
                <div className='title'>INFORMATICS QUIZ</div>
                <div className='description'>Welcome to the Burapha University Student Quiz and Exam Portal! Are you a Burapha University student looking to enhance your learning experience, test your knowledge, and excel in your exams? You've come to the right place! Our portal is dedicated to providing you with a comprehensive platform for taking quizzes, exams, and test preparation specific to Burapha University's curriculum.</div>
            </div>
        </>

    )
}
export default Welcome