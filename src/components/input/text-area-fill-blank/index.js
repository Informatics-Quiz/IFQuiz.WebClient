import "./style.css";

import { ReactComponent as ContainsUnActiveSvg } from "../../../assets/svg/contains_unactive.svg";
import { ReactComponent as ExactlyUnActiveSvg } from "../../../assets/svg/exactly_unactive.svg";
import { svgMap } from "../../../config/constraints";

export default function InputTextAreaFillBlank({
  index,
  type,
  onChange,
  changeType,
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
          {type === "contains" ? (
            <>
              {svgMap.contains}
            </>
          ) : (
            <ContainsUnActiveSvg
              onClick={() => {
                changeType(index, "contains");
              }}
            />
          )}
        </div>
        <div className="type_btn">
          {type === "is-exactly" ? (
            <>
              {svgMap.exactly}
            </>
          ) : (
            <ExactlyUnActiveSvg
              onClick={() => {
                changeType(index, "is-exactly");
              }}
            />
          )}
        </div>
        <div className="type_btn_big" onClick={() => {
              deleteItem(index);
            }}>
          <>
              {svgMap.delete}
          </>
        </div>
      </div>
    </div>
  );
}
