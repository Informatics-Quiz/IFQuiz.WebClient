
import { useEffect } from 'react';
import '../global.choice.style.css'
import { useRef } from 'react';
import { svgMap } from '../../../config/constraints';
export default function SingleChoice({ showCorrectAnswer, choices, selectedId, handlerSelectSingleChoice }) {

    return (
        <div className="select__choice">

            <div className="grid-choice">
                {
                    choices.map((choice, index) => {
                        const conditionLeft = (index + 1) % 2 !== 0;
                        return conditionLeft ? (
                            <button
                                key={index}
                                className={
                                    showCorrectAnswer ? ((choice.checked ? 'correct-choice' : 'un-correct-choice') + (selectedId === index ? ' border-selected-choice' : '')) : 
                                    selectedId === index ? "selected-choice" : "un-selected-choice"
                                }
                                onClick={() => {
                                    if (!handlerSelectSingleChoice) return
                                    handlerSelectSingleChoice(index)
                                }}
                            >
                                <div className='choice-select-svg'>
                                    {showCorrectAnswer && (selectedId === index ? svgMap.selected_icon : null)}
                                </div>
                                {choice.explain}
                            </button>
                        ) : null
                    })
                }
            </div>
            <div className="grid-choice">
                {
                    choices.map((choice, index) => {
                        const conditionLeft = (index + 1) % 2 === 0;
                        return conditionLeft ? (
                            <button
                                key={index}
                                className={
                                    showCorrectAnswer ? ((choice.checked ? 'correct-choice' : 'un-correct-choice') + (selectedId === index ? ' border-selected-choice' : '')) : 
                                    selectedId === index ? "selected-choice" : "un-selected-choice"
                                }
                                onClick={() => {
                                    if (!handlerSelectSingleChoice) return
                                    handlerSelectSingleChoice(index)
                                }}
                            >
                                <div className='choice-select-svg'>
                                    {showCorrectAnswer && (selectedId === index ? svgMap.selected_icon : null)}
                                </div>
                                {choice.explain}
                            </button>
                        ) : null
                    })
                }
            </div>
        </div >
    )
}