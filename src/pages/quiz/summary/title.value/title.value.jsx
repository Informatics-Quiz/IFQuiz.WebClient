import { svgMap } from "../../../../config/constraints";
import "./title.value.css";

export default function TitleValue({ title, description, value, svg, color }) {
	return (
		<div className="average_item">
			<div className="avg_header">
				{svg && <div className="avg_header_title_svg">{svg}</div>}
				<div className="avg_header_title">{title}</div>
				{description && (
					<div className="avg_header_svg">{svgMap.questionGrey}</div>
				)}
			</div>
			<div className="avg_result" style={{color: color}}>{value}</div>
		</div>
	);
}
