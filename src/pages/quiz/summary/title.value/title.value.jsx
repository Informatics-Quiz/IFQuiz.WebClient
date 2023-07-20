import { svgMap } from "../../../../config/constraints";
import './title.value.css';

export default function TitleValue({ title, description, value }) {
	return (
		<div className="average_item">
			<div className="avg_header">
				<div className="avg_header_title">{title}</div>
				<div className="avg_header_svg">{svgMap.questionGrey}</div>
			</div>
			<div className="avg_result">{value}</div>
		</div>
	);
}
