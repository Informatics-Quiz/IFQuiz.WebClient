
import '../global.choice.style.css'
export default function MultipleChoice({ choices, selectedIds, handlerMultipleChoice }) {
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
                                className={isSelected ? "selected-choice" : "un-selected-choice"}
                                onClick={isSelected ? ()=> {
                                    handlerMultipleChoice('unselect', index)
                                } : ()=> {
                                    handlerMultipleChoice('select', index)
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
                        const isSelected = selectedIds.includes(index)
                        return conditionLeft ? (
                            <button
                                key={index}
                                className={isSelected ? "selected-choice" : "un-selected-choice"}
                                onClick={isSelected ? ()=> {
                                    handlerMultipleChoice('unselect', index)
                                } : ()=> {
                                    handlerMultipleChoice('select', index)
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