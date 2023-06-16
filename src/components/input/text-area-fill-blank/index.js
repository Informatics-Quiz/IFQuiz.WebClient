import "./style.css";

import { ReactComponent as DeleteSvg } from "../../../assets/svg/delete.svg";
import { ReactComponent as ContainsUnActiveSvg } from "../../../assets/svg/contains_unactive.svg";
import { ReactComponent as ExactlyUnActiveSvg } from "../../../assets/svg/exactly_unactive.svg";
import { ReactComponent as ContainsActiveSvg } from "../../../assets/svg/contains.svg";
import { ReactComponent as ExactlyActiveSvg } from "../../../assets/svg/exactly.svg";

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
            <ContainsActiveSvg/>
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
            <ExactlyActiveSvg/>
          ) : (
            <ExactlyUnActiveSvg
              onClick={() => {
                changeType(index, "is-exactly");
              }}
            />
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
