import './style.css'
export default function QuestionSelector({ answers, selectedQuestionId, handlerSelectQuestion }) {

    return (
        <div className="task">
            {answers.map((answer, index) => {
                return (
                    <button
                        key={index}
                        className={selectedQuestionId == index ? "current-task-button" 
                        : ((answer?.selectedId || answer?.selectedId === 0) || answer?.selectedIds?.length > 0 || answer?.matchString) ? "done-task-button"
                        : "unselect-button"}
                        onClick={() => {
                            if(selectedQuestionId == index) return;
                            handlerSelectQuestion(index)
                        }}
                    >
                        {index + 1}
                    </button>
                )
            })}
        </div>
    )
}