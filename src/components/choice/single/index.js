
import { useEffect } from 'react';
import '../global.choice.style.css'
import { useRef } from 'react';
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
                                className={(showCorrectAnswer && choice.checked) ? 'correct-choice' : selectedId === index ? "selected-choice" : "un-selected-choice"}
                                onClick={() => {
                                    if (!handlerSelectSingleChoice) return
                                    handlerSelectSingleChoice(index)
                                }}
                            >
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
                                className={(showCorrectAnswer && choice.checked) ? 'correct-choice' : selectedId === index ? "selected-choice" : "un-selected-choice"}
                                onClick={() => {
                                    if (!handlerSelectSingleChoice) return
                                    handlerSelectSingleChoice(index)
                                }}
                            >
                                {choice.explain}
                            </button>
                        ) : null
                    })
                }
            </div>
        </div>
    )
}