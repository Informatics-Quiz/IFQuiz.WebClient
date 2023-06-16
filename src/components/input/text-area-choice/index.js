import "./style.css";

import { ReactComponent as DeleteSvg } from "../../../assets/svg/delete.svg";
import { ReactComponent as CorrectChoiceSvg } from "../../../assets/svg/correct_choice.svg";
import { ReactComponent as InCorrectChoiceSvg } from "../../../assets/svg/incorrect_choice.svg";

export default function InputTextAreaChoice({
  index,
  checked,
  onChange,
  setCorrectAnswer,
  deleteItem,
  value
}) {
  function adjustTextareaHeight() {
    var textarea = document.getElementById(`answer-text-area-${index}`);
    textarea.style.height = "35px"; // Reset height to allow scrollHeight calculation
    textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
  }

  return (
    <div className="item">
      <textarea
        type="text"
        onInput={adjustTextareaHeight}
        value={value}
        onChange={(e) => {
          onChange(index, e.target.value);
        }}
        id={`answer-text-area-${index}`}
        placeholder="Answer here... "
      ></textarea>
      <div className="action">
        <div className="type_btn">
          {checked ? (
            <CorrectChoiceSvg onClick={()=> {setCorrectAnswer(index)}}/>
          ) : (
           <InCorrectChoiceSvg onClick={()=> {setCorrectAnswer(index)}}/>
          )}
        </div>
        <div className="type_btn_big">
          <DeleteSvg
            onClick={() => {
              deleteItem(index);
            }}
          />
        </div>
      </div>
    </div>
  );
}
