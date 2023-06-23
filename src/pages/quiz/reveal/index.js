import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { getUserProfileImage } from "../../../services/user";
import { setUserImageUrl } from "../../../reducers/user";

import './style.css'
import NavbarTakeQuiz from "../../../components/take-quiz-navbar";
import { choiceTypeEnum, choiceTypeMap, onErrorProfileImageUrl, svgMap } from "../../../config/constraints";
import { setReveal, setSelectedRevealQuestionId } from "../../../reducers/reveal";
import QuestionSelector from "../../../components/question.selector";
import { useRef } from "react";
import { useState } from "react";
import { getQuestionImage } from "../../../services/quiz";
import { getImageFromResponse } from "../../../utils/functions/image.blob";
import FillChoice from "../../../components/choice/fill";
import MultipleChoice from "../../../components/choice/multiple";
import SingleChoice from "../../../components/choice/single";
import BottomButton from "../../../components/button/bottom";
import { useNavigate } from "react-router";
const RevealQuiz = () => {

    const user = useSelector((state) => state.user.authUser)
    const reveal = useSelector((state) => state.reveal)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    function clearReveal() {
        dispatch(setReveal(null))
        dispatch(setSelectedRevealQuestionId(null))
    }

    function setSelectedQuestionId(id) {
        dispatch(setSelectedRevealQuestionId(id))
    }


    useEffect(() => {
        async function fetchProfileImage() {
            await getUserProfileImage(user.token, (url) => {
                dispatch(setUserImageUrl(url));
            });
        }
        fetchProfileImage();

    }, []);

    function adjustTextareaHeight() {
        var textarea = document.getElementById(`answer-text-area-${reveal.selectedId}`);
        if (!textarea) return
        textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
        textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
    }

    const [selectedQuestionImages, setSelectedQuestionImages] = useState([]);

    async function refreshQuestionImage(listImageUrl) {
        if (!listImageUrl) {
            setSelectedQuestionImages([])
            return
        }
        const newSelectedQuestionImages = []
        for (const imageUrl of listImageUrl) {
            const resImage = await getQuestionImage(imageUrl);
            const renderImage = getImageFromResponse(resImage)
            newSelectedQuestionImages.push(renderImage)
        }
        setSelectedQuestionImages(newSelectedQuestionImages)
    }

    const firstTimeRefreshImage = useRef(false)
    useEffect(() => {
        if (firstTimeRefreshImage.current) return
        firstTimeRefreshImage.current = true
        refreshQuestionImage(reveal.quiz.questions[reveal.selectedId].explanation?.imageUrl)
        adjustTextareaHeight()
    }, [reveal?.question])

    useEffect(() => {
        refreshQuestionImage(reveal.quiz.questions[reveal.selectedId].explanation?.imageUrl)
        adjustTextareaHeight()
    }, [reveal?.selectedId])

    return (

        <div className="reveal__animation__fade__in">
            <NavbarTakeQuiz
                imageUrl={user?.imageUrl || onErrorProfileImageUrl}
                fullname={user?.fullname}
                quizName={reveal?.quiz?.name}
            />
            <div onAbort={clearReveal} className='reveal__question__container'>
                <div className='reveal__question__title'>
                    {svgMap.question}
                    Reveal Questions
                </div>
                <div className="question__reveal__selection">
                    <QuestionSelector
                        answers={reveal.answers}
                        selectedQuestionId={reveal.selectedId}
                        handlerSelectQuestion={setSelectedQuestionId}
                    />
                </div>
            </div>

            <div className='question__explanation__container'>
                {selectedQuestionImages?.length > 0 ? (
                    <div className='take-explanation-image'>
                        {selectedQuestionImages.map((imageStream, i) => {
                            return <div
                                key={`question-image-${i}`}
                                className="image-item"
                            >
                                <img src={imageStream} alt='question-image'></img>
                            </div>
                        })}
                    </div>
                ) : null}
                <div className="question">
                    {reveal.quiz.questions[reveal.selectedId]?.explanation?.explain}
                </div>
                <div className='question__property'>
                    <div className="property">
                        <div className="icon">
                            {svgMap.category}
                        </div>
                        {choiceTypeMap[reveal.quiz.questions[reveal.selectedId]?.type]}
                    </div>
                    <div className="property">
                        <div className="icon">
                            {svgMap.points}
                        </div>
                        {reveal.quiz.questions[reveal.selectedId]?.points} Points
                    </div>
                </div>
                {
                    reveal.quiz?.questions[reveal.selectedId]?.type === 'single-choice' ? (
                        <SingleChoice
                            showCorrectAnswer={true}
                            choices={reveal.quiz.questions[reveal.selectedId].answer}
                            selectedId={reveal.answers[reveal.selectedId].selectedId}
                        />
                    ) : reveal.quiz?.questions[reveal.selectedId]?.type === 'multiple-choice' ? (
                        <MultipleChoice
                            showCorrectAnswer={true}
                            choices={reveal.quiz.questions[reveal.selectedId].answer}
                            selectedIds={reveal.answers[reveal.selectedId].selectedIds}
                        />
                    ) : reveal.quiz?.questions[reveal.selectedId]?.type === 'fill-choice' ? (
                        // Fill Choice
                        <FillChoice
                            index={reveal.selectedId}
                            value={reveal.answers[reveal.selectedId].matchString}
                        />
                    ) : null
                }
            </div>
            <BottomButton
                svgName={'true'}
                position={'right'}
                label={'Completed'}
                cb={() => {
                    navigate('/activity/completed')
                }}
            />
        </div>
    )
}

export default RevealQuiz