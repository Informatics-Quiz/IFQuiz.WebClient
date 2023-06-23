import "../global.choice.style.css";

export default function FillChoice({
    index,
    handlerFillChoice,
    handlerUpdate,
    value
}) {

    function adjustTextareaHeight() {
        var textarea = document.getElementById(`answer-text-area-${index}`);
        textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
        textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
    }

    return (
        <div className="item">
            <textarea
                key={`${index}-area-choice-${index}`}
                type="text"
                onInput={adjustTextareaHeight}
                value={value}
                disabled={!handlerFillChoice && !handlerFillChoice}
                onChange={(e)=> {
                    if(!handlerFillChoice)return
                    handlerFillChoice(e.target.value)
                }}
                onAbort={()=>{
                    if(!handlerUpdate)return
                    handlerUpdate()
                }}
                id={`answer-text-area-${index}`}
                placeholder={handlerFillChoice && handlerFillChoice && "Answer here... "}
            ></textarea>
        </div>
    );
}
