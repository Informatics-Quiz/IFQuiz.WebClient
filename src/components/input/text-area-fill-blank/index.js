import "./style.css";

import { ReactComponent as ContainsUnActiveSvg } from "../../../assets/svg/contains_unactive.svg";
import { ReactComponent as ExactlyUnActiveSvg } from "../../../assets/svg/exactly_unactive.svg";
import { svgMap } from "../../../config/constraints";
import { useEffect } from "react";

export default function InputTextAreaFillBlank({
	index,
	type,
	onChange,
	changeType,
	deleteItem,
	value
}) {

	return (
		<div className="item">
			<textarea
				key={`${type}-area-fill-blank-${index}`}
				type="text"
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
