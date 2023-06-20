
import '../global.choice.style.css'
export default function SingleChoice({ choices, selectedId, handlerSelectSingleChoice }) {
    return (
        <div className="select__choice">

            <div className="grid-choice">
                {
                    choices.map((choice, index) => {
                        const conditionLeft = (index + 1) % 2 !== 0;
                        return conditionLeft ? (
                            <button 
                                key={index}
                                className={selectedId === index ? "selected-choice" : "un-selected-choice"}
                                onClick={() => {
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
                                className={selectedId === index ? "selected-choice" : "un-selected-choice"}
                                onClick={() => {
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