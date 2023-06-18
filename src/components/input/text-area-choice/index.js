import "./style.css";

import { svgMap } from "../../../config/constraints";

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
        <div className="type_btn" onClick={()=> {setCorrectAnswer(index)}}>
          {checked ? (
            svgMap["correct_choice"]
          ) : (
            svgMap["incorrect_choice"]
          )}
        </div>
        <div className="type_btn_big" onClick={() => {
              deleteItem(index);
            }}>
              {svgMap["delete"]}
        </div>
      </div>
    </div>
  );
}
