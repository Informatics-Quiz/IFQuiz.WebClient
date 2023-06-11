import './RevealQuiz.css'
const RevealQuiz = () => {

    const userImageUrl = "https://media.discordapp.net/attachments/1115338683671908462/1117559320318582904/S__189825028.jpg"
    const explanationImageUrl = "https://media.discordapp.net/attachments/932588980258607124/1117575057267511376/main-qimg-1982e3dbefec48f686f67a08513c1730.png"
    const correctAnswerImageUrl = "https://media.discordapp.net/attachments/932588980258607124/1117571172004024410/image.png"
    return (

        <>
            <div className='nav__bar'>
                <div className='nav__user__profile'>
                    <img className='user__image' src={userImageUrl} />
                    <div className='user__fullname'>Chananya Pechborisut</div>
                </div>
                <div className='user__current__reveal__quiz__name'>Mathematics ( Grade  6 )</div>
            </div>
            <div className='reveal__question__container'>
                <div className='reveal__question__title'>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.5 25C9.18479 25 6.00537 23.683 3.66117 21.3388C1.31696 18.9946 0 15.8152 0 12.5C0 9.18479 1.31696 6.00537 3.66117 3.66117C6.00537 1.31696 9.18479 0 12.5 0C15.8152 0 18.9946 1.31696 21.3388 3.66117C23.683 6.00537 25 9.18479 25 12.5C25 15.8152 23.683 18.9946 21.3388 21.3388C18.9946 23.683 15.8152 25 12.5 25ZM15 8.75C15 9.1 14.7375 9.75 14.475 10L12.5 11.975C11.7875 12.7 11.25 13.975 11.25 15V16.25H13.75V15C13.75 14.6375 14.0125 14 14.275 13.75L16.25 11.775C16.9625 11.05 17.5 9.775 17.5 8.75C17.5 7.42392 16.9732 6.15215 16.0355 5.21447C15.0979 4.27678 13.8261 3.75 12.5 3.75C11.1739 3.75 9.90215 4.27678 8.96447 5.21447C8.02678 6.15215 7.5 7.42392 7.5 8.75H10C10 8.08696 10.2634 7.45107 10.7322 6.98223C11.2011 6.51339 11.837 6.25 12.5 6.25C13.163 6.25 13.7989 6.51339 14.2678 6.98223C14.7366 7.45107 15 8.08696 15 8.75ZM11.25 18.75V21.25H13.75V18.75H11.25Z" fill="white"/>
                    </svg>
                    Reveal Questions
                </div>
                <div className='reveal__question__selection__grid'>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                </div>
            </div>

            <div className='question__explanation__container'>
                <img className='question__explanation__image' src={explanationImageUrl}/>
                <p>A semi-circle is symmetric about ?</p>
                <div className='question__type'>
                    Multiple Choice
                </div>
                <div className='question__reveal__answer__grid__odd'>
                    <div className='uncorrect__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>
                        <img src={correctAnswerImageUrl}/>
                    </div>
                    <div className='uncorrect__answer'>
                        <img src={correctAnswerImageUrl}/>
                    </div>
                    <div className='uncorrect__answer'>perpendicular bisector of its diameter</div>
                    <div className='uncorrect__answer'>perpendicular bisector of its diameter</div>
                    <div className='uncorrect__answer'>perpendicular bisector of its diameter</div>
                    <div className='uncorrect__answer'>perpendicular bisector of its diameter</div>
                </div>
                <div className='question__reveal__answer__grid__even'>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>
                        <img src={correctAnswerImageUrl}/>
                    </div>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                    <div className='correct__answer'>perpendicular bisector of its diameter</div>
                </div>
            </div>

            <button className='back__home__btn'>
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1141 6.96198L3.97353 6.96198L9.46776 1.46775L8 -1.39876e-06L1.39876e-06 8L8 16L9.46776 14.5322L3.97353 9.03802L19.1141 9.03801L19.1141 6.96198Z" fill="white"/>
                </svg>
                <p>Home</p>
            </button>
        </>
    )
}

export default RevealQuiz