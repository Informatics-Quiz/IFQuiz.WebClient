import './style.css'
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
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
                    <button>6</button>
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
                        <img src={correctAnswerImageUrl} alt='correct-answer'/>
                    </div>
                    <div className='uncorrect__answer'>
                        <img src={correctAnswerImageUrl} alt='uncorrect-answer'/>
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
                <svg width="24" height="19" viewBox="0 0 24 19" fill="none">
                    <path d="M11.6818 4.84171L4.00032 11.1683V17.9965C4.00032 18.1733 4.07055 18.3429 4.19556 18.4679C4.32058 18.5929 4.49013 18.6631 4.66693 18.6631L9.33574 18.6511C9.51196 18.6502 9.68066 18.5796 9.80495 18.4546C9.92925 18.3297 9.99902 18.1607 9.99902 17.9844V13.9968C9.99902 13.82 10.0693 13.6505 10.1943 13.5255C10.3193 13.4005 10.4888 13.3302 10.6656 13.3302H13.3321C13.5089 13.3302 13.6785 13.4005 13.8035 13.5255C13.9285 13.6505 13.9987 13.82 13.9987 13.9968V17.9815C13.9984 18.0692 14.0155 18.1562 14.0489 18.2373C14.0822 18.3184 14.1313 18.3921 14.1932 18.4542C14.2552 18.5164 14.3287 18.5657 14.4097 18.5993C14.4908 18.6329 14.5776 18.6502 14.6653 18.6502L19.3325 18.6631C19.5093 18.6631 19.6788 18.5929 19.8038 18.4679C19.9289 18.3429 19.9991 18.1733 19.9991 17.9965V11.1637L12.3193 4.84171C12.229 4.76893 12.1165 4.72925 12.0005 4.72925C11.8846 4.72925 11.7721 4.76893 11.6818 4.84171ZM23.8155 9.14179L20.3324 6.27077V0.499961C20.3324 0.367363 20.2797 0.240196 20.186 0.146435C20.0922 0.0526745 19.965 0 19.8324 0H17.4993C17.3667 0 17.2395 0.0526745 17.1457 0.146435C17.052 0.240196 16.9993 0.367363 16.9993 0.499961V3.52514L13.2692 0.456215C12.9112 0.161646 12.462 0.000588848 11.9984 0.000588848C11.5349 0.000588848 11.0857 0.161646 10.7277 0.456215L0.181444 9.14179C0.130818 9.18364 0.0889323 9.23505 0.0581813 9.29309C0.0274303 9.35112 0.00841634 9.41465 0.00222573 9.48004C-0.00396488 9.54543 0.00278923 9.6114 0.0221021 9.67417C0.041415 9.73695 0.0729083 9.79531 0.114782 9.84591L1.1772 11.1375C1.21896 11.1883 1.27033 11.2303 1.32835 11.2612C1.38638 11.2921 1.44994 11.3113 1.51538 11.3176C1.58082 11.3239 1.64686 11.3172 1.70973 11.298C1.77259 11.2787 1.83104 11.2473 1.88173 11.2054L11.6818 3.13351C11.7721 3.06073 11.8846 3.02105 12.0005 3.02105C12.1165 3.02105 12.229 3.06073 12.3193 3.13351L22.1198 11.2054C22.1704 11.2473 22.2287 11.2788 22.2915 11.2981C22.3543 11.3174 22.4202 11.3241 22.4856 11.3179C22.551 11.3118 22.6145 11.2927 22.6726 11.262C22.7306 11.2312 22.782 11.1894 22.8239 11.1387L23.8863 9.84716C23.9281 9.79626 23.9595 9.73761 23.9786 9.67455C23.9976 9.6115 24.0041 9.5453 23.9975 9.47975C23.9909 9.4142 23.9714 9.3506 23.9402 9.29261C23.909 9.23461 23.8666 9.18336 23.8155 9.14179Z" fill="white"/>
                </svg>

                <p>Home</p>
            </button>
        </>
    )
}

export default RevealQuiz