import './instructor.css'
import { svgMap } from "../../../../config/constraints";
export default function Instructor({ svgName, description }) {
	return (
		<div className="instructor__item">
			<div className="instructor__svg">
                {svgMap[svgName]}
            </div>
			<div className="instructor__description">
                {description}
            </div>
		</div>
	);
}
