
import { svgMap } from '../../../config/constraints';
import '../global.choice.style.css'
export default function MultipleChoice({ showCorrectAnswer, choices, selectedIds, handlerMultipleChoice }) {

    return (
        <div className="select__choice">

            <div className="grid-choice">
                {
                    choices.map((choice, index) => {
                        const conditionLeft = (index + 1) % 2 !== 0;
                        const isSelected = selectedIds.includes(index)
                        return conditionLeft ? (
                            <button
                                key={index}
                                className={
                                    showCorrectAnswer ? ((choice.checked ? 'correct-choice' : 'un-correct-choice') + (isSelected ? ' border-selected-choice' : '')) : isSelected ? "selected-choice" : "un-selected-choice"
                                }
                                onClick={isSelected ? () => {
                                    if (!handlerMultipleChoice) return
                                    handlerMultipleChoice('unselect', index)
                                } : () => {
                                    if (!handlerMultipleChoice) return
                                    handlerMultipleChoice('select', index)
                                }}
                            >
                                <div className='choice-select-svg'>
                                    {showCorrectAnswer && (isSelected ? svgMap.selected_icon : null)}
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
                        const isSelected = selectedIds.includes(index)
                        return conditionLeft ? (
                            <button
                                key={index}
                                className={
                                    showCorrectAnswer ? ((choice.checked ? 'correct-choice' : 'un-correct-choice') + (isSelected ? ' border-selected-choice' : '')) : isSelected ? "selected-choice" : "un-selected-choice"
                                }
                                onClick={isSelected ? () => {
                                    if (!handlerMultipleChoice) return
                                    handlerMultipleChoice('unselect', index)
                                } : () => {
                                    if (!handlerMultipleChoice) return
                                    handlerMultipleChoice('select', index)
                                }}
                            >
                                <div className='choice-select-svg'>
                                    {showCorrectAnswer && (isSelected ? svgMap.selected_icon : null)}
                                </div>
                                {choice.explain}
                            </button>
                        ) : null
                    })
                }
            </div>
        </div>
    )
}